import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import {
  sendConfirmationEmail,
  sendCancellationEmail,
  sendRescheduleEmail,
} from "../utilis/emailService.js";

const router = express.Router();

/* =========================================
   Helper: Convert date + time to Date object
========================================= */
const parseAppointmentDateTime = (date, time) => {
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const appointmentDate = new Date(date);
  appointmentDate.setHours(hours, minutes, 0, 0);

  return appointmentDate;
};

/* =========================================
   BOOK APPOINTMENT
========================================= */
router.post("/book", protect, async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;

    if (req.user.role !== "patient") {
      return res.status(403).json({ message: "Only patients can book" });
    }

    const appointmentDateTime = parseAppointmentDateTime(date, time);

    if (appointmentDateTime <= new Date()) {
      return res.status(400).json({
        message: "Cannot book appointment in the past",
      });
    }

    const existingAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
      status: { $nin: ["cancelled", "rejected"] },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This time slot is already booked",
      });
    }

    const appointment = new Appointment({
      patient: req.user._id,
      doctor,
      date,
      time,
      appointmentDateTime,
      reason,
    });

    await appointment.save();

    try {
      await sendConfirmationEmail({
        name: req.user.name,
        email: req.user.email,
        date,
        time,
      });

      appointment.confirmationEmailSent = true;
      await appointment.save();
    } catch (error) {
      console.error("Confirmation email failed:", error);
    }

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking failed" });
  }
});

/* =========================================
   CANCEL APPOINTMENT (NO TIME RESTRICTION)
========================================= */
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        message: "Cancellation reason is required",
      });
    }

    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name email");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (
      appointment.patient._id.toString() !== req.user._id.toString() &&
      appointment.doctor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (appointment.status === "completed") {
      return res.status(400).json({
        message: "Completed appointments cannot be cancelled",
      });
    }

    appointment.status = "cancelled";
    appointment.cancellationReason = reason;
    appointment.cancelledBy = req.user.role;
    appointment.cancelledAt = new Date();

    await appointment.save();

    try {
      await sendCancellationEmail({
        name: appointment.patient.name,
        email: appointment.patient.email,
        date: appointment.date,
        time: appointment.time,
        reason,
      });
    } catch (error) {
      console.error("Cancellation email failed:", error);
    }

    res.json({
      message: "Appointment cancelled successfully",
      appointment,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cancellation failed" });
  }
});

/* =========================================
   RESCHEDULE APPOINTMENT
========================================= */
router.put("/:id/reschedule", protect, async (req, res) => {
  try {
    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({
        message: "New date and time are required",
      });
    }

    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name email");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (
      appointment.patient._id.toString() !== req.user._id.toString() &&
      appointment.doctor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const newDateTime = parseAppointmentDateTime(date, time);

    if (newDateTime <= new Date()) {
      return res.status(400).json({
        message: "Cannot reschedule to past date/time",
      });
    }

    const conflict = await Appointment.findOne({
      doctor: appointment.doctor,
      date,
      time,
      status: { $nin: ["cancelled", "rejected"] },
    });

    if (conflict) {
      return res.status(400).json({
        message: "Selected time slot is already booked",
      });
    }

    appointment.previousDate = appointment.date;
    appointment.previousTime = appointment.time;
    appointment.rescheduledBy = req.user.role;
    appointment.rescheduledAt = new Date();

    appointment.date = date;
    appointment.time = time;
    appointment.appointmentDateTime = newDateTime;
    appointment.status = "pending";

    await appointment.save();

    try {
      await sendRescheduleEmail({
        name: appointment.patient.name,
        email: appointment.patient.email,
        oldDate: appointment.previousDate,
        oldTime: appointment.previousTime,
        newDate: date,
        newTime: time,
      });
    } catch (error) {
      console.error("Reschedule email failed:", error);
    }

    res.json({
      message: "Appointment rescheduled successfully",
      appointment,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Reschedule failed" });
  }
});

/* =========================================
   UPDATE STATUS (Doctor Only)
========================================= */
router.put("/:id/status", protect, async (req, res) => {
  const { status } = req.body;

  if (req.user.role !== "doctor") {
    return res.status(403).json({
      message: "Only doctors can update status",
    });
  }

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  if (appointment.doctor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  appointment.status = status;
  await appointment.save();

  res.json({ message: `Appointment ${status}`, appointment });
});

/* =========================================
   GET ROUTES
========================================= */

router.get("/doctor", protect, async (req, res) => {
  const appointments = await Appointment.find({
    doctor: req.user._id,
  }).populate("patient", "name email");

  res.json(appointments);
});

router.get("/patient", protect, async (req, res) => {
  const appointments = await Appointment.find({
    patient: req.user._id,
  }).populate("doctor", "name email");

  res.json(appointments);
});

router.get("/booked", protect, async (req, res) => {
  const { doctor, date } = req.query;

  const appointments = await Appointment.find({
    doctor,
    date,
    status: { $nin: ["cancelled", "rejected"] },
  });

  res.json(appointments);
});

router.get("/available/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query;

  const bookedAppointments = await Appointment.find({
    doctor: doctorId,
    date,
    status: { $nin: ["cancelled", "rejected"] },
  }).select("time");

  const bookedTimes = bookedAppointments.map((a) => a.time);

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const availableSlots = timeSlots.filter(
    (slot) => !bookedTimes.includes(slot)
  );

  res.json({ availableSlots });
});

export default router;

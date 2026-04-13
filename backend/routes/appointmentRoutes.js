import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

const router = express.Router();

// 🔥 Helper: safe date + time parser
const parseAppointmentDateTime = (date, time) => {
  try {
    if (!date || !time) return null;

    const [timePart, modifier] = time.split(" ");
    if (!timePart || !modifier) return null;

    let [hours, minutes] = timePart.split(":").map(Number);

    if (isNaN(hours) || isNaN(minutes)) return null;

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const appointmentDate = new Date(date);
    appointmentDate.setHours(hours, minutes, 0, 0);

    return appointmentDate;
  } catch {
    return null;
  }
};

// ===============================
// POST /api/appointments/book
// ===============================
router.post("/book", protect, async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;

    console.log("BODY:", req.body);

    // ✅ Required fields
    if (!doctor || !date || !time) {
      return res.status(400).json({
        message: "Doctor, date and time are required",
      });
    }

    // ✅ Role check
    if (req.user.role !== "patient") {
      return res.status(403).json({
        message: "Only patients can book appointments",
      });
    }

    // ✅ Prevent self booking
    if (req.user._id.toString() === doctor) {
      return res.status(400).json({
        message: "You cannot book an appointment with yourself",
      });
    }

    // ✅ Prevent double booking
    const existingAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This time slot is already booked with this doctor",
      });
    }

    // ✅ Check doctor exists
    const doctorData = await User.findById(doctor).select("name");

    if (!doctorData) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    // 🔥 Parse date-time
    const appointmentDateTime = parseAppointmentDateTime(date, time);

    console.log("PARSED DATE:", appointmentDateTime);

    if (!appointmentDateTime || isNaN(appointmentDateTime)) {
      return res.status(400).json({
        message: "Invalid date or time format",
      });
    }

    // ✅ Create appointment
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      date,
      time,
      appointmentDateTime,
      reason,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Book appointment error:", error);
    res.status(500).json({
      message: "Server error while booking appointment",
      error: error.message,
    });
  }
});

// ===============================
// GET booked slots
// ===============================
router.get("/booked", protect, async (req, res) => {
  const { doctor, date } = req.query;

  if (!doctor || !date) {
    return res.status(400).json({ message: "Doctor and date required" });
  }

  try {
    const appointments = await Appointment.find({ doctor, date });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===============================
// GET doctor appointments
// ===============================
router.get("/doctor", protect, async (req, res) => {
  const appointments = await Appointment.find({
    doctor: req.user._id,
  }).populate("patient", "name email");

  res.json(appointments);
});

// ===============================
// PATCH status (doctor)
// ===============================
router.patch("/:id/status", protect, async (req, res) => {
  const { status } = req.body;

  if (req.user.role !== "doctor") {
    return res.status(403).json({
      message: "Only doctors can update appointment status",
    });
  }

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({
      message: "Appointment not found",
    });
  }

  if (appointment.doctor.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "Not authorized",
    });
  }

  appointment.status = status;
  await appointment.save();

  res.json({
    message: "Appointment status updated",
    appointment,
  });
});

// ===============================
// GET patient appointments
// ===============================
router.get("/my", protect, async (req, res) => {
  const appointments = await Appointment.find({
    patient: req.user._id,
  }).populate("doctor", "name email");

  res.json(appointments);
});

// ===============================
// GET available slots
// ===============================
router.get("/available/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  const bookedAppointments = await Appointment.find({
    doctor: doctorId,
    date,
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

// ===============================
// PUT status
// ===============================
router.put("/:id/status", protect, async (req, res) => {
  const { status } = req.body;
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  if (req.user._id.toString() !== appointment.doctor.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  appointment.status = status;
  await appointment.save();

  res.json({ message: `Appointment ${status}`, appointment });
});

export default router;

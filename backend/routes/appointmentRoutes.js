import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// ===============================
// POST /api/appointments/book
// ===============================
router.post("/book", protect, async (req, res) => {
  const { doctor, date, time, reason } = req.body;

  if (req.user.role !== "patient") {
    return res.status(403).json({
      message: "Only patients can book appointments",
    });
  }

  if (req.user._id.toString() === doctor) {
    return res.status(400).json({
      message: "You cannot book an appointment with yourself",
    });
  }

  // ✅ Check for double booking
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

  const appointment = new Appointment({
    patient: req.user._id,
    doctor,
    date,
    time,
    reason,
  });

  await appointment.save();

  res.status(201).json({
    message: "Appointment booked successfully",
    appointment,
  });
});
  // GET /api/appointments/booked?doctor=ID&date=YYYY-MM-DD
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
// GET /api/appointments/doctor
// ===============================
router.get("/doctor", protect, async (req, res) => {
  const appointments = await Appointment.find({
    doctor: req.user._id,
  }).populate("patient", "name email");

  res.json(appointments);
});
// PATCH /api/appointments/:id/status
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
      message: "Not authorized to update this appointment",
    });
  }

  appointment.status = status;
  await appointment.save();

  res.json({
    message: "Appointment status updated",
    appointment,
  });
});
// GET /api/appointments/my
router.get("/my", protect, async (req, res) => {
  const appointments = await Appointment.find({
    patient: req.user._id,
  }).populate("doctor", "name email");

  res.json(appointments);
});
// GET /api/appointments/available/:doctorId?date=YYYY-MM-DD
router.get("/available/:doctorId", async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  // All booked appointments for that doctor on this date
  const bookedAppointments = await Appointment.find({
    doctor: doctorId,
    date,
  }).select("time");

  const bookedTimes = bookedAppointments.map(a => a.time);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  // Filter out booked slots
  const availableSlots = timeSlots.filter(slot => !bookedTimes.includes(slot));

  res.json({ availableSlots });
});
// GET /api/appointments/patient
router.get("/patient", protect, async (req, res) => {
  const appointments = await Appointment.find({
    patient: req.user._id,
  }).populate("doctor", "name email");

  res.json(appointments);
});

// PUT /api/appointments/:id/status
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

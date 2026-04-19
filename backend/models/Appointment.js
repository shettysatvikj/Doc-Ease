import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    appointmentDateTime: {
      type: Date,
      required: true,
      index: true,
    },

    reason: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled", "completed"],
      default: "pending",
    },

    confirmationEmailSent: {
      type: Boolean,
      default: false,
    },

    reminderEmailSent: {
      type: Boolean,
      default: false,
    },

    /* =========================
       ✅ Cancellation Fields
    ========================== */

    cancellationReason: {
      type: String,
      trim: true,
    },

    cancelledBy: {
      type: String,
      enum: ["patient", "doctor"],
    },

    cancelledAt: {
      type: Date,
    },

    /* =========================
       ✅ Reschedule Fields
    ========================== */

    previousDate: {
      type: String,
    },

    previousTime: {
      type: String,
    },

    rescheduledBy: {
      type: String,
      enum: ["patient", "doctor"],
    },

    rescheduledAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

/* =========================
   ✅ Performance Indexes
========================= */

// Fast conflict checking
appointmentSchema.index({ doctor: 1, appointmentDateTime: 1 });

// Optional: quickly fetch doctor appointments
appointmentSchema.index({ doctor: 1, status: 1 });

// Optional: patient dashboard optimization
appointmentSchema.index({ patient: 1, status: 1 });

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
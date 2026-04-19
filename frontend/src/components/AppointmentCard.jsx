import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";
import { toast } from "react-toastify";

const AppointmentCard = ({ appointment, onUpdate }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [confirmChecked, setConfirmChecked] = useState(false);

  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const statusStyles = {
    pending: "bg-[#F0F4F5] text-[#06353b]",
    approved: "bg-[#E6F4F1] text-[#0E5C63]",
    cancelled: "bg-[#FCEAEA] text-[#A33A3A]",
    rejected: "bg-[#FCEAEA] text-[#A33A3A]",
  };

  /* ================= CANCEL ================= */
  const handleCancel = async () => {
    if (!cancelReason.trim()) {
      toast.error("Please provide a cancellation reason");
      return;
    }

    if (!confirmChecked) {
      toast.error("Please confirm cancellation");
      return;
    }

    try {
      await API.put(
        `/appointments/${appointment._id}/cancel`,
        { reason: cancelReason }
      );

      toast.success("Appointment cancelled");

      setShowCancelModal(false);
      setCancelReason("");
      setConfirmChecked(false);

      // ✅ REMOVE CARD
      if (onUpdate) onUpdate(appointment._id);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Cancellation failed"
      );
    }
  };

  /* ================= RESCHEDULE ================= */
 const handleReschedule = async () => {
  if (!newDate || !newTime) {
    toast.error("Select new date and time");
    return;
  }

  // ✅ Validate format: HH:MM AM/PM
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

  if (!timeRegex.test(newTime)) {
    toast.error("Enter time like 10:00 AM");
    return;
  }

  try {
    const res = await API.put(
      `/appointments/${appointment._id}/reschedule`,
      { date: newDate, time: newTime }
    );

    toast.success("Appointment rescheduled");

    setShowRescheduleModal(false);
    setNewDate("");
    setNewTime("");

    if (onUpdate) onUpdate(res.data.appointment);

  } catch (err) {
    toast.error(
      err.response?.data?.message || "Reschedule failed"
    );
  }
};

  return (
    <>
      {/* ================= CARD ================= */}
      <div className="bg-white border border-[#06353b]/10 rounded-2xl p-6 shadow-[0_20px_60px_rgba(6,53,59,0.06)] hover:shadow-[0_30px_80px_rgba(6,53,59,0.12)] transition">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-[#06353b]">
              Dr. {appointment.doctor?.name || "Unknown"}
            </h3>
            <p className="text-sm text-[#06353b]/60 mt-1">
              Clinic Consultation
            </p>
          </div>

          <span
            className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
              statusStyles[appointment.status] ||
              "bg-[#F0F4F5] text-[#06353b]"
            }`}
          >
            {appointment.status}
          </span>
        </div>

        {/* DETAILS */}
        <div className="space-y-3 text-sm text-[#06353b]/75 mb-6">
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <p><strong>Reason:</strong> {appointment.reason}</p>
        </div>

        {/* FOOTER */}
        {appointment.status !== "cancelled" &&
          appointment.status !== "completed" && (
            <div className="pt-4 border-t border-[#06353b]/10 flex gap-4">

              <button
                onClick={() => setShowRescheduleModal(true)}
                className="text-xs uppercase tracking-[0.15em] text-[#2F8F9D]"
              >
                Reschedule
              </button>

              <button
                onClick={() => setShowCancelModal(true)}
                className="text-xs uppercase tracking-[0.15em] text-[#A33A3A]"
              >
                Cancel
              </button>

            </div>
          )}

      </div>

      {/* ================= CANCEL MODAL ================= */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold mb-4">
                Confirm Cancellation
              </h3>

              <textarea
                rows={3}
                placeholder="Enter cancellation reason"
                className="w-full border rounded-lg p-3 text-sm mb-4"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />

              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={confirmChecked}
                  onChange={() => setConfirmChecked(!confirmChecked)}
                />
                <span className="text-sm">
                  I confirm cancellation
                </span>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="text-sm text-gray-500"
                >
                  Close
                </button>

                <button
                  onClick={handleCancel}
                  className="bg-[#A33A3A] text-white px-4 py-2 rounded-lg text-sm"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= RESCHEDULE MODAL ================= */}
      <AnimatePresence>
        {showRescheduleModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold mb-4">
                Reschedule Appointment
              </h3>

              <input
                type="date"
                className="w-full border rounded-lg p-3 text-sm mb-3"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />

             <select
  className="w-full border rounded-lg p-3 text-sm mb-4"
  value={newTime}
  onChange={(e) => setNewTime(e.target.value)}
>
  <option value="">Select Time</option>
  <option>09:00 AM</option>
  <option>10:00 AM</option>
  <option>11:00 AM</option>
  <option>12:00 PM</option>
  <option>01:00 PM</option>
  <option>02:00 PM</option>
  <option>03:00 PM</option>
  <option>04:00 PM</option>
  <option>05:00 PM</option>
</select>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="text-sm text-gray-500"
                >
                  Close
                </button>

                <button
                  onClick={handleReschedule}
                  className="bg-[#06353b] text-white px-4 py-2 rounded-lg text-sm"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppointmentCard;

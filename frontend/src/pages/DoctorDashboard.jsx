import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const DoctorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/doctor");
      setAppointments(res.data);
    } catch {
      toast.error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}/status`, { status });
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const statusStyles = {
    pending: "bg-[#F0F4F5] text-[#06353b]",
    approved: "bg-[#E6F4F1] text-[#0E5C63]",
    rejected: "bg-[#FCEAEA] text-[#A33A3A]",
    cancelled: "bg-[#FCEAEA] text-[#A33A3A]",
    completed: "bg-[#EEF2FF] text-[#3730A3]",
  };

  return (
    <div className="min-h-screen bg-[#F4F8F7] pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 md:mb-16">
          <div className="w-12 md:w-16 h-[2px] bg-[#2F8F9D] mb-4 md:mb-6" />
          <h1 className="text-2xl md:text-3xl font-semibold text-[#06353b]">
            Welcome, Dr. {user.name}
          </h1>
          <p className="text-sm md:text-base text-[#06353b]/60 mt-2">
            Manage and review your patient appointments
          </p>
        </div>

        {/* Section Title */}
        <h2 className="text-sm md:text-xl uppercase tracking-[0.15em] text-[#06353b]/70 mb-6 md:mb-8">
          Appointments
        </h2>

        {appointments.length === 0 ? (
          <p className="text-sm md:text-base text-[#06353b]/60">
            No appointments scheduled.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">

            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white border border-[#06353b]/10 rounded-2xl p-5 md:p-6 shadow-[0_20px_60px_rgba(6,53,59,0.06)] hover:shadow-[0_30px_80px_rgba(6,53,59,0.12)] transition"
              >

                {/* Top Row */}
                <div className="flex justify-between items-start gap-4 mb-5 md:mb-6">

                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-[#06353b] truncate">
                      {appt.patient.name}
                    </h3>
                    <p className="text-xs md:text-sm text-[#06353b]/60 truncate">
                      {appt.patient.email}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full font-medium whitespace-nowrap capitalize ${
                      statusStyles[appt.status] ||
                      "bg-[#F0F4F5] text-[#06353b]"
                    }`}
                  >
                    {appt.status}
                  </span>

                </div>

                {/* Details */}
                <div className="text-xs md:text-sm text-[#06353b]/75 space-y-1 md:space-y-2 mb-5 md:mb-6 break-words">
                  <p><strong>Date:</strong> {appt.date}</p>
                  <p><strong>Time:</strong> {appt.time}</p>
                  <p><strong>Reason:</strong> {appt.reason}</p>
                </div>

                {/* ✅ Show cancellation details */}
                {appt.status === "cancelled" && appt.cancellationReason && (
                  <div className="mb-5 p-3 bg-[#FCEAEA] border border-[#F5C2C2] rounded-lg text-[#A33A3A] text-xs md:text-sm">
                    <p>
                      <strong>Cancellation Reason:</strong>
                    </p>
                    <p className="mt-1 break-words">
                      {appt.cancellationReason}
                    </p>

                    {appt.cancelledBy && (
                      <p className="mt-2 text-[10px] md:text-xs text-[#A33A3A]/70">
                        Cancelled by: {appt.cancelledBy}
                      </p>
                    )}

                    {appt.cancelledAt && (
                      <p className="text-[10px] md:text-xs text-[#A33A3A]/70">
                        On: {new Date(appt.cancelledAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                {appt.status === "pending" && (
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                    <button
                      onClick={() =>
                        updateStatus(appt._id, "approved")
                      }
                      className="w-full bg-[#06353b] text-white py-2 md:py-2.5 rounded-lg text-xs md:text-sm uppercase tracking-[0.1em] hover:bg-[#0E5C63] transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(appt._id, "rejected")
                      }
                      className="w-full border border-[#06353b]/30 text-[#06353b] py-2 md:py-2.5 rounded-lg text-xs md:text-sm uppercase tracking-[0.1em] hover:bg-[#06353b]/5 transition"
                    >
                      Reject
                    </button>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default DoctorDashboard;
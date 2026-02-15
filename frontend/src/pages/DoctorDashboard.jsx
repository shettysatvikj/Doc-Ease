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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await API.delete(`/appointments/${id}`);
      toast.success("Appointment deleted successfully!");
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch {
      toast.error("Failed to delete appointment");
    }
  };

  const statusStyles = {
    pending: "bg-[#FFF3CD] text-[#856404]",
    approved: "bg-[#D4EDDA] text-[#155724]",
    rejected: "bg-[#F8D7DA] text-[#721C24]",
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white border border-[#E6DED5] rounded-2xl p-5 sm:p-6 shadow mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-[#3E3A36]">
            Welcome, Dr. {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B655E] mt-1">
            Manage your patient appointments
          </p>
        </div>

        {/* Appointments */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#3E3A36] mb-4">
          Appointments
        </h2>

        {appointments.length === 0 ? (
          <p className="text-sm sm:text-base text-[#6B655E]">
            No appointments yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white border border-[#E6DED5] rounded-2xl p-4 sm:p-5 shadow hover:shadow-lg transition flex flex-col gap-3"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <h3 className="font-semibold text-[#8B6F47] text-base sm:text-lg">
                    {appt.patient.name}
                  </h3>
                  <span
                    className={`w-fit text-xs px-3 py-1 rounded-full font-medium ${statusStyles[appt.status]}`}
                  >
                    {appt.status}
                  </span>
                </div>

                {/* Details */}
                <div className="text-sm text-[#5A554F] space-y-1 break-words">
                  <p><strong>Email:</strong> {appt.patient.email}</p>
                  <p><strong>Date:</strong> {appt.date}</p>
                  <p><strong>Time:</strong> {appt.time}</p>
                  <p><strong>Reason:</strong> {appt.reason}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  {appt.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(appt._id, "approved")}
                        className="w-full sm:flex-1 bg-[#8B6F47] text-white py-2 rounded-lg hover:bg-[#7A5F3E] transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(appt._id, "rejected")}
                        className="w-full sm:flex-1 border border-[#8B6F47] text-[#8B6F47] py-2 rounded-lg hover:bg-[#D8CFC4] transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {/* Delete button remains unchanged if needed */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;

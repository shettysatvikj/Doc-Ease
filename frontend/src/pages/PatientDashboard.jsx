import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import AppointmentCard from "../components/AppointmentCard";
import { toast } from "react-toastify";

const PatientDashboard = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/patiient");
      setAppointments(res.data);
    } catch {
      toast.error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F8F7] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <div className="w-16 h-[2px] bg-[#2F8F9D] mb-6" />
            <h1 className="text-3xl font-semibold text-[#06353b]">
              Welcome, {user?.name}
            </h1>
            <p className="text-[#06353b]/60 mt-2">
              View and manage your upcoming consultations
            </p>
          </div>

          <button
            onClick={() => navigate("/book-appointment")}
            className="bg-[#06353b] text-white px-8 py-3 rounded-lg text-sm uppercase tracking-[0.12em] hover:bg-[#0E5C63] transition duration-300"
          >
            Book Appointment
          </button>

        </div>

        {/* ================= SECTION TITLE ================= */}
        <h2 className="text-sm uppercase tracking-[0.2em] text-[#06353b]/60 mb-8">
          Your Appointments
        </h2>

        {/* ================= APPOINTMENTS ================= */}
        {appointments.length === 0 ? (
          <div className="bg-white border border-[#06353b]/10 rounded-2xl p-8 text-[#06353b]/60 shadow-[0_20px_60px_rgba(6,53,59,0.05)]">
            You have no scheduled appointments at the moment.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
         {appointments.map((appt) => (
  <AppointmentCard
    key={appt._id}
    appointment={appt}
    onUpdate={(id) =>
      setAppointments((prev) =>
        prev.filter((a) => a._id !== id)
      )
    }
  />
))}
          </div>
        )}

      </div>
    </div>
  );
};

export default PatientDashboard;

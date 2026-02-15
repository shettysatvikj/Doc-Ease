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
      const res = await API.get("/appointments/patient");
      setAppointments(res.data);
    } catch {
      toast.error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto">

        {/* Welcome Section */}
        <div className="bg-white border border-[#E6DED5] rounded-2xl p-5 sm:p-6 shadow mb-8 
                        flex flex-col sm:flex-col md:flex-row 
                        md:items-center md:justify-between gap-4">
          
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#3E3A36]">
              Welcome, {user?.name}
            </h1>
            <p className="text-sm text-[#6B655E] mt-1">
              Manage your appointments and healthcare easily
            </p>
          </div>

          <button
            onClick={() => navigate("/book-appointment")}
            className="w-full md:w-auto 
                       bg-[#8B6F47] text-white 
                       px-6 py-3 rounded-full 
                       text-sm sm:text-base
                       hover:bg-[#7A5F3E] 
                       active:scale-[0.98]
                       transition"
          >
            + Book Appointment
          </button>
        </div>

        {/* Appointments */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#3E3A36] mb-4">
          Your Appointments
        </h2>

        {appointments.length === 0 ? (
          <div className="bg-white border border-[#E6DED5] rounded-2xl p-6 text-sm sm:text-base text-[#6B655E]">
            You have no appointments yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appt) => (
              <AppointmentCard
                key={appt._id}
                appointment={appt}
                onDelete={(id) =>
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

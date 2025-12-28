// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ import navigate
// import API from "../services/api";
// import { AuthContext } from "../context/AuthContext";
// import AppointmentCard from "../components/AppointmentCard";
// import { toast } from "react-toastify";

// const PatientDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [appointments, setAppointments] = useState([]);
//   const navigate = useNavigate(); // ✅ initialize navigate

//   // Fetch patient appointments
//   const fetchAppointments = async () => {
//     try {
//       const res = await API.get("/appointments/patient");
//       setAppointments(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch appointments");
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>

//       <button
//         onClick={() => navigate("/book-appointment")} // ✅ navigate to book page
//         className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 transition"
//       >
//         Book New Appointment
//       </button>

//       <h2 className="text-xl mb-4">Your Appointments</h2>

//       {appointments.length === 0 ? (
//         <p>No appointments yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {appointments.map((appt) => (
//             <AppointmentCard key={appt._id} appointment={appt} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PatientDashboard;
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
    <div className="min-h-screen bg-[#FAF8F5] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Welcome Section */}
        <div className="bg-white border border-[#E6DED5] rounded-2xl p-6 shadow mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#3E3A36]">
              Welcome, {user.name}
            </h1>
            <p className="text-sm text-[#6B655E] mt-1">
              Manage your appointments and healthcare easily
            </p>
          </div>

          <button
            onClick={() => navigate("/book-appointment")}
            className="bg-[#8B6F47] text-white px-6 py-3 rounded-full hover:bg-[#7A5F3E] transition"
          >
            + Book Appointment
          </button>
        </div>

        {/* Appointments */}
        <h2 className="text-xl font-semibold text-[#3E3A36] mb-4">
          Your Appointments
        </h2>

        {appointments.length === 0 ? (
          <div className="bg-white border border-[#E6DED5] rounded-2xl p-6 text-[#6B655E]">
            You have no appointments yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appt) => (
         <AppointmentCard
  key={appt._id}
  appointment={appt}
  onDelete={(id) => setAppointments((prev) => prev.filter(a => a._id !== id))}
/>

            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;

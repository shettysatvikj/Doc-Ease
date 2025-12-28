// import { useState, useEffect, useContext } from "react";
// import API from "../services/api";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const DoctorDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [appointments, setAppointments] = useState([]);

//   // Fetch appointments assigned to this doctor
//   const fetchAppointments = async () => {
//     try {
//       const res = await API.get("/appointments/doctor");
//       setAppointments(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch appointments");
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   // Approve or Reject appointment
//   const updateStatus = async (id, status) => {
//     try {
//       await API.put(`/appointments/${id}/status`, { status });
//       toast.success(`Appointment ${status}`);
//       fetchAppointments(); // refresh list
//     } catch (err) {
//       toast.error("Failed to update status");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Welcome, Dr. {user.name}</h1>
//       <h2 className="text-xl mb-4">Appointments</h2>

//       {appointments.length === 0 ? (
//         <p>No appointments yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {appointments.map((appt) => (
//             <div
//               key={appt._id}
//               className="border rounded p-4 shadow-md flex flex-col gap-2"
//             >
//               <p><strong>Patient:</strong> {appt.patient.name}</p>
//               <p><strong>Email:</strong> {appt.patient.email}</p>
//               <p><strong>Date:</strong> {appt.date}</p>
//               <p><strong>Time:</strong> {appt.time}</p>
//               <p><strong>Reason:</strong> {appt.reason}</p>
//               <p><strong>Status:</strong> {appt.status}</p>

//               {appt.status === "pending" && (
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     onClick={() => updateStatus(appt._id, "approved")}
//                     className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => updateStatus(appt._id, "rejected")}
//                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorDashboard;
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
    <div className="min-h-screen bg-[#FAF8F5] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white border border-[#E6DED5] rounded-2xl p-6 shadow mb-8">
          <h1 className="text-2xl font-bold text-[#3E3A36]">
            Welcome, Dr. {user.name}
          </h1>
          <p className="text-sm text-[#6B655E] mt-1">
            Manage your patient appointments
          </p>
        </div>

        {/* Appointments */}
        <h2 className="text-xl font-semibold text-[#3E3A36] mb-4">
          Appointments
        </h2>

        {appointments.length === 0 ? (
          <p className="text-[#6B655E]">
            No appointments yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white border border-[#E6DED5] rounded-2xl p-5 shadow hover:shadow-lg transition flex flex-col gap-3"
              >
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-[#8B6F47]">
                    {appt.patient.name}
                  </h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[appt.status]}`}
                  >
                    {appt.status}
                  </span>
                </div>

                {/* Details */}
                <div className="text-sm text-[#5A554F] space-y-1">
                  <p><strong>Email:</strong> {appt.patient.email}</p>
                  <p><strong>Date:</strong> {appt.date}</p>
                  <p><strong>Time:</strong> {appt.time}</p>
                  <p><strong>Reason:</strong> {appt.reason}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-3">
                  {appt.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(appt._id, "approved")}
                        className="flex-1 bg-[#8B6F47] text-white py-2 rounded-lg hover:bg-[#7A5F3E] transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(appt._id, "rejected")}
                        className="flex-1 border border-[#8B6F47] text-[#8B6F47] py-2 rounded-lg hover:bg-[#D8CFC4] transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {/* <button
                    onClick={() => handleDelete(appt._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button> */}
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

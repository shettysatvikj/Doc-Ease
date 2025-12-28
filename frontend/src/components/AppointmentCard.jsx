// const AppointmentCard = ({ appointment }) => {
//   return (
//     <div className="border rounded p-4 shadow-md">
//       <h3 className="font-bold mb-2">
//         Doctor: {appointment.doctor.name || "Unknown"}
//       </h3>
//       <p>Date: {appointment.date}</p>
//       <p>Time: {appointment.time}</p>
//       <p>Reason: {appointment.reason}</p>
//       <p>Status: {appointment.status}</p>
//     </div>
//   );
// };

// export default AppointmentCard;
const AppointmentCard = ({ appointment, onDelete }) => {
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      await API.delete(`/appointments/${appointment._id}`);
      toast.success("Appointment deleted successfully!");
      if (onDelete) onDelete(appointment._id); // refresh parent list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete appointment");
    }
  };

  return (
    <div className="bg-[#FAF8F5] border border-[#E6DED5] rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-[#3E3A36]">
          Dr. {appointment.doctor?.name || "Unknown"}
        </h3>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
            statusColor[appointment.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-[#5A554F]">
        <p><span className="font-medium text-[#3E3A36]">Date:</span> {appointment.date}</p>
        <p><span className="font-medium text-[#3E3A36]">Time:</span> {appointment.time}</p>
        <p><span className="font-medium text-[#3E3A36]">Reason:</span> {appointment.reason || "General Consultation"}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E6DED5] flex justify-between items-center">
        <span className="text-xs text-[#6B655E]">Clinic Appointment</span>
        {/* <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs transition"
        >
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default AppointmentCard;

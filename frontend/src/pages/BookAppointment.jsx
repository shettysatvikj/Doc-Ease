import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import SlotSelector from "../components/SlotSelector";

const BookAppointment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/users/doctors");
      setDoctors(res.data);
    } catch {
      toast.error("Failed to fetch doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!doctor || !date) return;
      try {
        const res = await API.get(
          `/appointments/booked?doctor=${doctor}&date=${date}`
        );
        setBookedSlots(res.data.map((appt) => appt.time));
      } catch {
        toast.error("Failed to fetch booked slots");
      }
    };
    fetchBookedSlots();
  }, [doctor, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctor || !date || !selectedTime || !reason) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await API.post("/appointments/book", {
        doctor,
        date,
        time: selectedTime,
        reason,
      });
      toast.success("Appointment booked successfully!");
      navigate("/appointments");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-lg border border-[#E6DED5]">

        {/* Header */}
        <div className="bg-[#D8CFC4] rounded-t-2xl p-5 sm:p-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#3E3A36]">
            Book an Appointment
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554F] mt-1">
            Choose doctor, date & preferred time
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 sm:space-y-5">
          
          {/* Doctor */}
          <div>
            <label className="block text-sm font-medium text-[#3E3A36] mb-1">
              Select Doctor
            </label>
            <select
              className="w-full px-3 sm:px-4 py-2 border border-[#D8CFC4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B89B72]"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-[#3E3A36] mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              className="w-full px-3 sm:px-4 py-2 border border-[#D8CFC4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B89B72]"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-[#3E3A36] mb-2">
              Available Time Slots
            </label>
            <SlotSelector
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              bookedSlots={bookedSlots}
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-[#3E3A36] mb-1">
              Reason for Visit
            </label>
            <textarea
              className="w-full px-3 sm:px-4 py-2 border border-[#D8CFC4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B89B72]"
              rows={3}
              placeholder="Describe your symptoms or concern"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#8B6F47] text-white py-2.5 sm:py-3 rounded-lg font-medium hover:bg-[#7A5F3E] transition"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;

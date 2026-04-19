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
    <div className="min-h-screen bg-[#F4F8F7] pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">

      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-[#06353b]/10 shadow-[0_30px_80px_rgba(6,53,59,0.08)]">

        {/* Header */}
        <div className="px-6 md:px-8 pt-8 md:pt-10 pb-6 text-center border-b border-[#06353b]/10">
          <div className="w-10 md:w-12 h-[2px] bg-[#2F8F9D] mx-auto mb-4 md:mb-6" />
          <h2 className="text-xl md:text-2xl font-semibold text-[#06353b]">
            Book Appointment
          </h2>
          <p className="text-xs md:text-sm text-[#06353b]/60 mt-2">
            Select your doctor and preferred consultation time
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 md:px-8 py-6 md:py-8 space-y-5 md:space-y-6">

          {/* Doctor */}
          <div>
            <label className="block text-[12px] md:text-[13px] uppercase tracking-[0.12em] text-[#06353b]/70 mb-2">
              Select Doctor
            </label>
            <select
              className="w-full px-4 py-2.5 md:py-3 border border-[#06353b]/20 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#2F8F9D]/40 focus:border-[#2F8F9D] transition"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
            >
              <option value="">Choose Doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-[12px] md:text-[13px] uppercase tracking-[0.12em] text-[#06353b]/70 mb-2">
              Appointment Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2.5 md:py-3 border border-[#06353b]/20 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#2F8F9D]/40 focus:border-[#2F8F9D] transition"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-[12px] md:text-[13px] uppercase tracking-[0.12em] text-[#06353b]/70 mb-3">
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
            <label className="block text-[12px] md:text-[13px] uppercase tracking-[0.12em] text-[#06353b]/70 mb-2">
              Reason for Visit
            </label>
            <textarea
              rows={3}
              placeholder="Briefly describe your concern"
              className="w-full px-4 py-2.5 md:py-3 border border-[#06353b]/20 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#2F8F9D]/40 focus:border-[#2F8F9D] transition resize-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#06353b] text-white py-3 md:py-3.5 rounded-lg text-[12px] md:text-[13px] uppercase tracking-[0.12em] hover:bg-[#0E5C63] transition duration-300"
          >
            Confirm Appointment
          </button>

        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
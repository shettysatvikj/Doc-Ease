const SlotSelector = ({ selectedTime, setSelectedTime, bookedSlots }) => {
  const slots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {slots.map((slot) => {
        const isBooked = bookedSlots.includes(slot);
        return (
          <button
            key={slot}
            type="button"
            disabled={isBooked} // ❌ disable if booked
            onClick={() => setSelectedTime(slot)}
            className={`py-2 px-3 rounded border transition
              ${isBooked ? "bg-gray-300 cursor-not-allowed" : selectedTime === slot ? "bg-blue-600 text-white" : "bg-white hover:bg-blue-100"}`}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
};

export default SlotSelector;

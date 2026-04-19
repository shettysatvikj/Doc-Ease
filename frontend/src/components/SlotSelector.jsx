const SlotSelector = ({ selectedTime, setSelectedTime, bookedSlots }) => {
  const slots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

      {slots.map((slot) => {
        const isBooked = bookedSlots.includes(slot);
        const isSelected = selectedTime === slot;

        return (
          <button
            key={slot}
            type="button"
            disabled={isBooked}
            onClick={() => setSelectedTime(slot)}
            className={`w-full py-2.5 px-3 text-sm rounded-lg border transition-all duration-300 uppercase tracking-[0.08em]
              
              ${
                isBooked
                  ? "bg-[#F0F4F5] text-[#06353b]/40 border-[#06353b]/10 cursor-not-allowed"
                  : isSelected
                  ? "bg-[#06353b] text-white border-[#06353b]"
                  : "bg-white text-[#06353b] border-[#06353b]/20 hover:border-[#2F8F9D] hover:text-[#2F8F9D]"
              }
            `}
          >
            {slot}
          </button>
        );
      })}

    </div>
  );
};

export default SlotSelector;
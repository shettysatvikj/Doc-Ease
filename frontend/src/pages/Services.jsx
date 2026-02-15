const services = [
  {
    title: "General Consultation",
    desc: "Comprehensive health checkups and expert medical advice.",
    icon: "🩺",
  },
  {
    title: "Specialist Doctors",
    desc: "Consult experienced specialists across multiple departments.",
    icon: "👨‍⚕️",
  },
  {
    title: "Emergency Care",
    desc: "24/7 emergency medical services with rapid response.",
    icon: "🚑",
  },
  {
    title: "Diagnostics & Lab",
    desc: "Accurate lab tests and imaging with modern equipment.",
    icon: "🧪",
  },
  {
    title: "Online Appointments",
    desc: "Book appointments easily without waiting in queues.",
    icon: "📅",
  },
  {
    title: "Patient Records",
    desc: "Secure digital records for better continuity of care.",
    icon: "📄",
  },
];

const Services = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#3E3A36] mb-4">
          Our Medical Services
        </h1>
        <p className="text-sm sm:text-base text-[#6B655E] max-w-2xl mx-auto">
          We provide comprehensive healthcare services with experienced doctors,
          modern facilities, and patient-first care.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-[#E6DED5] rounded-xl p-6 shadow-sm 
                         hover:shadow-md hover:-translate-y-1 
                         transition duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>

              <h3 className="text-lg sm:text-xl font-semibold text-[#3E3A36] mb-2">
                {service.title}
              </h3>

              <p className="text-sm text-[#6B655E] leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#EFE9E1] py-12 sm:py-14">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#3E3A36] mb-4">
            Need Medical Assistance?
          </h2>
          <p className="text-sm sm:text-base text-[#6B655E] mb-6">
            Book an appointment with our experienced doctors today.
          </p>

          <a
            href="/book-appointment"
            className="inline-block w-full sm:w-auto 
                       bg-[#8B6F47] text-white 
                       px-8 py-3 rounded-full 
                       text-sm sm:text-base
                       hover:bg-[#7A5F3E] 
                       active:scale-[0.98]
                       transition"
          >
            Book Appointment
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;

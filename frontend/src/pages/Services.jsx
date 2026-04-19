import { Link } from "react-router-dom";

const services = [
  {
    title: "General Consultation",
    desc: "Comprehensive health evaluations and personalized medical guidance.",
    icon: "🩺",
  },
  {
    title: "Specialist Care",
    desc: "Access experienced specialists across multiple disciplines.",
    icon: "👨‍⚕️",
  },
  {
    title: "Emergency Services",
    desc: "24/7 urgent care with rapid medical response.",
    icon: "🚑",
  },
  {
    title: "Diagnostics & Laboratory",
    desc: "Accurate imaging and lab testing using modern technology.",
    icon: "🧪",
  },
  {
    title: "Online Appointments",
    desc: "Seamless digital scheduling for your convenience.",
    icon: "📅",
  },
  {
    title: "Secure Patient Records",
    desc: "Confidential digital records ensuring continuity of care.",
    icon: "📄",
  },
];

const Services = () => {
  return (
    <div className="bg-[#F4F8F7] min-h-screen pt-32 pb-24 px-6">

      {/* ================= HERO ================= */}
      <section className="max-w-5xl mx-auto text-center mb-24">
        <div className="w-16 h-[2px] bg-[#2F8F9D] mx-auto mb-8" />
        <h1 className="text-4xl md:text-5xl font-display text-[#06353b] mb-6">
          Our Medical Services
        </h1>
        <p className="text-[#06353b]/70 max-w-2xl mx-auto text-lg leading-relaxed">
          Comprehensive healthcare delivered with clinical excellence,
          modern technology, and a patient-centered approach.
        </p>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="max-w-7xl mx-auto mb-28">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-[#06353b]/10 rounded-2xl p-8 shadow-[0_20px_60px_rgba(6,53,59,0.06)] hover:shadow-[0_30px_80px_rgba(6,53,59,0.12)] transition duration-300"
            >
              <div className="text-3xl mb-6">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold text-[#06353b] mb-4">
                {service.title}
              </h3>

              <p className="text-[#06353b]/70 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-4xl mx-auto text-center border-t border-[#06353b]/10 pt-16">

        <h2 className="text-2xl font-semibold text-[#06353b] mb-4">
          Schedule Your Consultation
        </h2>

        <p className="text-[#06353b]/70 mb-8">
          Connect with our medical professionals and receive the care you deserve.
        </p>

        <Link
          to="/book-appointment"
          className="inline-block bg-[#06353b] text-white px-10 py-3 rounded-lg text-sm uppercase tracking-[0.12em] hover:bg-[#0E5C63] transition duration-300"
        >
          Book Appointment
        </Link>

      </section>

    </div>
  );
};

export default Services;
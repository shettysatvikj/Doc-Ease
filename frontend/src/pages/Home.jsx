import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white text-[#0A1F24] overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <img
          src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1600&q=80"
          alt="Modern Clinic Interior"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#06353b]/75" />

        <div className="relative z-10 text-center max-w-4xl px-4">
          <div className="w-20 h-[2px] bg-[#D4B26A] mx-auto mb-8" />

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-white leading-[1.1]">
            Private Healthcare Clinic
            <br />
            With Advanced Medical Specialists
          </h1>

          <p className="mt-8 text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            A refined medical environment built on discretion,
            clinical excellence, and elevated patient care.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/book-appointment"
              className="px-10 py-4 bg-[#D4B26A] text-[#06353b] rounded-md text-sm tracking-wide hover:bg-[#c6a25d] transition"
            >
              Book Consultation
            </Link>

            <Link
              to="/services"
              className="px-10 py-4 border border-white text-white rounded-md text-sm tracking-wide hover:bg-white hover:text-[#06353b] transition"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FLOATING STATS ================= */}
      <section className="relative -mt-20 md:-mt-28 z-20 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl grid grid-cols-2 md:grid-cols-4 text-center py-10">
          {[
            { value: "18+", label: "Senior Specialists" },
            { value: "12K+", label: "Patients Served" },
            { value: "25+", label: "Medical Services" },
            { value: "24/7", label: "Concierge Support" },
          ].map((item, i) => (
            <div key={i} className="px-6 py-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#06353b]">
                {item.value}
              </h3>
              <p className="text-sm mt-3 text-[#0A1F24]/60">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-16 h-[2px] bg-[#D4B26A] mb-8" />

            <h2 className="text-3xl md:text-4xl font-display leading-tight">
              A Clinic Designed
              <br />
              Around You
            </h2>

            <p className="mt-8 text-[#0A1F24]/70 leading-relaxed">
              Every detail — from architecture to consultation —
              is structured to deliver privacy, comfort,
              and uncompromising clinical precision.
            </p>

            <Link
              to="/about"
              className="inline-block mt-8 text-[#06353b] text-sm tracking-wide border-b border-[#06353b]"
            >
              Learn More
            </Link>
          </div>

          <img
            src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1000&q=80"
            alt="Private Consultation"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 md:py-40 bg-[#F4F8F7]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-20">
            <div className="w-16 h-[2px] bg-[#D4B26A] mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-display text-[#06353b]">
              Why Choose Our Clinic
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">

            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
              alt="Clinic Interior"
              className="w-full h-[300px] object-cover rounded-2xl"
            />

            <div className="space-y-10">
              {[
                "Private & Discreet Environment",
                "Senior Medical Specialists",
                "Advanced Diagnostic Technology",
                "Personalized Patient Experience",
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center gap-6">
                    <span className="text-[#06353b]/40 text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-display text-[#06353b]">
                      {item}
                    </h3>
                  </div>
                  <div className="mt-3 ml-10 w-10 h-[1px] bg-[#D4B26A]" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 md:py-40 bg-white text-center px-6">
        <h2 className="text-3xl md:text-5xl font-display text-[#06353b]">
          Begin Your Private
          <br />
          Medical Journey
        </h2>

        <p className="mt-8 text-[#0A1F24]/70 max-w-2xl mx-auto leading-relaxed">
          Schedule your confidential consultation.
        </p>

        <Link
          to="/book-appointment"
          className="inline-block mt-12 bg-[#06353b] text-white px-12 py-5 rounded-md text-sm tracking-wide hover:bg-[#0E5C63] transition"
        >
          Schedule Appointment
        </Link>
      </section>

    </div>
  );
};

export default Home;

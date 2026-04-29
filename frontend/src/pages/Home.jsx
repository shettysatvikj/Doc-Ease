import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="bg-white text-[#0A1F24] overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6">

        <img
          src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=800&q=70"
          alt="Modern Clinic Interior"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#06353b]/75" />

        {/* ✅ normal div instead of motion.div */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="w-16 md:w-20 h-[2px] bg-[#D4B26A] mx-auto mb-6 md:mb-10" />

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-white leading-[1.1]">
  Private Healthcare Clinic
  <br />
  With Advanced Medical Specialists
</h1>

          <p className="mt-6 md:mt-10 text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A refined medical environment built on discretion,
            clinical excellence, and elevated patient care.
          </p>

          <div className="mt-8 md:mt-14 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link
              to="/book-appointment"
              className="w-full sm:w-auto px-8 md:px-12 py-4 bg-[#D4B26A] text-[#06353b] rounded-md text-sm tracking-wide hover:bg-[#c6a25d] transition duration-300 text-center"
            >
              Book Consultation
            </Link>

            <Link
              to="/services"
              className="w-full sm:w-auto px-8 md:px-12 py-4 border border-white text-white rounded-md text-sm tracking-wide hover:bg-white hover:text-[#06353b] transition duration-300 text-center"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FLOATING STATS ================= */}
      <section className="relative -mt-16 md:-mt-24 z-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-lg grid grid-cols-2 md:grid-cols-4 text-center py-8 md:py-14">

            {[
              { value: "18+", label: "Senior Specialists" },
              { value: "12K+", label: "Patients Served" },
              { value: "25+", label: "Medical Services" },
              { value: "24/7", label: "Concierge Support" },
            ].map((item, i) => (
              <div key={i} className="px-4 md:px-6 py-4">
                <h3 className="text-xl md:text-3xl font-semibold text-[#06353b]">
                  {item.value}
                </h3>
                <p className="text-xs md:text-sm mt-2 md:mt-3 text-[#0A1F24]/60">
                  {item.label}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-20 md:py-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 md:gap-24 items-center">

          <div>
            <div className="w-14 md:w-16 h-[2px] bg-[#D4B26A] mb-6 md:mb-8" />
            <h2 className="text-2xl md:text-4xl font-display leading-tight">
              A Clinic Designed
              <br />
              Around You
            </h2>

            <p className="mt-6 md:mt-8 text-[#0A1F24]/70 leading-relaxed text-sm md:text-base">
              Every detail — from architecture to consultation —
              is structured to deliver privacy, comfort,
              and uncompromising clinical precision.
            </p>

            <Link
              to="/about"
              className="inline-block mt-6 md:mt-10 text-[#06353b] text-sm tracking-wide border-b border-[#06353b]"
            >
              Learn More
            </Link>
          </div>

          <img
            src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=70"
            alt="Private Consultation"
            loading="lazy"
            decoding="async"
            className="rounded-2xl shadow-lg w-full"
          />

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 md:py-40 bg-[#F4F8F7]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="text-center mb-12 md:mb-24">
            <div className="w-14 md:w-16 h-[2px] bg-[#D4B26A] mx-auto mb-6 md:mb-8" />
            <h2 className="text-2xl md:text-4xl font-display text-[#06353b]">
              Why Choose Our Clinic
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">

            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=70"
              alt="Clinic Interior"
              loading="lazy"
              decoding="async"
              className="w-full h-[240px] md:h-[360px] object-cover rounded-2xl border border-[#06353b]/10"
            />

            <div className="space-y-8 md:space-y-12">
              {[
                "Private & Discreet Environment",
                "Senior Medical Specialists",
                "Advanced Diagnostic Technology",
                "Personalized Patient Experience",
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="text-[#06353b]/40 text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-base md:text-lg font-display text-[#06353b]">
                      {item}
                    </h3>
                  </div>
                  <div className="mt-3 ml-8 md:ml-10 w-8 md:w-10 h-[1px] bg-[#D4B26A]" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= DOCTOR SPOTLIGHT ================= */}
      <section className="py-20 md:py-40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 md:gap-24 items-center">

          <img
            src="https://plus.unsplash.com/premium_photo-1681996543579-b24cd01d4516?auto=format&fit=crop&w=800&q=70"
            alt="Lead Doctor"
            loading="lazy"
            decoding="async"
            className="rounded-2xl shadow-lg w-full"
          />

          <div>
            <div className="w-14 md:w-16 h-[2px] bg-[#D4B26A] mb-6 md:mb-8" />
            <h2 className="text-2xl md:text-4xl font-display leading-tight">
              Led by Experienced
              <br />
              Medical Professionals
            </h2>

            <p className="mt-6 md:mt-8 text-[#0A1F24]/70 leading-relaxed text-sm md:text-base">
              Our senior specialists combine decades of expertise with modern diagnostic technology.
            </p>
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="py-20 md:py-40 bg-[#06353b] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-6">

          <div className="w-14 md:w-16 h-[2px] bg-[#D4B26A] mx-auto mb-6 md:mb-10" />

          <p className="text-lg md:text-xl leading-relaxed italic text-white/90">
            “The professionalism, discretion, and quality of care
            exceeded all expectations.”
          </p>

          <div className="mt-6 md:mt-10 text-sm text-white/70">
            — Private Patient
          </div>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 md:py-40 bg-white text-center">
        <h2 className="text-3xl md:text-5xl font-display leading-tight text-[#06353b]">
          Begin Your Private
          <br />
          Medical Journey
        </h2>

        <p className="mt-6 md:mt-10 text-[#0A1F24]/70 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Schedule your confidential consultation.
        </p>

        <Link
          to="/book-appointment"
          className="inline-block mt-8 md:mt-14 bg-[#06353b] text-white px-10 md:px-14 py-4 md:py-5 rounded-md text-sm tracking-wide hover:bg-[#0E5C63] transition duration-300"
        >
          Schedule Appointment
        </Link>
      </section>


     
    </div>
  );
};
export default Home;

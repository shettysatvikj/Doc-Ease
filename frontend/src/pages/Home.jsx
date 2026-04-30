import { Link } from "react-router-dom";
// import AIChat from "../components/AIChat.jsx";

const Home = () => {
  return (
    <main className="bg-white text-[#0A1F24] overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center">

        <img
          src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fm=webp&fit=crop&w=1000&q=60"
          srcSet="
            https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fm=webp&fit=crop&w=500&q=50 500w,
            https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fm=webp&fit=crop&w=800&q=55 800w,
            https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fm=webp&fit=crop&w=1200&q=60 1200w
          "
          sizes="(max-width: 768px) 100vw, 1200px"
          alt="Modern Clinic Interior"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#06353b]/85" />

        <div className="relative z-10 max-w-5xl text-center px-6 py-32">
          <div className="w-24 h-[2px] bg-[#D4B26A] mx-auto mb-10" />

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-white leading-[1.05] tracking-tight">
            Private Healthcare Clinic
            <br />
            <span className="text-[#D4B26A]">
              With Advanced Medical Specialists
            </span>
          </h1>

          <p className="mt-10 text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A refined medical environment built on discretion,
            clinical excellence, and elevated patient care.
          </p>

          <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/book-appointment"
              className="px-14 py-5 bg-[#D4B26A] text-[#06353b] rounded-md text-sm tracking-wide shadow-lg md:shadow-xl hover:shadow-2xl hover:bg-[#c6a25d] transition-all duration-300"
            >
              Book Consultation
            </Link>

            <Link
              to="/services"
              className="px-14 py-5 border border-white text-white rounded-md text-sm tracking-wide hover:bg-white hover:text-[#06353b] transition-all duration-300"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>


      {/* ================= STATS ================= */}
      <section className="relative mt-[-6rem] md:-mt-24 z-20 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg md:shadow-2xl border border-[#06353b]/5 grid grid-cols-2 md:grid-cols-4 text-center py-12">
          {[
            { value: "18+", label: "Senior Specialists" },
            { value: "12K+", label: "Patients Served" },
            { value: "25+", label: "Medical Services" },
            { value: "24/7", label: "Concierge Support" },
          ].map((item, i) => (
            <div key={i} className="px-6 py-6">
              <h3 className="text-3xl font-semibold text-[#06353b]">
                {item.value}
              </h3>
              <div className="w-10 h-[2px] bg-[#D4B26A] mx-auto my-4" />
              <p className="text-sm text-[#0A1F24]/60 tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* ================= ABOUT ================= */}
      <section className="py-32 md:py-40">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">

          <div>
            <div className="w-16 h-[2px] bg-[#D4B26A] mb-8" />
            <h2 className="text-3xl md:text-5xl font-display leading-tight">
              A Clinic Designed
              <br />
              Around You
            </h2>

            <p className="mt-10 text-[#0A1F24]/70 leading-relaxed text-lg">
              Every detail — from architecture to consultation —
              is structured to deliver privacy, comfort,
              and uncompromising clinical precision.
            </p>

            <Link
              to="/about"
              className="inline-block mt-12 text-[#06353b] text-sm tracking-wide border-b border-[#06353b]"
            >
              Learn More →
            </Link>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fm=webp&fit=crop&w=800&q=60"
              alt="Private Consultation"
              loading="lazy"
              decoding="async"
              className="rounded-3xl shadow-lg md:shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-[#D4B26A]/40 rounded-3xl" />
          </div>
        </div>
      </section>


      {/* WHY CHOOSE US */}
      <section className="py-32 md:py-40 bg-[#F4F8F7]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">

          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fm=webp&fit=crop&w=800&q=60"
            alt="Clinic Interior"
            loading="lazy"
            decoding="async"
            className="rounded-3xl shadow-lg md:shadow-xl h-[360px] object-cover"
          />

          <div className="space-y-14">
            {[
              "Private & Discreet Environment",
              "Senior Medical Specialists",
              "Advanced Diagnostic Technology",
              "Personalized Patient Experience",
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center gap-6">
                  <span className="text-[#D4B26A] text-sm tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-display text-[#06353b]">
                    {item}
                  </h3>
                </div>
                <div className="mt-4 ml-10 w-14 h-[2px] bg-[#D4B26A]" />
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* DOCTOR SPOTLIGHT */}
      <section className="py-32 md:py-40">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">

          <img
            src="https://plus.unsplash.com/premium_photo-1681996543579-b24cd01d4516?auto=format&fm=webp&fit=crop&w=800&q=60"
            alt="Lead Doctor"
            loading="lazy"
            decoding="async"
            className="rounded-3xl shadow-lg md:shadow-2xl"
          />

          <div>
            <div className="w-16 h-[2px] bg-[#D4B26A] mb-8" />
            <h2 className="text-3xl md:text-5xl font-display leading-tight">
              Led by Experienced
              <br />
              Medical Professionals
            </h2>
            <p className="mt-10 text-[#0A1F24]/70 leading-relaxed text-lg">
              Our senior specialists combine decades of expertise with
              modern diagnostic technology to deliver exceptional care.
            </p>
          </div>

        </div>
      </section>


      {/* TESTIMONIAL */}
      <section className="py-32 bg-[#06353b] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="w-16 h-[2px] bg-[#D4B26A] mx-auto mb-10" />
          <p className="text-xl md:text-2xl italic text-white/90">
            “The professionalism, discretion, and quality of care exceeded all expectations.”
          </p>
          <div className="mt-10 text-sm text-white/70">
            — Private Patient
          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section className="py-36 bg-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-[2px] bg-[#D4B26A] mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-display text-[#06353b]">
            Begin Your Private
            <br />
            Medical Journey
          </h2>
          <p className="mt-10 text-[#0A1F24]/70 text-lg">
            Schedule your confidential consultation and
            experience elevated healthcare.
          </p>
          <Link
            to="/book-appointment"
            className="inline-block mt-14 bg-[#06353b] text-white px-16 py-6 rounded-md shadow-lg md:shadow-xl hover:shadow-2xl hover:bg-[#0E5C63] transition"
          >
            Schedule Appointment
          </Link>
        </div>
      </section>

    </main>
  );
};

export default Home;

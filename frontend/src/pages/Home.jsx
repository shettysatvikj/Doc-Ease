import { Link } from "react-router-dom";
import { useState } from "react";

const loadAIChat = () => import("../components/AIChat.jsx");

const Home = () => {
  const [AIChatComp, setAIChatComp] = useState(null);

  const handleOpenChat = async () => {
    if (!AIChatComp) {
      const mod = await loadAIChat();
      setAIChatComp(() => mod.default);
    }
  };

  return (
    <div className="bg-white text-[#0A1F24] overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6">

        <img
          src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=800&q=70"
          srcSet="
            https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=400&q=60 400w,
            https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=800&q=70 800w,
            https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1200&q=70 1200w
          "
          sizes="(max-width: 768px) 100vw, 1200px"
          alt="Modern Clinic Interior"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#06353b]/75" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="w-16 md:w-20 h-[2px] bg-[#D4B26A] mx-auto mb-6 md:mb-10" />

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-white leading-[1.1]">
            Private Healthcare
            <br />
            Without Compromise
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
          <div className="bg-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.08)] grid grid-cols-2 md:grid-cols-4 text-center py-8 md:py-14">

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

          <div>
            <img
              src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=70"
              alt="Private Consultation"
              loading="lazy"
              decoding="async"
              className="rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.08)] w-full"
            />
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
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

      {/* ================= AI CHAT (LAZY LOAD) ================= */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleOpenChat}
          className="bg-[#06353b] text-white px-5 py-3 rounded-full shadow-lg"
        >
          Chat
        </button>
      </div>

      {AIChatComp && <AIChatComp />}

    </div>
  );
};

export default Home;

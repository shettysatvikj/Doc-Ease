const About = () => {
  return (
    <div className="bg-white min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6">

      {/* ================= HERO ================= */}
      <div className="max-w-5xl mx-auto text-center mb-16 md:mb-24">
        <div className="w-14 md:w-16 h-[2px] bg-[#2F8F9D] mx-auto mb-6 md:mb-8" />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#06353b] mb-4 md:mb-6 leading-tight">
          A Modern Approach
          <br />
          to Private Healthcare
        </h1>

        <p className="text-[#06353b]/70 max-w-3xl mx-auto text-base md:text-lg leading-relaxed px-2">
          We combine advanced medical expertise with a refined,
          patient-focused environment designed to deliver
          comfort, discretion, and clinical excellence.
        </p>
      </div>

      {/* ================= PHILOSOPHY SECTION ================= */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 mb-20 md:mb-32">

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#06353b] mb-4 md:mb-6 uppercase tracking-[0.15em]">
            Our Mission
          </h2>
          <p className="text-[#06353b]/70 leading-relaxed text-sm md:text-base">
            To provide seamless access to high-quality medical care,
            prioritizing patient well-being, efficiency, and trust
            at every stage of the healthcare journey.
          </p>
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#06353b] mb-4 md:mb-6 uppercase tracking-[0.15em]">
            Our Vision
          </h2>
          <p className="text-[#06353b]/70 leading-relaxed text-sm md:text-base">
            To redefine private healthcare through innovation,
            compassion, and a commitment to clinical precision
            that exceeds expectations.
          </p>
        </div>

      </div>

      {/* ================= APPROACH SECTION ================= */}
      <div className="max-w-6xl mx-auto mb-20 md:mb-32">

        <h2 className="text-2xl md:text-3xl font-display text-center text-[#06353b] mb-10 md:mb-16">
          Our Approach
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 text-center">

          {[
            {
              title: "Personalized Care",
              desc: "Every treatment plan is tailored to the individual needs of each patient."
            },
            {
              title: "Clinical Excellence",
              desc: "Our specialists uphold the highest standards of medical practice."
            },
            {
              title: "Modern Technology",
              desc: "Advanced diagnostic systems integrated for accuracy and efficiency."
            }
          ].map((item, index) => (
            <div key={index} className="px-2">

              <div className="text-2xl md:text-3xl font-semibold text-[#2F8F9D] mb-4 md:mb-6">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-[#06353b] mb-3 md:mb-4">
                {item.title}
              </h3>

              <p className="text-[#06353b]/70 leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* ================= TRUST SECTION ================= */}
      <div className="max-w-6xl mx-auto border-t border-[#06353b]/10 pt-14 md:pt-20">

        <h2 className="text-2xl md:text-3xl font-display text-center text-[#06353b] mb-8 md:mb-12">
          Why Patients Trust Us
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">

          {[
            "Experienced Medical Team",
            "Confidential Environment",
            "Streamlined Appointments",
            "Patient-Centered Service",
          ].map((feature, index) => (
            <div key={index}>
              <div className="w-8 md:w-10 h-[1px] bg-[#2F8F9D] mx-auto mb-3 md:mb-4" />
              <p className="text-xs md:text-sm text-[#06353b]/75 px-2">
                {feature}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default About;
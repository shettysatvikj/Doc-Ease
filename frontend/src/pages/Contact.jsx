const Contact = () => {
  return (
    <div className="bg-[#F4F8F7] min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6">

      {/* ================= HEADER ================= */}
      <section className="max-w-5xl mx-auto text-center mb-16 md:mb-24">
        <div className="w-14 md:w-16 h-[2px] bg-[#2F8F9D] mx-auto mb-6 md:mb-8" />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#06353b] mb-4 md:mb-6 leading-tight">
          Contact Our Clinic
        </h1>

        <p className="text-[#06353b]/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-2">
          For appointments, medical inquiries, or urgent assistance,
          our team is available to support you.
        </p>
      </section>

      {/* ================= CONTACT INFO ================= */}
      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-20 md:mb-28 text-center">

        {[
          {
            title: "Clinic Address",
            value: "123 Health Street\nBangalore, India"
          },
          {
            title: "Telephone",
            value: "+91 98765 43210\n+91 91234 56789"
          },
          {
            title: "Email",
            value: "support@docease.com\nappointments@docease.com"
          }
        ].map((item, i) => (
          <div key={i} className="border-t border-[#06353b]/10 pt-6 md:pt-8 px-2">

            <div className="w-8 md:w-10 h-[1px] bg-[#2F8F9D] mx-auto mb-4 md:mb-6" />

            <h3 className="uppercase tracking-[0.15em] text-xs md:text-sm text-[#06353b]/60 mb-3 md:mb-4">
              {item.title}
            </h3>

            <p className="text-[#06353b] whitespace-pre-line leading-relaxed text-sm md:text-base">
              {item.value}
            </p>

          </div>
        ))}

      </section>

      {/* ================= FORM + MAP ================= */}
      <section className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 mb-20 md:mb-28">

        {/* Contact Form */}
        <div className="bg-white border border-[#06353b]/10 rounded-2xl shadow-[0_30px_80px_rgba(6,53,59,0.08)] p-6 md:p-10">

          <h2 className="text-xl md:text-2xl font-semibold text-[#06353b] mb-6 md:mb-8">
            Send a Message
          </h2>

          <form className="space-y-5 md:space-y-6">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base border border-[#06353b]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F8F9D]/40 focus:border-[#2F8F9D] transition"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base border border-[#06353b]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F8F9D]/40 focus:border-[#2F8F9D] transition"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base border border-[#06353b]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F8F9D]/40 focus:border-[#2F8F9D] transition resize-none"
            />

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#06353b] text-white px-6 md:px-8 py-3 rounded-lg uppercase tracking-[0.12em] text-xs md:text-sm hover:bg-[#0E5C63] transition duration-300"
            >
              Send Message
            </button>

          </form>
        </div>

        {/* Google Map */}
        <div className="rounded-2xl overflow-hidden border border-[#06353b]/10 shadow-[0_30px_80px_rgba(6,53,59,0.08)] min-h-[300px] md:min-h-[420px]">
          <iframe
            title="clinic-location"
            src="https://www.google.com/maps?q=Bangalore&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>

      </section>

      {/* ================= EMERGENCY SECTION ================= */}
      <section className="max-w-4xl mx-auto text-center border-t border-[#06353b]/10 pt-12 md:pt-16">

        <h2 className="text-xl md:text-2xl font-semibold text-[#06353b] mb-3 md:mb-4">
          Emergency Assistance
        </h2>

        <p className="text-[#06353b]/70 mb-4 md:mb-6 text-sm md:text-base">
          Our emergency response team is available 24 hours a day.
        </p>

        <div className="text-xl md:text-2xl font-semibold text-[#2F8F9D]">
          +91 99999 00000
        </div>

      </section>

    </div>
  );
};

export default Contact;
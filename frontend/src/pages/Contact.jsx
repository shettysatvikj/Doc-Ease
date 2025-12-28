const Contact = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-[#3E3A36] mb-4">
          Contact Us
        </h1>
        <p className="text-[#6B655E] max-w-2xl mx-auto">
          We’re here to help you. Reach out for appointments, emergencies, or general inquiries.
        </p>
      </section>

      {/* Contact Info */}
      <section className="max-w-7xl mx-auto px-6 pb-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E6DED5] rounded-xl p-6 text-center shadow-sm">
          <div className="text-3xl mb-3">📍</div>
          <h3 className="font-semibold text-[#3E3A36] mb-1">Clinic Address</h3>
          <p className="text-sm text-[#6B655E]">
            123 Health Street,<br /> Bangalore, India
          </p>
        </div>

        <div className="bg-white border border-[#E6DED5] rounded-xl p-6 text-center shadow-sm">
          <div className="text-3xl mb-3">📞</div>
          <h3 className="font-semibold text-[#3E3A36] mb-1">Call Us</h3>
          <p className="text-sm text-[#6B655E]">
            +91 98765 43210<br />+91 91234 56789
          </p>
        </div>

        <div className="bg-white border border-[#E6DED5] rounded-xl p-6 text-center shadow-sm">
          <div className="text-3xl mb-3">✉️</div>
          <h3 className="font-semibold text-[#3E3A36] mb-1">Email</h3>
          <p className="text-sm text-[#6B655E]">
            support@docease.com<br />appointments@docease.com
          </p>
        </div>
      </section>

      {/* Form + Map */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Contact Form */}
        <div className="bg-white border border-[#E6DED5] rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#3E3A36] mb-6">
            Send Us a Message
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-[#E6DED5] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B89B72]"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-[#E6DED5] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B89B72]"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-[#E6DED5] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B89B72]"
            />

            <button
              type="submit"
              className="bg-[#8B6F47] text-white px-6 py-3 rounded-full hover:bg-[#7A5F3E] transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="rounded-xl overflow-hidden border border-[#E6DED5] shadow-sm">
          <iframe
            title="clinic-location"
            src="https://www.google.com/maps?q=Bangalore&output=embed"
            className="w-full h-full min-h-[420px] border-0"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="bg-[#EFE9E1] py-12 text-center">
        <h2 className="text-2xl font-bold text-[#3E3A36] mb-2">
          Emergency? We’re Available 24/7
        </h2>
        <p className="text-[#6B655E] mb-4">
          Call our emergency helpline immediately for urgent care.
        </p>
        <p className="text-xl font-semibold text-[#8B6F47]">
          🚑 +91 99999 00000
        </p>
      </section>
    </div>
  );
};

export default Contact;

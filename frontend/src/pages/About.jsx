const About = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3E3A36] mb-4">
          About Our Clinic
        </h1>
        <p className="text-[#5A554F] max-w-3xl mx-auto text-base sm:text-lg">
          A modern appointment management platform designed to connect patients
          with trusted doctors easily, securely, and efficiently.
        </p>
      </div>

      {/* MISSION + VISION */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-16 sm:mb-20">
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#3E3A36] mb-3">
            Our Mission
          </h2>
          <p className="text-[#5A554F] leading-relaxed text-sm sm:text-base">
            Our mission is to simplify healthcare access by eliminating long
            waiting times and enabling patients to book appointments with
            qualified doctors in just a few clicks.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#3E3A36] mb-3">
            Our Vision
          </h2>
          <p className="text-[#5A554F] leading-relaxed text-sm sm:text-base">
            We envision a digital healthcare ecosystem where technology empowers
            both patients and doctors to focus on what truly matters — quality
            care and better health outcomes.
          </p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-6xl mx-auto mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#3E3A36] mb-8 sm:mb-10">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Register",
              desc: "Sign up as a patient or doctor and access your personalized dashboard.",
            },
            {
              title: "Book Appointment",
              desc: "Choose a doctor, select a date & time, and book instantly.",
            },
            {
              title: "Get Consultation",
              desc: "Doctors approve appointments and provide timely consultations.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 sm:p-6 shadow-sm text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#C2A878] mb-3">
                {index + 1}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#3E3A36] mb-2">
                {item.title}
              </h3>
              <p className="text-[#5A554F] text-sm sm:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TRUST SECTION */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl p-6 sm:p-10 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#3E3A36] mb-6">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            "Verified Doctors",
            "Secure Appointments",
            "Easy Booking",
            "Patient-Friendly Interface",
          ].map((feature, index) => (
            <div key={index} className="p-3 sm:p-4">
              <p className="font-medium text-sm sm:text-base text-[#5A554F]">
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

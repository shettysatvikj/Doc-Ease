import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#FAF8F5] text-[#3E3A36]">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Compassionate Care, <br />
            <span className="text-[#8B6F47]">Trusted Doctors</span>
          </h1>
          <p className="mt-6 text-lg text-[#5A554F]">
            Book appointments with experienced doctors and receive
            high-quality medical care in a calm and professional environment.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/book-appointment"
              className="bg-[#8B6F47] text-white px-6 py-3 rounded-full hover:bg-[#7A5F3E] transition"
            >
              Book Appointment
            </Link>
            <Link
              to="/services"
              className="border border-[#8B6F47] text-[#8B6F47] px-6 py-3 rounded-full hover:bg-[#D8CFC4] transition"
            >
              Our Services
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Clinic"
            className="rounded-2xl shadow-lg w-full max-w-md"
          />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-[#D8CFC4] py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold text-[#8B6F47]">15+</h3>
            <p className="mt-1">Expert Doctors</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#8B6F47]">10k+</h3>
            <p className="mt-1">Happy Patients</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#8B6F47]">20+</h3>
            <p className="mt-1">Medical Services</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#8B6F47]">24/7</h3>
            <p className="mt-1">Support</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center">
          Our Medical Services
        </h2>
        <p className="text-center text-[#5A554F] mt-3">
          Comprehensive healthcare services under one roof
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {[
            "General Consultation",
            "Dental Care",
            "Cardiology",
            "Pediatrics",
            "Orthopedics",
            "Neurology",
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow border border-[#E6DED5] hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-[#8B6F47]">
                {service}
              </h3>
              <p className="mt-3 text-sm text-[#5A554F]">
                Professional medical care provided by experienced specialists.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <img
            src="data:image/jpeg;base64,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"
            alt="Doctors"
            className="rounded-2xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold">
              Why Choose Our Clinic?
            </h2>
            <ul className="mt-6 space-y-4 text-[#5A554F]">
              <li>✔ Experienced & certified doctors</li>
              <li>✔ Easy online appointment booking</li>
              <li>✔ Modern equipment & facilities</li>
              <li>✔ Patient-first approach</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#8B6F47] py-16 text-center text-white">
        <h2 className="text-3xl font-bold">
          Your Health Is Our Priority
        </h2>
        <p className="mt-3 text-lg opacity-90">
          Book an appointment today and get expert medical care.
        </p>
        <Link
  to="/book-appointment"
  className="inline-block mt-6 bg-white text-[#8B6F47] px-8 py-3 rounded-full font-medium 
             hover:bg-[#FAF8F5] hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-md"
>
  Book Appointment
</Link>

      </section>

    </div>
  );
};

export default Home;

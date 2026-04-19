import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#06353b] text-white mt-24">

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-16">

        {/* ================= BRAND ================= */}
        <div>
          <h2 className="font-display text-4xl tracking-tight mb-6">
            Doc<span className="text-[#2F8F9D]">Ease</span>
          </h2>

          <p className="font-body text-base text-white/75 leading-relaxed max-w-sm">
            A refined private medical practice committed to discretion,
            clinical precision, and an elevated patient experience.
          </p>
        </div>

        {/* ================= NAVIGATION ================= */}
        <div>
          <h3 className="font-display text-xl mb-6">
            Explore
          </h3>

          <ul className="space-y-3 font-body text-base">
            <li>
              <Link to="/" className="text-white/70 hover:text-[#2F8F9D] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white/70 hover:text-[#2F8F9D] transition">
                Our Practice
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-white/70 hover:text-[#2F8F9D] transition">
                Medical Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/70 hover:text-[#2F8F9D] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* ================= CONTACT ================= */}
        <div>
          <h3 className="font-display text-xl mb-6">
            Contact
          </h3>

          <div className="font-body text-base text-white/70 space-y-3">
            <p>123 Health Street</p>
            <p>Bangalore, India</p>
            <p>+91 98765 43210</p>
            <p>support@docease.com</p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-6 text-center font-body text-sm text-white/50">
        © {new Date().getFullYear()} DocEase. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
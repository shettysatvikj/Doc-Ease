import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E6DED5] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About / Logo */}
        <div>
          <h2 className="text-2xl font-bold text-[#8B6F47] mb-4">DocEase</h2>
          <p className="text-[#6B655E] text-sm">
            DocEase is your trusted partner in healthcare. We provide easy
            appointment booking with top doctors, modern facilities, and
            compassionate care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-[#3E3A36] mb-4">Quick Links</h3>
          <ul className="text-[#6B655E] space-y-2">
            <li>
              <Link to="/" className="hover:text-[#8B6F47] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#8B6F47] transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#8B6F47] transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#8B6F47] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-[#3E3A36] mb-4">Contact</h3>
          <p className="text-[#6B655E] text-sm mb-2">📍 123 Health Street, Bangalore, India</p>
          <p className="text-[#6B655E] text-sm mb-2">📞 +91 98765 43210</p>
          <p className="text-[#6B655E] text-sm mb-2">✉️ support@docease.com</p>
          <div className="flex gap-3 mt-3">
            <a href="#" className="text-[#3E3A36] hover:text-[#8B6F47] transition">🌐</a>
            <a href="#" className="text-[#3E3A36] hover:text-[#8B6F47] transition">👍</a>
            <a href="#" className="text-[#3E3A36] hover:text-[#8B6F47] transition">🐦</a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-[#6B655E] text-sm">
        &copy; {new Date().getFullYear()} DocEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E6DED5] mt-20">
      
      <div className="max-w-7xl mx-auto px-6 py-12 
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                      gap-10 text-center sm:text-left">

        {/* About / Logo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#8B6F47]">DocEase</h2>
          <p className="text-[#6B655E] text-sm leading-relaxed">
            DocEase is your trusted partner in healthcare. We provide easy
            appointment booking with top doctors, modern facilities, and
            compassionate care.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#3E3A36]">
            Quick Links
          </h3>
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
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#3E3A36]">
            Contact
          </h3>

          <div className="text-[#6B655E] text-sm space-y-2">
            <p>📍 123 Health Street, Bangalore, India</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ support@docease.com</p>
          </div>

          <div className="flex justify-center sm:justify-start gap-4 mt-3">
            <a href="#" className="text-[#3E3A36] hover:text-[#8B6F47] transition">
              🌐
            </a>
            <a href="#" className="text-[#3E3A36] hover:text-[#8B6F47] transition">
              👍
            </a>
            <a href="#" className="text-[#3E3A36] hover:text-[#8B6F47] transition">
              🐦
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E6DED5] mt-8 py-4 text-center text-[#6B655E] text-sm px-4">
        &copy; {new Date().getFullYear()} DocEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

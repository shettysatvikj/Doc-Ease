import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = (path) =>
    location.pathname === path
      ? "text-[#8B6F47] font-semibold border-b-2 border-[#8B6F47] pb-1"
      : "text-[#3E3A36] hover:text-[#8B6F47] transition";

  return (
    <nav className="bg-[#FAF8F5] border-b border-[#E6DED5] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#8B6F47]">
          Dr.Ease
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={navLinkClass("/")}>Home</Link>
          <Link to="/about" className={navLinkClass("/about")}>About</Link>
          <Link to="/services" className={navLinkClass("/services")}>Services</Link>

          {user && (
            <Link to="/appointments" className={navLinkClass("/appointments")}>
              Appointments
            </Link>
          )}

          <Link to="/contact" className={navLinkClass("/contact")}>Contact</Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">

          {user && (
            <span className="text-sm text-[#5A554F]">
              {user.role === "doctor" ? "Dr." : "Hi,"}{" "}
              <span className="font-medium text-[#3E3A36]">{user.name}</span>
            </span>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="text-[#3E3A36] px-4 py-2 rounded-full hover:bg-[#D8CFC4] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#8B6F47] text-white px-5 py-2 rounded-full hover:bg-[#7A5F3E] transition"
              >
                Register
              </Link>
            </>
          )}

          {user && user.role === "patient" && (
            <Link
              to="/book-appointment"
              className="bg-[#B89B72] text-white px-5 py-2 rounded-full hover:bg-[#A48863] transition"
            >
              Book Appointment
            </Link>
          )}

          {user && (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-[#3E3A36] text-white px-4 py-2 rounded-full hover:bg-black transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-[#3E3A36]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-t border-[#E6DED5] px-6 py-4 space-y-4">

          <Link onClick={() => setMenuOpen(false)} to="/" className="block">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about" className="block">About</Link>
          <Link onClick={() => setMenuOpen(false)} to="/services" className="block">Services</Link>

          {user && (
            <Link
              onClick={() => setMenuOpen(false)}
              to="/appointments"
              className="block"
            >
              Appointments
            </Link>
          )}

          <Link onClick={() => setMenuOpen(false)} to="/contact" className="block">
            Contact
          </Link>

          <hr className="border-[#E6DED5]" />

          {user && (
            <div className="text-sm text-[#5A554F]">
              {user.role === "doctor" ? "Dr." : "Hi,"}{" "}
              <span className="font-medium text-[#3E3A36]">{user.name}</span>
            </div>
          )}

          {!user && (
            <>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/login"
                className="block text-[#3E3A36]"
              >
                Login
              </Link>

              <Link
                onClick={() => setMenuOpen(false)}
                to="/register"
                className="block bg-[#8B6F47] text-white text-center py-2 rounded-full"
              >
                Register
              </Link>
            </>
          )}

          {user && user.role === "patient" && (
            <Link
              onClick={() => setMenuOpen(false)}
              to="/book-appointment"
              className="block bg-[#B89B72] text-white text-center py-2 rounded-full"
            >
              Book Appointment
            </Link>
          )}

          {user && (
            <button
              onClick={() => {
                logout();
                navigate("/");
                setMenuOpen(false);
              }}
              className="w-full bg-[#3E3A36] text-white py-2 rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

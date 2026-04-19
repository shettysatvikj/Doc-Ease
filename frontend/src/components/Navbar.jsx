import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // ✅ Lock background scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    user && { path: "/appointments", label: "Appointments" },
    { path: "/contact", label: "Contact" },
  ].filter(Boolean);

  return (
    <>
      {/* ================= NAVBAR (DESKTOP UNCHANGED) ================= */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-md border-[#06353b]/10"
            : "bg-white/80 border-transparent"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="text-[18px] tracking-[0.15em] uppercase font-semibold text-[#06353b]"
          >
            Dr<span className="text-[#2F8F9D] font-light">Ease</span>
          </Link>

          {/* ✅ Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 relative">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-[13px] uppercase tracking-[0.18em] font-medium transition-all duration-300 ${
                    active
                      ? "text-[#06353b]"
                      : "text-[#06353b]/75 hover:text-[#06353b]"
                  }`}
                >
                  {item.label}

                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      className="absolute -bottom-3 left-0 right-0 h-[2px] bg-[#2F8F9D]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ✅ Desktop Right Side */}
          <div className="hidden md:flex items-center gap-6">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-[13px] uppercase tracking-[0.18em] text-[#06353b]/70 hover:text-[#06353b] transition duration-300"
                >
                  Login
                </Link>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 text-[13px] uppercase tracking-[0.15em] rounded-md bg-[#06353b] text-white hover:bg-[#0E5C63] transition duration-300"
                  >
                    Register
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                {user.role === "patient" && (
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                      to="/book-appointment"
                      className="px-6 py-2.5 text-[13px] uppercase tracking-[0.15em] rounded-md bg-[#06353b] text-white hover:bg-[#0E5C63] transition duration-300"
                    >
                      Book Appointment
                    </Link>
                  </motion.div>
                )}

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="text-[13px] uppercase tracking-[0.18em] text-[#06353b]/60 hover:text-[#2F8F9D] transition duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* ✅ Mobile Toggle */}
          <div
            className="md:hidden flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <span className="w-7 h-[2px] bg-[#06353b]" />
            <span className="w-7 h-[2px] bg-[#06353b]" />
            <span className="w-7 h-[2px] bg-[#06353b]" />
          </div>
        </div>
      </motion.nav>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-[85%] sm:w-[75%] max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                <span className="text-sm tracking-[0.2em] uppercase text-[#06353b]/60">
                  Menu
                </span>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                >
                  <span className="absolute w-5 h-[2px] bg-[#06353b] rotate-45" />
                  <span className="absolute w-5 h-[2px] bg-[#06353b] -rotate-45" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col px-8 py-10 space-y-8">

                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-[#06353b] text-lg tracking-[0.15em] uppercase hover:text-[#2F8F9D] transition"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="border-t border-gray-200 pt-8 space-y-6">

                  {!user ? (
                    <>
                      <Link
                        to="/login"
                        className="block text-[#06353b] uppercase tracking-[0.15em]"
                      >
                        Login
                      </Link>

                      <Link
                        to="/register"
                        className="block text-center px-6 py-3 bg-[#06353b] text-white rounded-md uppercase tracking-[0.15em]"
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      {user.role === "patient" && (
                        <Link
                          to="/book-appointment"
                          className="block text-center px-6 py-3 bg-[#06353b] text-white rounded-md uppercase tracking-[0.15em]"
                        >
                          Book Appointment
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="block w-full text-left text-[#06353b]/70 uppercase tracking-[0.15em]"
                      >
                        Logout
                      </button>
                    </>
                  )}

                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
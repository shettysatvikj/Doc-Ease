// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   return (
//     <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
//       <Link to="/" className="font-bold text-xl">
//         DocEase
//       </Link>

//       <div className="flex gap-4 items-center">
//         {!user && (
//           <>
//             <Link to="/login" className="hover:underline">
//               Login
//             </Link>
//             <Link to="/register" className="hover:underline">
//               Register
//             </Link>
//           </>
//         )}

//         {user && user.role === "patient" && (
//           <>
//             <Link to="/patient" className="hover:underline">
//               Dashboard
//             </Link>
//             <Link to="/book-appointment" className="hover:underline">
//               Book Appointment
//             </Link>
//           </>
//         )}

//         {user && user.role === "doctor" && (
//           <Link to="/doctor" className="hover:underline">
//             Dashboard
//           </Link>
//         )}

//         {user && (
//           <button
//             onClick={() => {
//               logout();
//               navigate("/");
//             }}
//             className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinkClass = (path) =>
    location.pathname === path
      ? "text-[#8B6F47] font-semibold border-b-2 border-[#8B6F47] pb-1"
      : "text-[#3E3A36] hover:text-[#8B6F47] transition";

  return (
    <nav className="bg-[#FAF8F5] border-b border-[#E6DED5] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#8B6F47]">
          DocEase
        </Link>

        {/* Main Menu */}
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
        <div className="flex items-center gap-4">

          {/* 👤 User Name */}
          {user && (
            <span className="text-sm text-[#5A554F] hidden sm:block">
              {user.role === "doctor" ? "Dr." : "Hi,"}{" "}
              <span className="font-medium text-[#3E3A36]">{user.name}</span>
            </span>
          )}

          {/* Auth Buttons */}
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

          {/* Book Appointment Button for Patients */}
          {user && user.role === "patient" && (
            <Link
              to="/book-appointment"
              className="bg-[#B89B72] text-white px-5 py-2 rounded-full hover:bg-[#A48863] transition"
            >
              Book Appointment
            </Link>
          )}

          {/* Logout Button */}
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
      </div>
    </nav>
  );
};

export default Navbar;

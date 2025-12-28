// import { Route, Routes } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Login from "./pages/Login.jsx";
// import PatientDashboard from "./pages/PatientDashboard.jsx"
// import DoctorDashboard from "./pages/DoctorDashboard.jsx"
// import Register from "./pages/Register.jsx";
// import BookAppointment from "./pages/BookAppointment.jsx";
// import Navbar from "./components/Navbar.jsx";
// import Home from "./pages/Home.jsx";
// import About from "./pages/About.jsx";
// import Services from "./pages/Services.jsx";
// import Contact from "./pages/Contact.jsx";
// import Footer from "./pages/Footer.jsx";

// function App() {
//   return (
//     <>
//     <Navbar/>
//       {/* Your routes */}
//           <Routes>
            
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/patient" element={<PatientDashboard />} />
//         <Route path="/doctor" element={<DoctorDashboard />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/book-appointment" element={<BookAppointment />} />
//       </Routes>
//       <ToastContainer position="top-right" autoClose={3000} />
//         <Footer/>
//     </>
//   );
// }
// export default App;

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import Register from "./pages/Register.jsx";
import BookAppointment from "./pages/BookAppointment.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./pages/Footer.jsx"; // Footer is a component

function App() {
  const { user } = useContext(AuthContext); // ✅ get user from context

  return (
    <>
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />

          {/* Appointments route dynamically based on user role */}
          <Route
            path="/appointments"
            element={
              user?.role === "doctor" ? (
                <DoctorDashboard />
              ) : (
                <PatientDashboard />
              )
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </>
  );
}

export default App;

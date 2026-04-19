import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AIChat from "./components/AIChat";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

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
import Footer from "./pages/Footer.jsx";

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // ✅ Instant scroll to top (better mobile performance)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />

      {/* ✅ Prevent horizontal scroll & ensure full height */}
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">

        {/* ✅ Smooth Page Transitions */}
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />

            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />

            <Route
              path="/services"
              element={
                <PageTransition>
                  <Services />
                </PageTransition>
              }
            />

            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />

            <Route
              path="/login"
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              }
            />

            <Route
              path="/register"
              element={
                <PageTransition>
                  <Register />
                </PageTransition>
              }
            />

            <Route
              path="/book-appointment"
              element={
                <PageTransition>
                  <BookAppointment />
                </PageTransition>
              }
            />

            {/* ✅ Role-based route preserved */}
            <Route
              path="/appointments"
              element={
                <PageTransition>
                  {user?.role === "doctor" ? (
                    <DoctorDashboard />
                  ) : (
                    <PatientDashboard />
                  )}
                </PageTransition>
              }
            />

          </Routes>
        </AnimatePresence>

      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />

      {/* ✅ Global Fixed AI Concierge */}
      <AIChat />
    </>
  );
}

export default App;


/* ✅ Premium Smooth Page Transition (Mobile Optimized) */

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // premium smooth easing
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.35,
      ease: "easeInOut",
    },
  },
};

function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
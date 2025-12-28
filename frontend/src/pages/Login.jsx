// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("/users/login", { email, password });
//       login(res.data.user, res.data.token);
//       toast.success("Login successful!");
//       // Redirect based on role
//       if (res.data.user.role === "doctor") navigate("/doctor");
//       else navigate("/patient");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <div className="mb-4">
//           <label className="block mb-1">Email</label>
//           <input
//             type="email"
//             className="w-full border px-3 py-2 rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block mb-1">Password</label>
//           <input
//             type="password"
//             className="w-full border px-3 py-2 rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", { email, password });
      login(res.data.user, res.data.token);
      toast.success("Welcome back!");
      if (res.data.user.role === "doctor") navigate("/appointments");
      else navigate("/appointments");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#E6DED5]">
        
        {/* Header */}
        <div className="bg-[#D8CFC4] rounded-t-2xl p-6 text-center">
          <h2 className="text-2xl font-bold text-[#3E3A36]">
            Clinic Login
          </h2>
          <p className="text-sm text-[#5A554F] mt-1">
            Access your appointments & dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#3E3A36] mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-[#D8CFC4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B89B72]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3E3A36] mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-[#D8CFC4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B89B72]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B6F47] text-white py-2.5 rounded-lg font-medium hover:bg-[#7A5F3E] transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-[#6B655E]">
            Trusted care, professional service
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

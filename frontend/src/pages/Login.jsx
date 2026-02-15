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
      navigate("/appointments");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-lg border border-[#E6DED5] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#D8CFC4] p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#3E3A36]">
            Clinic Login
          </h2>
          <p className="text-sm text-[#5A554F] mt-2">
            Access your appointments & dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-[#3E3A36] mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 text-sm sm:text-base border border-[#D8CFC4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B89B72] focus:border-transparent transition"
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
              className="w-full px-4 py-3 text-sm sm:text-base border border-[#D8CFC4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B89B72] focus:border-transparent transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B6F47] text-white py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-[#7A5F3E] active:scale-[0.98] transition"
          >
            Login
          </button>

          <p className="text-center text-xs sm:text-sm text-[#6B655E]">
            Trusted care, professional service
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

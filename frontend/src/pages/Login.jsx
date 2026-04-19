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
      toast.success("Welcome back");
      navigate("/appointments");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F8F7] pt-32 pb-20 px-6">

      <div className="w-full max-w-md bg-white rounded-2xl border border-[#06353b]/10 shadow-[0_30px_80px_rgba(6,53,59,0.08)]">

        {/* ================= HEADER ================= */}
        <div className="px-8 pt-10 pb-6 text-center border-b border-[#06353b]/10">
          <div className="w-12 h-[2px] bg-[#2F8F9D] mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-[#06353b]">
            Clinic Login
          </h2>
          <p className="text-sm text-[#06353b]/60 mt-2">
            Access your appointments and dashboard
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">

          <div>
            <label className="block text-[13px] uppercase tracking-[0.12em] text-[#06353b]/70 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-[#06353b]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F8F9D]/40 focus:border-[#2F8F9D] transition"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[13px] uppercase tracking-[0.12em] text-[#06353b]/70 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-[#06353b]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F8F9D]/40 focus:border-[#2F8F9D] transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#06353b] text-white py-3 rounded-lg text-sm uppercase tracking-[0.12em] hover:bg-[#0E5C63] transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-xs text-[#06353b]/50 uppercase tracking-[0.15em]">
            Secure & Confidential Access
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  IoMailOutline, 
  IoLockClosedOutline, 
  IoEyeOutline, 
  IoEyeOffOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline 
} from "react-icons/io5";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const showPopup = (message, type) => {
    setNotification({ show: true, message, type });
    if (type === "success") {
      setTimeout(() => {
        navigate("/admin-dashboard"); 
      }, 1500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Live backend URL updated here
      const response = await axios.post("https://shop-co-backend-sigma.vercel.app/auth/admin/login", {
  email: formData.email,
  password: formData.password,
});

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      
      showPopup("Admin Login successful! Welcome back.", "success");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid email or password";
      showPopup(errorMsg, "error");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0f172a] text-slate-200">
      {notification.show && (
        <div className={`fixed top-5 right-5 flex items-center gap-2 px-4 py-3 rounded-xl border shadow-lg z-50 ${notification.type === "success" ? "bg-emerald-900/80 border-emerald-700 text-emerald-200" : "bg-rose-900/80 border-rose-700 text-rose-200"}`}>
          {notification.type === "success" ? <IoCheckmarkCircleOutline size={20} /> : <IoAlertCircleOutline size={20} />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="w-full max-w-md p-8 bg-[#1e293b] border border-slate-800 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold tracking-wide text-white mb-2">
            SHOP<span className="text-blue-500">.CO</span>
          </div>
          <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-medium">
            Admin Panel Control
          </span>
          <h1 className="text-xl font-semibold text-white mt-4">Welcome Back, Owner</h1>
          <p className="text-sm text-slate-400 mt-1">Sign in to manage your store data securely</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5" htmlFor="email">
              Email Address
            </label>
            <div className="relative flex items-center">
              <IoMailOutline className="absolute left-3.5 text-slate-400" size={18} />
              <input
                type="email"
                id="email"
                placeholder="admin@shop.co"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0f172a] border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <IoLockClosedOutline className="absolute left-3.5 text-slate-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#0f172a] border border-slate-700 text-white pl-10 pr-12 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-white transition"
              >
                {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-blue-600/20"
          >
            Authenticate Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
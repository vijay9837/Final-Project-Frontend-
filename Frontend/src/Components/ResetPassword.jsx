import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { setOtpVerified } from "../redux/Slices/auth";
import { useDispatch } from "react-redux";
const ResetPassword = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(600);
  const [strength, setStrength] = useState("");
  const [dialog, setDialog] = useState("");
  const navigate = useNavigate()
  const email = useParams()
  const checkStrength = (value) => {
    let score = 0;

    if (value.length >= 6) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 1) setStrength("Weak");
    else if (score === 2) setStrength("Medium");
    else if (score >= 3) setStrength("Strong");
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    checkStrength(val);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setDialog("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_API}Sadmin/reset-password`,
        {
          email:email.email,
          password: confirmPassword,
        },
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/admin/login");
          dispatch(setOtpVerified(false));
        }, 2000);
      } else if (!res.data.success) {
        toast.error(res.data.message);
        setTimeout(() => {
          navigate("/forgot-password");
          dispatch(setOtpVerified(false));
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      setDialog("Something went wrong");
      dispatch(setOtpVerified(false));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="lg:w-4/12 w-10/12 h-auto backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl lg:rounded-3xl rounded-2xl lg:p-8 p-4 text-white"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center text-sm mb-2 ${
            timeLeft < 60 ? "text-red-400" : "text-gray-300"
          }`}
        >
          Expires in: {formatTime(timeLeft)}
        </motion.p>
        <h2 className="text-2xl font-semibold text-white text-center mb-2">
          Reset Password
        </h2>

        <p className="text-gray-300 text-sm text-center mb-6">
          Enter your new password below
        </p>

        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4 w-full"
        >
          {/* Password */}
          <div className="relative w-full">
            <input
              value={password}
              onChange={handlePasswordChange}
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Password Strength */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: password ? 1 : 0 }}
            className="text-sm"
          >
            Strength:
            <span
              className={`ml-2 font-semibold ${
                strength === "Weak"
                  ? "text-red-500"
                  : strength === "Medium"
                    ? "text-yellow-500"
                    : "text-green-600"
              }`}
            >
              {strength}
            </span>
          </motion.div>

          {/* Confirm Password */}
          <div className="relative w-full">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Match Indicator */}
          {confirmPassword && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-sm ${
                password === confirmPassword ? "text-green-600" : "text-red-500"
              }`}
            >
              {password === confirmPassword
                ? "Passwords match"
                : "Passwords do not match"}
            </motion.div>
          )}

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 transition-all py-3 rounded-lg font-semibold shadow-lg"
          >
            Reset Password
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

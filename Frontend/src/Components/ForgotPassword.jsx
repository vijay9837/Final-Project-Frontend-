import React, { useCallback, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setOtpVerified } from "../redux/Slices/auth";
const ForgotPassword = () => {
  const TOTAL_SECONDS = 120;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setverifying] = useState(false);
  const inputsRef = useRef([]);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    setRemaining(TOTAL_SECONDS);
    setCanResend(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  }, []);

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    let newOtp = [...otp];

    if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    for (let i = newOtp.length - 1; i > index; i--) {
      newOtp[i] = newOtp[i - 1];
    }
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      let newOtp = [...otp];
      for (let i = index; i < newOtp.length - 1; i++) {
        newOtp[i] = newOtp[i + 1];
      }
      newOtp[newOtp.length - 1] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    setverifying(true);
    if (otpCode.length < 6) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API}Sadmin/verify-otp`,
        { email, otp: otpCode },
      );
      if (response.data.success === true) {
        dispatch(setOtpVerified(true));
        navigate(`/reset-password/${email}`);
        setverifying(false);
      }
    } catch (error) {
      console.log(error);
      setverifying(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const userEmail = e.target.email.value;
    setEmail(userEmail);
    const url = `${import.meta.env.VITE_REACT_API}Sadmin/forget-password`;
    try {
      const response = await axios.post(url, { email: userEmail });

      if (response.data.message !== "Email not found") {
        setShowOtp(true);
        startTimer();
        setSending(false);
      } else {
        alert("Email not found");
        setSending(false);
      }
    } catch (error) {
      console.log(error);
      setSending(false);
    }
  };

  const handleResend = async () => {
    setOtp(Array(6).fill(""));
    const url = `${import.meta.env.VITE_REACT_API}Sadmin/forget-password`;
    try {
      const response = await axios.post(url, { email: email });
      if (response.data.message !== "Email not found") {
        setShowOtp(true);
        startTimer();
        setverifying(false);
      } else {
        alert("Email not found");
        setverifying(false);
      }
    } catch (error) {
      console.log(error);
      setverifying(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, duration: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
      <AnimatePresence mode="wait">
        {!showOtp && (
          <motion.div
            key="email"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
            className="lg:w-4/12 w-9/12 h-auto backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl lg:rounded-3xl rounded-2xl lg:p-8 p-4 text-white"
          >
            <motion.h1
              variants={item}
              className="text-3xl font-bold text-center mb-2"
            >
              Forgot Password
            </motion.h1>

            <motion.p
              variants={item}
              className="text-gray-300 text-center lg:text-base text-xs mb-6"
            >
              Enter your email to receive a recovery OTP
            </motion.p>

            <motion.form
              variants={container}
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-4"
            >
              <motion.input
                variants={item}
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <motion.button
                variants={item}
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 transition-all py-3 rounded-lg font-semibold shadow-lg"
              >
                {sending ? (
                  <div className="flex justify-center items-center gap-3 text-gray-200">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  "Send OTP"
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        )}

        {showOtp && (
          <motion.div
            key="otp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute w-screen h-screen backdrop-blur-md flex items-center justify-center "
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white lg:rounded-3xl rounded-2xl lg:w-4/12 lg:h-6/12 w-9/12  shadow-2xl lg:p-8 p-4"
            >
              <h2 className="text-2xl font-bold text-center mb-2">
                Verify OTP
              </h2>

              <p className="text-gray-500 text-center mb-6 lg:text-base text-sm">
                OTP sent to <span className="font-semibold">{email}</span>
              </p>

              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="lg:w-12 w-8 h-8 lg:h-12 text-xl text-center border lg:rounded-lg rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                ))}
              </div>

              <p className="text-center text-gray-400 mb-4">
                {remaining > 0
                  ? `Resend OTP in ${remaining}s`
                  : "You can resend OTP"}
              </p>

              <button
                onClick={handleVerify}
                disabled={otp.join("").length < 6}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 transition"
              >
                {verifying ? (
                  <div className="flex justify-center items-center gap-3 text-gray-200">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify OTP"
                )}
              </button>

              <button
                onClick={handleResend}
                disabled={!canResend}
                className="w-full mt-3 text-indigo-600 font-semibold disabled:text-gray-300"
              >
                Resend OTP
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgotPassword;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../redux/Slices/user";
import { Mail, Lock } from "lucide-react";
import DialogBox from "./DialogBox";
import { motion } from "framer-motion";
function Login() {
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logging, setLogging] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/");
    }
  }, [user.isAuthenticated, navigate]);

  const formSubmit = async (e) => {
    e.preventDefault();
    setLogging(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API}Sadmin/login`,
        data,
      );

      const responseData = response.data;
      if (responseData.Success === true) {
        dispatch(setUser(responseData.data));
        sessionStorage.setItem("admin", JSON.stringify(responseData.data));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        dispatch(logout());
        setErrorMsg(responseData.message);
        setOpenDialog(true);
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message);
      setOpenDialog(true);
    }
    setLogging(false);
  };
const popupVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 40,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
      <motion.div
      variants={popupVariants}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
        className="w-[90%] max-w-md backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8"
      >
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <p className="text-indigo-400 font-semibold">Admin Login</p>
          </div>

          <h2
            style={{ fontFamily: "Mozilla Text, sans-serif" }}
            className="text-white text-3xl font-semibold"
          >
            Welcome Back
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={formSubmit} className="space-y-5">
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-gray-400" />

            <input
              autoFocus
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-gray-400" />

            <input
              type="password"
              name="password"
              required
              placeholder="Enter password"
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end">
            <Link
              className="text-sm text-indigo-400 hover:text-indigo-300"
              to="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-lg shadow-indigo-600/30"
          >
            {logging ? (
              <div className="flex justify-center items-center gap-3 text-gray-200">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </motion.div>

      <DialogBox
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Login Error"
        message={errorMsg}
      />
    </div>
  );
}

export default Login;

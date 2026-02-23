import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { logout, setUser } from "../redux/Slices/user";
function Login() {
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/");
    }
  }, [user.isAuthenticated]);
  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await axios.post(
        "https://effie-uncandied-dumpily.ngrok-free.dev/Sadmin/login",
        data,
      );
      if (response) {
        const responseData = response.data;
        if (responseData.Success === true) {
          console.log(responseData.data);
          dispatch(setUser(responseData.data));
          sessionStorage.setItem("admin", JSON.stringify(responseData.data));
          toast.success(responseData.Message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(responseData.Message);
          dispatch(logout());
        }
      }
    } catch (error) {
      toast.error(error)
    }
  };

  return (
    <div className="h-screen  min-w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="  sm:w-8/10 max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl lg:p-8 p-4 transition-colors duration-300">
        <div className="lg:mb-8 mb-4">
          <h2 className="lg:text-3xl text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Admin Login
          </h2>
        </div>
        <form onSubmit={formSubmit} className="lg:space-y-5 space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enter Admin Email
            </label>
            <input
              autoFocus
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 border sm:text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="****"
              className="w-full px-4 py-2 border sm:text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 lg:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

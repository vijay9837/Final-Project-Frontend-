import React from "react";

const Security = () => {
  return (
    <div className="w-full ">
      <h2 className="text-xl font-semibold text-gray-800 p-2 dark:text-white">
        Security Settings
      </h2>

      <div className="flex w-full gap-3 flex-col">
        <div className="p-4 rounded-xl  dark:border-slate-700">
          <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
            Change Password
          </h3>

          <button className="px-4 py-2 rounded-lg bg-[#24324F] text-white cursor-pointer hover:bg-slate-700 transition">
            Update Password
          </button>
        </div>

        {/* Forgot Password */}
        <div className="p-4 rounded-xl  dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
          <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-1">
            Forgot your password?
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            We’ll send a password reset link to your registered email.
          </p>

          <button
            className="px-4 py-2 rounded-lg border border-[#24324F] text-black cursor-pointer  dark:text-white dark:hover:bg-slate-800 hover:bg-slate-200  transition"
            onClick={() => console.log("Send reset email")}
          >
            Send Reset Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default Security;

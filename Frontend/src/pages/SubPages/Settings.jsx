import React from "react";
import { RiProfileFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineSecurity } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";

const tabBase =
  "flex items-center gap-2 p-3 rounded-md text-sm font-medium transition-all duration-300";

const Settings = () => {
  return (
    <div className="w-full h-full lg:p-4 p-2 flex flex-col gap-3 lg:gap-6 dark:bg-slate-900">
      <ul className="flex flex-col sm:flex-row lg:gap-3 gap-1 ">
        <NavLink
          to="profile"
          end
          className={({ isActive }) =>
            `${tabBase} ${
              isActive
                ? "bg-[#24324F] text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
            }`
          }
        >
          <RiProfileFill className="text-lg" />
          Profile
        </NavLink>

        <NavLink
          to="security"
          className={({ isActive }) =>
            `${tabBase} ${
              isActive
                ? "bg-[#24324F] text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
            }`
          }
        >
          <MdOutlineSecurity className="text-lg" />
          Security
        </NavLink>

        <NavLink
          to="plans"
          className={({ isActive }) =>
            `${tabBase} ${
              isActive
                ? "bg-[#24324F] text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
            }`
          }
        >
          <IoIosPricetags className="text-lg" />
          Plans & Pricing
        </NavLink>
      </ul>
      <main className="bg-white dark:bg-slate-800 lg:rounded-2xl rounded-lg shadow   overflow-y-scroll demo w-full p-3">
        <Outlet />
      </main>
    </div>
  );
};

export default Settings;

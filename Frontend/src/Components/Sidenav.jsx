import { MdDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { closesidenav } from "../redux/Slices/toggleslice";
import { LogOut, Settings, University, User2Icon } from "lucide-react";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { logout } from "../redux/Slices/user";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidenav = () => {
  const issidenav = useSelector((state) => state.toggle);
  const [loggingOut, setIsloggingOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsloggingOut(true);
    setTimeout(() => {
      dispatch(logout());
      navigate("/admin/login");
    }, 2000);
  };
  return (
    <aside
      id="sidebar"
      className={` shadow-lg flex   flex-col  bg-primary h-screen py-2 bg-[#0C4A6E]  transition-all duration-300 ${issidenav ? "lg:w-60 w-0" : "lg:w-13 w-60"} overflow-hidden`}
    >
      <div className="py-3">
        <h2
          className={`text-white font-light text-3xl text-center ${issidenav ? "opacity-100 " : "opacity-0"} `}
        >
          Silverwink
        </h2>
      </div>
      <div className="flex flex-col justify-between h-full">
        <nav className=" space-y-2 lg:mt-3 px-2 ">
          <NavLink
            to={"/dashboard"}
            className={`relative  flex items-center  lg:gap-3 gap-2 lg:p-2 p-1 rounded text-white/80 duration-300 ease-in-out transition-all hover:bg-white/10 cursor-pointer ${({ isactive }) => (isactive ? "bg-yellow-100" : "")}`}
          >
            <div className="flex items-center lg:gap-5 gap-3 ">
              <span className="text-xl group">
                <MdDashboard className="w-4  h-4 lg:w-5 lg:h-5" />
              </span>
              <span
                className={` ${issidenav ? "visible " : "lg:hidden"} text-sm`}
              >
                Dashboard
              </span>
            </div>

            <span
              className={`tooltip  absolute ml-3 bg-black  text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap `}
            >
              Dashboard
            </span>
          </NavLink>
          <NavLink
            to={"/institute"}
            className={`relative  flex items-center lg:gap-3 gap-2 lg:p-2 p-1 rounded text-white/80 duration-300 ease-in-out transition-all hover:bg-white/10 cursor-pointer ${({ isactive }) => (isactive ? "bg-yellow-100" : "")}`}
          >
            <div className="flex items-center group lg:gap-5 gap-3 overflow-hidden">
              <span>
                <University className="w-4 h-4 lg:w-5 lg:h-5" />
              </span>
              <span
                className={`menu-text ${issidenav ? "visible" : "lg:hidden"} text-sm `}
              >
                Institute
              </span>
            </div>

            <span className="tooltip absolute left-full ml-3 bg-black  duration-300 ease-in-out transition-all text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Institute
            </span>
          </NavLink>
          <NavLink
            to={"/students"}
            className={`relative  flex items-center lg:gap-3 gap-2 lg:p-2 p-1 rounded text-white/80 duration-300 ease-in-out transition-all hover:bg-white/10 cursor-pointer ${({ isactive }) => (isactive ? "bg-yellow-100" : "")}`}
          >
            <div className="flex group items-center lg:gap-5 gap-3 overflow-hidden">
              <span>
                <User2Icon className="w-4 h-4 lg:w-5 lg:h-5" />
              </span>
              <span
                className={`menu-text ${issidenav ? "visible" : "lg:hidden"} text-sm  `}
              >
                Students
              </span>
            </div>

            <span className="tooltip absolute left-full ml-3 bg-black  text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Students
            </span>
          </NavLink>
          <NavLink
            to={"/inqueries"}
            className={`relative  flex items-center lg:gap-3 gap-2 lg:p-2 p-1 rounded text-white/80 duration-300 ease-in-out transition-all hover:bg-white/10 cursor-pointer ${({ isactive }) => (isactive ? "bg-yellow-100" : "")}`}
          >
            <div className="flex group items-center lg:gap-5 gap-3 overflow-hidden">
              <span>
                <MdOutlineSupportAgent className="w-4 h-4 lg:w-5 lg:h-5" />
              </span>
              <span
                className={`menu-text ${issidenav ? "visible" : "lg:hidden"} text-sm `}
              >
                Inqueries
              </span>
            </div>

            <span className="tooltip absolute left-full ml-3 bg-black  text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Students
            </span>
          </NavLink>
          <NavLink
            to={"/subscription"}
            className={`relative  flex items-center lg:gap-3 gap-2 lg:p-2 p-1 rounded text-white/80 duration-300 ease-in-out transition-all hover:bg-white/10 cursor-pointer ${({ isactive }) => (isactive ? "bg-yellow-100" : "")}`}
          >
            <div className="flex group items-center lg:gap-5 gap-3 overflow-hidden">
              <span>
                <FaHandHoldingDollar className="w-4 h-4 lg:w-5 lg:h-5" />
              </span>
              <span
                className={`menu-text ${issidenav ? "visible" : "lg:hidden"} text-sm `}
              >
                Subscription
              </span>
            </div>

            <span className="tooltip absolute left-full ml-3 bg-black  text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Students
            </span>
          </NavLink>
        </nav>
        <nav className="space-y-2 px-2  h-auto">
          <NavLink
            to={"/settings"}
            className={`relative  flex items-center lg:gap-3 gap-2 lg:p-2 p-1 rounded text-white/80 duration-300 ease-in-out transition-all hover:bg-white/10 cursor-pointer ${({ isactive }) => (isactive ? "bg-yellow-100" : "")}`}
          >
            <div className="flex group items-center lg:gap-5 gap-3">
              <span className="text-xl">
                <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
              </span>
              <span
                className={`menu-text ${issidenav ? "visible " : "lg:hidden"} text-sm  `}
              >
                Settings
              </span>
            </div>

            <span className="tooltip absolute left-full ml-3 bg-black  text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Settings
            </span>
          </NavLink>
          <button
            onClick={handleLogout}
            className={`relative  w-full flex items-center lg:gap-3 gap-2 lg:p-2 p-1 rounded text-white/80  hover:bg-white/15 duration-300 ease-in-out transition-all  cursor-pointer ${({ isactive }) => (isactive ? "active" : "inactive")}`}
          >
            <div className="flex group items-center lg:gap-5 gap-3 overflow-hidden">
              <span className="text-xl">
                <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
              </span>
              <span
                className={`menu-text ${issidenav ? "visible " : "lg:hidden"} text-sm `}
              >
                {loggingOut ? (
                  <div className="flex justify-center items-center gap-3 text-gray-200">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    Logging Out...
                  </div>
                ) : (
                  "Logout"
                )}
              </span>
            </div>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidenav;

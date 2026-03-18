import { Bell, Filter, Menu, Plus, Search, Settings, Sun } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidenavtoggle } from "../redux/Slices/toggleslice";
import { searchboxclose, searchboxopen } from "../redux/Slices/searchslice";
import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineSun } from "react-icons/ai";
import SearchBox from "./SearchBox";
import { toggletheme } from "../redux/Slices/themeslice";
import { logout } from "../redux/Slices/user";
import { useNavigate } from "react-router-dom";
import { RiMessage2Line } from "react-icons/ri";
function Navbar() {
  const [notification, setNotification] = useState([
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
    {
      title: "Institute",
      body: "hi from body",
    },
  ]);
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const [loggingOut, setIsloggingOut] = useState(false);
  const [isProfileDropdown, setIsProfileDrowdown] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const searchboxhandle = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      dispatch(searchboxopen());
    } else {
      dispatch(searchboxclose());
    }
  };
  const handleLogout = () => {
    setIsloggingOut(true);
    setTimeout(() => {
      dispatch(logout());
      navigate("/admin/login");
    }, 2000);
  };

  return (
    <div className="bg-white/80  dark:bg-gray-900 backdrop-blur-xl border-b flex  items-center  h-full w-full border-slate-200/50 dark:border-slate-700/50 px-2 lg:px-6 py-2">
      <div className="flex items-center  w-full h-full">
        <div className="flex  lg:mx-3 items-center justify-between w-full">
          <div className="flex items-center ">
            <button
              onClick={() => dispatch(sidenavtoggle())}
              className="lg:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Menu className="lg:w-5 h-5" />
            </button>
          </div>
          <div className="hidden lg:flex flex-1 max-w-md mx-3 lg:mx-8 relative">
            <div className="relative w-full">
              <Search className="lg:w-4 lg:h-4 w-3 h-3 absolute left-1 lg:left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                onChange={searchboxhandle}
                type="text"
                placeholder="Search anything"
                name="searchbox"
                className="w-full py-1 text-sm  lg:py-3 pl-5 lg:pl-10 bg-slate-100 dark:bg-slate-800 border border-slate-200  dark:border-slate-700 lg:rounded-xl rounded-md text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div
              className={`w-full lg:h-48 ${search.isSearch ? "hidden" : "flex"}  absolute z-100`}
            >
              <SearchBox />
            </div>
          </div>
          <div className="flex items-center space-x-3 justify-center gap-1  ">
            <button
              onClick={() => dispatch(toggletheme())}
              className="lg:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <AiOutlineSun className="lg:w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setNotificationDropDown(!notificationDropDown);
                setIsProfileDrowdown(false);
              }}
              className="relative  p-1 lg:p-2 m-0 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors "
            >
              <Bell className=" w-3.5 h-3.5 lg:w-5 lg:h-5" />
              <span className="absolute -top-1 right-1 lg:right-2 lg:-top-1 w-3 h-3 lg:w-5 lg:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
              <div
                className={`absolute top-10 -left-30 p-1 w-60 h-40 bg-white dark:bg-gray-800 
                            flex flex-col gap-2 rounded-lg border border-slate-200 dark:border-slate-700
                            transition-all duration-200 ease-in-out
                            ${
                              notificationDropDown
                                ? "opacity-100 translate-y-2 pointer-events-auto"
                                : "opacity-0 translate-y-0 pointer-events-none"
                            }
                            `}
              >
                <h2 className="flex items-center lg:font-bold lg:text-base text-sm   justify-between p-1 bg-white dark:bg-slate-800 w-full  ">
                  Notifications <RiMessage2Line className="text-sm" />
                </h2>
                <ul className=" w-full flex flex-col rounded overflow-y-scroll demo h-full ">
                  {notification.length > 0 ? (
                    notification.map((noti) => {
                      return (
                        <li
                          id={noti.body}
                          className=" dark:bg-slate-800 flex border-b py-1 px-2 border-slate-300 dark:border-slate-700  items-center justify-between "
                        >
                          <div className=" flex flex-col items-start ">
                            <p className="text-sm p-0">{noti.title}</p>
                            <p className="text-xs   text-slate-600">
                              {noti.body}
                            </p>
                          </div>
                          <div className="h-2 w-2 bg-red-600 rounded-full"></div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="lg:text-sm text-xs p-2 ">No Notification</li>
                  )}
                </ul>
              </div>
            </button>
            <div
              onClick={() => {
                setIsProfileDrowdown(!isProfileDropdown);
                setNotificationDropDown(false);
              }}
              className="flex dropdown  w-full items-center lg:pl-3 lg:gap-3 gap-2 border-l border-slate-200 dark:border-slate-700 cursor-pointer relative "
            >
              <img
                src="jv"
                alt="User"
                className="w-6 h-6 lg:w-8 lg:h-8 rounded-full  "
              />
              <div className=" flex dark:text-white font-semibold lg:gap-2 items-center text-sm lg:text-md">
                <p>{user.currentUser?.Name}</p>
                <FaAngleDown className="text-sm" />
              </div>
              <div
                className={`absolute top-10 -left-40 w-60 h-auto bg-white dark:bg-gray-800 
                              flex flex-col gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700
                              transition-all duration-200 ease-in-out
                              ${
                                isProfileDropdown
                                  ? "opacity-100 translate-y-2 pointer-events-auto"
                                  : "opacity-0 translate-y-0 pointer-events-none"
                              }
                              `}
              >
                <li
                  onClick={handleLogout}
                  className="text-red-600 p-1 duration-300 ease-in-out transition-colors list-none hover:bg-slate-100  dark:hover:bg-slate-400 rounded-sm"
                >
                  {loggingOut ? (
                    <div className="flex justify-center items-center gap-3 text-gray-200">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                      Logging Out...
                    </div>
                  ) : (
                    "Logout"
                  )}
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

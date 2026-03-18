import React, { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { GoChevronDown } from "react-icons/go";

const Notifications = () => {
  const [notification, setNotification] = useState([
    { id: 101, title: "Institute", body: "hi from body", seen: true },
    { id: 102, title: "Institute", body: "hi from body", seen: false },
    { id: 103, title: "Institute", body: "hi from body", seen: true },
    { id: 104, title: "Institute", body: "hi from body", seen: true },
    { id: 105, title: "Institute", body: "hi from body", seen: true },
    { id: 106, title: "Institute", body: "hi from body", seen: false },
    { id: 107, title: "Institute", body: "hi from body", seen: false },
    { id: 108, title: "Institute", body: "hi from body", seen: false },
    { id: 109, title: "Institute", body: "hi from body", seen: false },
    { id: 110, title: "Institute", body: "hi from body", seen: true },
    { id: 111, title: "Institute", body: "hi from body", seen: false },
    { id: 112, title: "Institute", body: "hi from body", seen: false },
  ]);

  const notificationUpdateHandle = (id) => {
    setNotification((prev) =>
      prev.map((noti) =>
        noti.id === id ? { ...noti, seen: false } : noti,
      ),
    );
  };
  useEffect(() => {}, []);
  return (
    <div className="bg-white w-full dark:bg-gray-800 flex flex-col items-center gap-2  lg:h-full lg:max-h-full max-h-70  relative  lg:rounded-2xl rounded-lg lg:p-3 px-2 py-1 ">
      <h2 className="flex items-center lg:font-bold lg:text-base text-lg rounded p-2  justify-between  bg-white dark:bg-slate-800  dark:border-slate-700 dark:text-white w-full lg:gap-3 gap-2 ">
        Reccent Notifications <RiMessage2Line className="text-2xl" />
      </h2>
      <ul className=" w-full flex flex-col rounded overflow-y-scroll gap-1 demo h-full ">
        {notification.length > 0 ? (
          notification.map((noti) => {
            return (
              <li
                onClick={() => notificationUpdateHandle(noti.id)}
                id={noti.id}
                key={noti.id}
                className="w-full dark:bg-slate-800 border dark:border-slate-700 dark:hover:bg-gray-700 duration-300 ease-in-out transition-all hover:bg-slate-200 rounded dark:text-white flex border-b p-2 border-slate-300 relative  items-center justify-between "
              >
                <div>
                  <h3 className="w-full font-semibold">{noti.title}</h3>
                  <p className="text-xs font-light text-slate-600 dark:text-gray-200">
                    {noti.body}
                  </p>
                </div>
                <GoChevronDown className="text-black dark:text-gray-200 " />
                <div
                  className={`h-2 w-2 absolute top-2 right-3 bg-red-600 rounded-full self-start ${noti.seen ? "visible" : "hidden"}`}
                ></div>
              </li>
            );
          })
        ) : (
          <li className="lg:text-sm text-xs p-2 ">No Notification</li>
        )}
      </ul>
    </div>
  );
};

export default Notifications;

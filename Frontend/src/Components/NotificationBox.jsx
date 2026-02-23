import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { requestForToken } from "../utils/firebaseMessging";

const NotificationBox = () => {
  useEffect(()=>{
    requestForToken()
  },[])
  const notifications = useSelector((state) => state.notification);
  console.log(notifications.notifications);
  return (
    <div className="h-full w-full  bg-white p-1  ">
      <ul className="w-full h-full  flex flex-col gap-2 p-1 overflow-y-scroll ">
        {notifications.notifications.length > 0
          ? notifications.notifications.map((n) => {
             return <li className="w-full text-black font-semibold text-left border rounded-sm shadow-2xl p-1 ">{n.text}</li>;
            }) 
          : <p className=" font-bold text-center text-[12px]">No Notification Here !</p> }
      </ul>
    </div>
  );
};

export default NotificationBox;

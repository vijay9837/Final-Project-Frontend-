import React from "react";
import { HiUserGroup } from "react-icons/hi";

const Employes = () => {
  const employData = [
    {
      image: "",
      id: "324",
      name: "Vijay",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "AMit",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Rahul",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
    {
      image: "",
      id: "324",
      name: "Saurabh",
      role: "Sales",
    },
  ];
  return (
    <div className="w-full h-full bg-white flex-col gap-2 text-black dark:bg-gray-800 lg:rounded-2xl rounded-lg p-2 flex overflow-hidden">
      <h2 className=" rounded items-center font-bold bg-white dark:bg-slate-800  dark:border-slate-700 dark:text-white w-full flex justify-between p-2   ">
        Employes <HiUserGroup className="text-2xl"/>
      </h2>
      <div className="w-full lg:h-full  overflow-y-scroll demo h-55 flex flex-col gap-1 dark:text-white lg:rounded-lg">
        {employData ? (
          employData.map((emp) => {
            return (
              <h3
                className="flex justify-between p-2 items-center bg-white lg:rounded-lg dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300 ease-in-out"
              >
                <img
                  className="rounded-full  border-2 h-8 w-8 lg:h-10 lg:w-10"
                  alt="empimage"
                />
                {emp.name}
              </h3>
            );
          })
        ) : (
          <h3 className="w-full p-2 text-black">No Employes</h3>
        )}
      </div>
    </div>
  );
};

export default Employes;

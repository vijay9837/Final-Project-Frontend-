import { Filter, Loader, Search } from "lucide-react";
import { MdDeleteSweep } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import React, { useEffect, useState } from "react";
import axios from "axios";
const Students = () => {
  const [institute, setInstitute] = useState([]);
  const fecthInstitute = async () => {
 
  };
  useEffect(() => {
    fecthInstitute();
  }, []);
  const [status, setStatus] = useState("inactive");
  const [loading, setLoading] = useState(false);
  const instituteStatusUpdate = (e) => {
    e.preventDefault();
    console.log(e.target.id);
  };

  const openInstitute = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full flex flex-col lg:gap-3 mx-auto h-full dark:bg-gray-900 p-2 lg:p-4">
      <div className="w-full flex flex-col lg:flex-row gap-3 items-center">
        <div className="w-full lg:w-2/5 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Student"
            name="searchbox"
            className="
              w-full py-2 lg:py-3 pl-10 pr-10
              bg-slate-100 dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              lg:rounded-xl rounded text-sm lg:text-base
              text-slate-800 dark:text-white
              placeholder-slate-500
              focus:outline-none focus:ring-2 focus:ring-purple-400
              transition-all
            "
          />
        </div>
        <div className="w-full lg:w-3/5 flex justify-center items-center  lg:flex-nowrap lg:gap-3 gap-1 px-2">
          <div className="flex items-center w-1/3 lg:w-full gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 lg:rounded-xl rounded lg:px-3 px-1 py-1 lg:py-3">
            <label className="text-sm lg:text-base font-semibold dark:text-white whitespace-nowrap">
              From:
            </label>
            <input
              type="date"
              name="fromdate"
              className="
                bg-transparent text-sm lg:text-base
                text-slate-800 dark:text-white
                outline-none
              "
            />
          </div>

          <div className="flex items-center gap-2 w-1/3 lg:w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 lg:rounded-xl rounded lg:px-3 px-1 py-1 lg:py-3">
            <label className="text-sm  lg:text-base font-semibold dark:text-white whitespace-nowrap">
              To:
            </label>
            <input
              type="date"
              name="todate"
              className="
                bg-transparent text-sm lg:text-base
                text-slate-800 dark:text-white
                outline-none
              "
            />
          </div>

          {/* LIST */}
          <div className="flex items-center gap-2 w-1/3 lg:w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 lg:rounded-xl rounded lg:px-3 px-1 py-1 lg:py-3">
            <label className="text-sm lg:text-base font-semibold dark:text-white whitespace-nowrap">
              List:
            </label>
            <select
              name="toplistitems"
              className="
                bg-transparent text-sm lg:text-base
                text-slate-800 dark:text-white
                outline-none cursor-pointer
              "
            >
              <option value="top-10">Top 10</option>
              <option value="top-25">Top 25</option>
              <option value="top-50">Top 50</option>
              <option value="top-100">Top 100</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full  h-auto  rounded-md mt-3">
        <table className="flex flex-col gap-2 justify-between ">
          <thead className="bg-slate-100  lg:rounded-md rounded-sm dark:bg-slate-800 border dark:border-slate-700 border-slate-200 dark:text-white overflow-hidden">
            <tr className="flex justify-between items-center">
              <td className="  text-gray-400 text-xs p-1 lg:p-2 lg:text-base text-center">
                Id
              </td>
              <td className="flex-2  text-gray-400 text-xs p-1 lg:p-2 lg:text-base text-center">
                Institute Name
              </td>
              <td className="flex-1  text-gray-400 text-xs p-1 lg:p-2 lg:text-base text-center hidden lg:inline">
                Address
              </td>
              <td className="flex-1  text-gray-400 text-xs p-1 lg:p-2 lg:text-base text-center">
                Phone
              </td>
              <td className="flex-1  text-gray-400 text-xs p-1 lg:p-2 lg:text-base text-center">
                Status
              </td>
              <td className="flex-1  text-gray-400 text-xs p-1 lg:p-2 lg:text-base text-center">
                Action
              </td>
            </tr>
          </thead>
          <tbody className="bg-slate-50 text-center flexz items-center w-full overflow-hidden rounded">
            {loading ? (
              <tr  className="flex justify-center items-center w-full">
                <td className="w-full flex items-center justify-center">
                  <div class="flex-col gap-4 w-full flex items-center justify-center">
                    <div class="w-10 h-10 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                      <div class="w-8 h-8 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                    </div>
                  </div>
                </td>
              </tr>
            ) : institute.length > 0 ? (
              institute.map((inst) => {
                return (
                  <tr
                    key={inst.instituteId}
                    onClick={openInstitute}
                    className="flex justify-center items-center"
                  >
                    <td className="  text-xs  lg:p-2 lg:text-base text-center">
                      {inst.instituteId}
                    </td>
                    <td className="flex-2   text-xs  lg:p-2 lg:text-base text-center">
                      {inst.name}
                    </td>
                    <td className="flex-1   text-xs  lg:p-2 lg:text-base text-center hidden lg:inline">
                      {inst.address}
                    </td>
                    <td className="flex-1  text-xs  lg:p-2 lg:text-base text-center  text-ellipsis truncate">
                      {inst.contact}
                    </td>
                    <td
                      onClick={instituteStatusUpdate}
                      id={inst.status}
                      className={`flex-1   text-xs  lg:p-2 lg:text-base text-center font-bold ${inst.status === "active" ? "text-green-300" : "text-red-300"} `}
                    >
                      {inst.status}
                    </td>
                    <td className="flex-1   text-xs  lg:p-2 lg:text-base text-center flex items-center justify-center gap-3">
                      <MdDeleteSweep className="lg:text-2xl text-base hover:text-slate-500 duration-300 ease-in-out transition-colors cursor-pointer" />
                      <AiFillEdit className="lg:text-2xl text-base hover:text-slate-500 duration-300 ease-in-out transition-colors cursor-pointer" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="flex justify-center w-full dark:bg-slate-700 dark:text-white ">
                <h2 className="p-2">No Student Registered</h2>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;

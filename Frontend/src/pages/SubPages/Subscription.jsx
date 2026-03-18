import axios from "axios";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

const Subscription = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [institutePlan, setInstitutePlan] = useState([]);

  const fetchInstitute = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_API}institute/allInstitute`,
      );

      if (response.status === 200) {
        setInstitutePlan(response.data.institutes || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitute();
  }, []);

  const filteredInstitutes = institutePlan.filter((inst) =>
    inst.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="w-full h-full lg:p-6 p-2 flex flex-col gap-4 bg-slate-200 dark:bg-gray-900">
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={searchValue}
          type="text"
          placeholder="Search Institute"
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full py-2 lg:py-3 pl-10 pr-4
          bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          rounded-xl text-sm lg:text-base
          text-slate-800 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
        />
      </div>
      <div className="w-full rounded-xl shadow bg-white dark:bg-slate-800 p-2">
        <table className="w-full table-fixed text-[10px] sm:text-xs lg:text-base ">
          <thead className="bg-slate-100  dark:bg-slate-700 rounded-lg lg:rounded-lg text-gray-600 dark:text-gray-200">
            <tr className="">
              <th className="p-2 text-left w-[15%]">ID</th>
              <th className="p-2 text-left w-[20%]">Name</th>
              <th className="p-2 text-left w-[15%]">Plan</th>
              <th className="p-2 text-left w-[20%]">Start</th>
              <th className="p-2 text-left w-[20%]">End</th>
              <th className="p-2 text-left w-[10%]">Action</th>
            </tr>
          </thead>

          <tbody className="w-full ">
            {loading ? (
              <tr className="flex justify-center items-center w-full ">
                <td className="w-full flex items-center justify-center ">
                  <div className="flex-col gap-4 w-full flex items-center justify-center  dark:bg-gray-800">
                    <div className="w-10 h-10 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full dark:bg-gray-800">
                      <div className="w-8 h-8 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full bg-transparent dark:bg-gray-800"></div>
                    </div>
                  </div>
                </td>
              </tr>
            ) : filteredInstitutes.length > 0 ? (
              filteredInstitutes.map((inst) => (
                <tr
                  key={inst.instituteId}
                  className="border-t border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  <td className="py-2 lg:py-3 dark:text-white break-words">{inst.instituteId}</td>

                  <td className="py-2 lg:py-3 dark:text-white break-words">{inst.name}</td>

                  <td className="py-2 lg:py-3 dark:text-white break-words">{inst.planname || "N/A"}</td>

                  <td className="py-2 lg:py-3 dark:text-white break-words">{ inst.planstartdate}</td>

                  <td className="py-2 lg:py-3 dark:text-white break-words">{inst.planenddate}</td>

                  <td className="">
                    <button className="text-[9px] sm:text-xs px-2 py-1 rounded bg-purple-500 text-white hover:bg-purple-600">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No Institute Registered
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscription;

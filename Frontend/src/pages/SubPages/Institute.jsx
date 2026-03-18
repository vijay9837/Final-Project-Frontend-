import { Search } from "lucide-react";
import { AiFillEdit } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  closeAddInstitue,
  openAddInstitute,
} from "../../redux/Slices/addInstituteSlice";
const Institute = () => {
  let responseInstitute = [];
  const navigate = useNavigate();
  const [allInstitutes, setAllInstitutes] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const dispatch = useDispatch();

  const fecthInstitute = async () => {
    const url = `${import.meta.env.VITE_REACT_API}institute/allInstitute`;
    try {
      setLoading(true);
      const response = await axios(url);
      responseInstitute = response.data.institutes;
      console.log(responseInstitute);
      if (response.status === 200) {
        setAllInstitutes(response.data.institutes);
        setInstitutes(response.data.institutes);
        setLoading(false);
      }
    } catch (error) {
      console.error("error" + error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    date.setHours(12, 0, 0, 0);
    console.log(
      date.toLocaleDateString("en-IN", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    );
    fecthInstitute();
  }, []);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const instituteStatusUpdate = async (e) => {
    const status = e.target.value;
    const id = e.target.id;
    console.log(e.target.value);
    const url = `${import.meta.env.VITE_REACT_API}institute/updateInstitute/${id}`;
    console.log(url);
    const response = await axios.put(url);
    console.log(response);
    console.log(response.status);
    if (response.status === 200) {
      fecthInstitute();
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const openInstitute = (e) => {
    e.preventDefault();
  };

  const searchStudent = (e) => {
    if (e === "active") {
      const filtered = allInstitutes.filter((inst) => inst.status === e);

      if (filtered.length === 0) {
        setInstitutes(allInstitutes);
      } else {
        setInstitutes(filtered);
      }
    } else if (e === "inactive") {
      const filtered = allInstitutes.filter((inst) => inst.status === e);

      if (filtered.length === 0) {
        setInstitutes(allInstitutes);
      } else {
        setInstitutes(filtered);
      }
    } else if (e === "pending") {
      const filtered = allInstitutes.filter((inst) => inst.status === e);

      if (filtered.length === 0) {
        setInstitutes(allInstitutes);
      } else {
        setInstitutes(filtered);
      }
    } else {
      const value = e.target.value.toLowerCase();
      setSearchValue(value);

      if (!value) {
        setInstitutes(allInstitutes);
        return;
      }

      const filtered = allInstitutes.filter((inst) => {
        return (
          inst.name?.toLowerCase().includes(value) ||
          inst.contact?.toString().includes(value) ||
          inst.instituteId?.toString().includes(value)
        );
      });
      if (filtered.length === 0) {
        setInstitutes(allInstitutes);
      } else {
        setInstitutes(filtered);
      }
    }
  };

  return (
    <div className="w-full flex flex-col lg:gap-3  h-full dark:bg-gray-900 p-2 lg:p-4">
      <div className="w-full flex flex-row lg:gap-3 gap-2 items-center">
        <div className="w-full relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchValue}
            type="text"
            placeholder="Search Insitute"
            name="searchbox"
            onChange={searchStudent}
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
        <button
          onClick={() => dispatch(openAddInstitute())}
          className="bg-[#24324F] text-white duration-300 transition-all ease-in-out lg:rounded-lg rounded-md hover:shadow-lg text-sm lg:text-base lg:px-3 px-2 h-full font-semibold cursor-pointer active:scale-95 hover:bg-[#19202e]"
        >
          Add Institute
        </button>
      </div>
      <div className="w-full  h-full   rounded-md mt-3">
        <table className="flex flex-col gap-2 justify-between   ">
          <thead className="bg-slate-100  lg:rounded-md rounded-sm dark:bg-slate-800 border dark:border-slate-700 border-slate-200 dark:text-white overflow-hidden">
            <tr className="flex justify-between items-center">
              <td className=" flex-1 text-gray-400 text-xs p-1 lg:p-2 lg:text-base text-center">
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
          <tbody className="bg-slate-50 text-center w-full overflow-y-scroll demo rounded">
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
            ) : institutes?.length > 0 ? (
              institutes.map((inst) => {
                return (
                  <tr
                    key={inst.instituteId}
                    onClick={openInstitute}
                    className="flex  items-center gap-2 bg-white dark:bg-slate-800 dark:text-white border-b dark:border-slate-700 border-slate-200 p-1 py-2 lg:py-1"
                  >
                    <td className=" flex-1 text-xs  lg:p-2 lg:text-base text-center">
                      {inst.instituteId}
                    </td>
                    <td className="flex-2 text-left truncate text-xs  lg:p-2 lg:text-base">
                      {inst.name}
                    </td>
                    <td className="flex-1 truncate  text-xs  lg:p-2 lg:text-base text-center hidden lg:inline">
                      {inst.address}
                    </td>
                    <td className="flex-1  text-xs  lg:p-2 lg:text-base text-center  text-ellipsis truncate">
                      {inst.contact}
                    </td>
                    <td
                      id={inst.status}
                      className={`flex-1 text-xs lg:p-2 lg:text-base text-center font-bold`}
                    >
                      <select
                        id={inst._id}
                        onChange={instituteStatusUpdate}
                        className={`${inst.status === "active" ? "bg-green-400" : inst.status === "inactive" ? "bg-red-400" : "hover:border-[#24324F] bg-[#24324F]"}    rounded p-1 font-medium text-white outline-0 border-0`}
                        value={
                          inst.status === "pending" ? "pending" : inst.status
                        }
                      >
                        {inst.status}
                        <option
                          value="pending"
                          className={`${inst.status !== "pending" ? "visible" : "hidden"} outline-0 border-0 rounded-md`}
                        >
                          Pending
                        </option>
                        <option
                          className={`${inst.status !== "active" ? "visible" : "hidden"} outline-0 border-0 rounded-md`}
                          value="active"
                        >
                          Active
                        </option>
                        <option
                          className={`${inst.status !== "inactive" ? "visible" : "hidden"} outline-0 border-0 rounded-md`}
                          value="inactive"
                        >
                          Inactive
                        </option>
                      </select>
                    </td>

                    <td className="flex-1   text-xs  lg:p-2 lg:text-base text-center flex items-center justify-center gap-3">
                      <AiFillEdit className="lg:text-2xl text-base hover:text-slate-500 duration-300 ease-in-out transition-colors cursor-pointer" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="flex justify-center w-full dark:bg-slate-700 dark:text-white ">
                <td className="p-2">No Institute Registered</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Institute;

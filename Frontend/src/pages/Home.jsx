import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Sidenav from "../Components/Sidenav";
import { Outlet } from "react-router-dom";
import { closesidenav } from "../redux/Slices/toggleslice";
import SearchBox from "../Components/SearchBox";
import { Search } from "lucide-react";
import { searchboxclose, searchboxopen } from "../redux/Slices/searchslice";
import { useState } from "react";
import { closeAddInstitue } from "../redux/Slices/addInstituteSlice";
import AddInstitute from "../Components/AddInstitute";

const Home = () => {
  const issidenav = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const isaddInstitute = useSelector((state) => state.addInstitute);
  const searchboxhandle = (e) => {
    if (e.target.value !== "") {
      dispatch(searchboxopen());
    } else {
      dispatch(searchboxclose());
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-screen overflow-hidden">
      {isaddInstitute ? (
        <div
          onClick={() => dispatch(closeAddInstitue())}
          className="backdrop-blur absolute inset-0 flex items-center justify-center duration-300 ease-in-out transition-all top-0 left-0 z-999 "
        >
          <div onClick={((e)=> e.stopPropagation())} className="bg-slate-200 h-full lg:w-8/10 lg:shadow-2xl shadow-black lg:rounded-2xl lg:p-3 dark:bg-slate-800 overflow-y-scroll demo">
              <AddInstitute />
          </div>
        </div>
      ) : null}

      <div className=" flex items-center h-full ">
        <div className="z-998 h-full  left-0 top-0  flex absolute lg:static">
          <Sidenav />
        </div>

        {!issidenav && (
          <div
            onClick={() => dispatch(closesidenav())}
            className="fixed inset-0 bg-black/40  z-997 lg:hidden"
          />
        )}
      </div>

      <div className=" flex flex-col h-full w-full ">
        <div className="w-full lg:h-1/10 h-1/14 z-996">
          <Navbar />
        </div>

        <main className=" h-13/14 w-full relative overflow-y-scroll demo ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;

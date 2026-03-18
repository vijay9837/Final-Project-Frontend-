import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import AnimatedCounter from "../../Components/AnimatedCounter";
import PaymentBarChart from "../../Components/Dashboard/Charts/PaymentBarChart";
import OrganisationPerformanceChart from "../../Components/Dashboard/Charts/OrganisationPerformanceChart";
import Employes from "../../Components/Dashboard/Employes";
import Notifications from "../../Components/Dashboard/Notifications";
const Dashboard = () => {
  return (
    <div className="w-full h-320 flex flex-col items-center    bg-gray-200  dark:bg-gray-900">
      <div className="w-full h-screen flex  flex-col lg:grid grid-cols-12 grid-rows-12 lg:gap-4 gap-2 lg:rounded-3xl p-2 lg:p-4">
        <div className="lg:col-span-8 col-span-12 row-span-2 lg:rounded-2xl rounded bg-gradient-to-r from-blue-600 to-violet-600 lg:order-1 flex items-center gap-2 justify-between shadow-lg p-2">
          <div className="flex-1 lg:rounded-2xl rounded flex py-2 items-center flex-col justify-center bg-orange-100 lg:border-b-4 border-b-2 border-orange-500 h-full w-full ">
            <p className="text-slate-700">
              <AnimatedCounter target={2345} />
            </p>
            <h3 className="text-xs lg:text-sm">Total Students</h3>
          </div>
          <div className="flex-1 lg:rounded-2xl rounded flex py-2 flex-col items-center justify-center bg-green-100 lg:border-b-4 border-b-2 border-green-500 h-full w-full ">
            <p className="text-slate-700">
              <AnimatedCounter target={34} />
            </p>
            <h3 className="text-xs lg:text-sm">Total Institutes</h3>
          </div>
          <div className="flex-1 lg:rounded-2xl rounded py-2 bg-purple-100 flex flex-col items-center justify-center lg:border-b-4 border-b-2 border-purple-500 h-full w-full ">
            <p className="text-slate-700">
              <AnimatedCounter target={4} />
            </p>
            <h3 className="text-xs lg:text-sm">Total Employes</h3>
          </div>
        </div>
        <div className="lg:col-span-8 col-span-12 lg:row-span-5 row-span-4 rounded-2xl lg:order-3 shadow-lg bg-white ">
          <PaymentBarChart />
        </div>
        <div className="lg:col-span-8 col-span-12 lg:row-span-5 row-span-4  rounded-2xl lg:order-5  shadow-lg bg-white ">
          <OrganisationPerformanceChart />
        </div>
        <div className="lg:col-span-4 col-span-12 lg:row-span-6 row-span-4 lg:order-2 rounded-2xl flex items-center justify-center shadow-lg bg-white">
          <Employes />
        </div>
        <div className="lg:col-span-4 col-span-12 lg:row-span-6 row-span-5 lg:order-4 rounded-2xl relativec  flex items-center justify-center shadow-lg bg-white">
          <Notifications/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

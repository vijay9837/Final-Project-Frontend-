import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

const OrganisationPerformanceChart = () => {
  const [view, setView] = useState("Day");
  const data = {
    Day: {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Daywise",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    Month: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "MonthWise",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    Year: {
      labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"],
      datasets: [
        {
          label: "Year Wise",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔑 THIS IS THE FIX
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Organisational Performance",
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
    Tooltip,
  };

  return (
    <div className="w-full h-full bg-white dark:bg-slate-800 dark:text-white lg:rounded-2xl rounded-lg pb-10 pt-5 lg:px-4 px-2 lg:max-h-71 max-h-60 ">
      {/* IMPORTANT: chart must be inside a sized div */}
      <div className="flex items-center justify-between">
        <h2 className="">Organisation Performance</h2>
        <select name="" id=""           className="border lg:rounded-lg rounded lg:p-2 p-1 lg:text-sm text-xs "
>
          <option value="Day">Day Wise</option>
          <option value="Month">Month Wise</option>
          <option value="Year">Year Wise</option>
        </select>
      </div>

      <div className="relative w-full h-full">
        <Line data={data["Month"]} options={options} />
      </div>
    </div>
  );
};

export default OrganisationPerformanceChart;

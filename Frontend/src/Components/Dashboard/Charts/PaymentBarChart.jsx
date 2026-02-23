import React, { useState } from "react";
import { Bar } from "react-chartjs-2";


const chartDataMap = {
  day: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Trial Plan",
        data: [50, 40, 30, 20, 10, 15, 25],
        backgroundColor: "#fde68a",
      },
      {
        label: "Pro Plan",
        data: [120, 100, 140, 130, 150, 160, 170],
        backgroundColor: "#86efac",
      },
      {
        label: "Pro+ Plan",
        data: [80, 70, 90, 85, 95, 100, 110],
        backgroundColor: "#c4b5fd",
      },
      {
        label: "Enterprise Plan",
        data: [200, 220, 210, 230, 240, 260, 280],
        backgroundColor: "#93c5fd",
      },
    ],
  },

  month: {
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
        label: "Trial Plan",
        data: [300, 280, 260, 240, 220, 210, 200, 190, 180, 170, 160, 150],
        backgroundColor: "#fde68a",
      },
      {
        label: "Pro Plan",
        data: [800, 820, 850, 870, 900, 950, 980, 1000, 1020, 1050, 1080, 1100],
        backgroundColor: "#86efac",
      },
      {
        label: "Pro+ Plan",
        data: [500, 520, 540, 560, 580, 600, 630, 650, 670, 700, 720, 750],
        backgroundColor: "#c4b5fd",
      },
      {
        label: "Enterprise Plan",
        data: [
          1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700,
          1750,
        ],
        backgroundColor: "#93c5fd",
      },
    ],
  },

  year: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Trial Plan",
        data: [2000, 1800, 1600, 1400, 1200],
        backgroundColor: "#fde68a",
      },
      {
        label: "Pro Plan",
        data: [8000, 9000, 10500, 12000, 14000],
        backgroundColor: "#86efac",
      },
      {
        label: "Pro+ Plan",
        data: [5000, 6000, 7000, 8500, 10000],
        backgroundColor: "#c4b5fd",
      },
      {
        label: "Enterprise Plan",
        data: [15000, 17000, 20000, 24000, 30000],
        backgroundColor: "#93c5fd",
      },
    ],
  },
};

const PaymentBarChart = () => {
  const [view, setView] = useState("day");

  return (
    <div className="w-full h-full bg-white dark:bg-slate-800 dark:text-white lg:rounded-2xl rounded-lg lg:p-10 lg:max-h-71 max-h-60 lg:h-auto py-7 lg:px-4 px-2 flex flex-col justify-center  gap-2">
      <div className="flex justify-between items-center ">
        <h2 className="lg:text-lg text-sm font-semibold">Plan Performance</h2>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="border rounded-lg lg:p-2 p-1 text-sm"
        >
          <option value="day">Day Wise</option>
          <option value="month">Month Wise</option>
          <option value="year">Year Wise</option>
        </select>
      </div>

      <Bar
        data={chartDataMap[view]}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top", },
            title: {
              display: true,
              text: "Payments by Subscription Plan",
            },
          },
        }}
      />
    </div>
  );
};

export default PaymentBarChart;

"use client";

import React, { useState, useEffect } from "react";
import { Bar, Line, Doughnut, Radar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Sample data for the line chart
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Requests Over Time",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const barData = {
    labels: ["New", "In Progress", "Completed"],
    datasets: [
      {
        label: "Requests Status",
        data: [5, 8, 12],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className={isDarkMode ? " bg-gray-900 text-white h-[100vh]" : " bg-gray-100 text-black h-[100vh]"}>
      <div className="flex justify-between p-4 items-center m-0 p-0 bg-blue-800 text-white shadow-lg">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center">
      
          <h1 className="text-3xl font-bold px-4">علی علی نژاد</h1>
          <h1 className="text-lg font-bold text-gray-400">خوش اومدی</h1>
        </div>
      </div>

      <button
  onClick={toggleTheme}
  className={`w-16 h-16 absolute bottom-14 right-10 ring-4 rounded-full transition-all duration-300 
    ${isDarkMode 
      ? "bg-white text-black shadow-2xl hover:bg-blue-500 hover:scale-110 hover:rotate-12" 
      : "bg-gray-900 text-white shadow-lg hover:bg-gray-700 hover:scale-110 hover:rotate-12"}`}
>
  <span className="text-xl">{isDarkMode ? "⋆｡˚☀️" : "‧₊˚ ☾. ⋅"}</span>
</button>



<div className={`p-4 grid grid-cols-4 grid-rows-4 gap-4 h-[90vh] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
  {/* Total Locations */}
  <div className={`col-span-2 row-span-2 col-start-3 row-start-3 p-4 rounded-lg shadow-lg flex flex-col justify-center items-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
    <h2 className="text-lg font-semibold">Total Locations</h2>
    <div className="flex w-full justify-center gap-20 pt-2 items-center">
      <p className="text-4xl font-bold text-red-600">16</p>
      <p className="text-4xl font-bold text-green-500">75</p>
      <p className="text-4xl font-bold">101</p>
    </div>
    <div className="flex w-full justify-center gap-20 pt-2 items-center">
      <p className="text-md font-bold text-gray-500">غیرفعال</p>
      <p className="text-md font-bold text-gray-500 pr-4">فعال</p>
      <p className="text-md font-bold text-gray-500">مجموع</p>
    </div>
  </div>

  {/* Requests Over Time (Line Chart) */}
  <div className={`row-span-2 col-start-3 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
    <h2 className="text-lg font-semibold">Requests Over Time (Line Chart)</h2>
    <Line data={lineData} />
  </div>

  {/* Requests Status (Bar Chart) */}
  <div className={`row-span-2 col-start-4 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
    <h2 className="text-lg font-semibold">Requests Status (Bar Chart)</h2>
    <Bar data={barData} />
  </div>

  {/* Pending Requests Table */}
  <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg row-start-1 row-span-4 col-span-2`}>
    <h2 className="text-lg font-semibold">Pending Requests</h2>
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full">
        <thead>
          <tr className={`${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.filter((req) => req.status === "pending").map((request) => (
            <tr key={request.id} className={`${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <td className="py-2 px-4">{request.id}</td>
              <td className="py-2 px-4">{request.name}</td>
              <td className="py-2 px-4">{request.type}</td>
              <td className="py-2 px-4">{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

      </div> 
  );
};

export default Dashboard;

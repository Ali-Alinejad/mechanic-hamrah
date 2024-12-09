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
  const [locationsCount, setLocationsCount] = useState({
    total: 0,
    mechanic: 0,
    aparati: 0,
    yadakkesh: 0,

  });
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

  // Sample data for the bar chart
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

  // Sample data for the doughnut chart
  const doughnutData = {
    labels: ["Total", "Mechanic", "Repair"],
    datasets: [
      {
        label: "Locations Count",
        data: [100, 50, 30],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Sample data for the radar chart
  const radarData = {
    labels: ["Speed", "Reliability", "Cost", "Efficiency"],
    datasets: [
      {
        label: "Service Metrics",
        data: [2, 3, 2, 5],
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(179,181,198,1)",
      },
    ],
  };

  // Static values for locations count
  useEffect(() => {
    setLocationsCount({
      total: 100,
      mechanic: 50,
      repair: 30,
    });
  }, []);

  return (
    <div className={isDarkMode ? "h-[80vh] bg-gray-900 text-white overflow-hidden" : "h-[100vh] bg-gray-100 text-black overflow-hidden"}>
      <div className="flex justify-between p-6 items-center bg-blue-800 text-white shadow-lg">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-4"
          >
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
          <h1 className="text-3xl font-bold px-4">علی علی نژاد</h1>
          <h1 className="text-lg font-bold text-gray-400">خوش اومدی</h1>
        </div>
      </div>

      <div className="p-6 flex flex-cols-1 md:flex-cols-2 xl:flex-cols-3 gap-4 w-full justify-around items-center">
        {/* Total Locations */}
        <div className={isDarkMode ? "bg-gray-800 p-4 rounded-lg shadow-lg h-40 w-full justify-center items-center flex flex-col " : 'bg-gray-100 p-4 rounded-lg shadow-lg h-40 w-full justify-center items-center flex flex-col'}>
          <h2 className="text-lg font-semibold">Total Locations</h2>
          <div className="flex w-full justify-center gap-20 pt-2 items-center">
          <p className="text-4xl font-bold text-red-600">16</p>
          <p className="text-4xl font-bold text-green-500">75</p>
          <p className="text-4xl font-bold">101</p>
          </div>
          <div className="flex w-full justify-center gap-20 pt-2  items-center">
          <p className="text-md font-bold text-gray-500">غیرفعال</p>
          <p className="text-md font-bold text-gray-500 pr-4">فعال</p>
          <p className="text-md font-bold text-gray-500">مجموع</p>
          </div>
        </div>
        

        {/* Mechanic Locations */}
        <div className={isDarkMode ? "bg-gray-800 p-4 rounded-lg shadow-lg h-40 w-full justify-center items-center flex flex-col" : 'bg-gray-100 p-4 rounded-lg shadow-lg h-40 w-full justify-center items-center flex flex-col'}>
          <h2 className="text-lg font-semibold">Mechanic Locations</h2>
          <p className="text-4xl font-bold">{locationsCount.mechanic}</p>
        </div>

        {/* Repair Locations */}
        <div className={isDarkMode ? "bg-gray-800 p-4 rounded-lg shadow-lg h-40 w-full justify-center items-center flex flex-col" : 'bg-gray-100 p-4 rounded-lg shadow-lg h-40 w-full justify-center items-center flex flex-col'}>
          <h2 className="text-lg font-semibold">Repair Locations</h2>
          <p className="text-4xl font-bold">{locationsCount.repair}</p>
        </div>

      </div>

      <div className="p-6 gap-4 h-[30vh]">
        <div className={isDarkMode ? "bg-gray-800 p-4 rounded-lg shadow-lg grid grid-cols-3 xl:grid-cols-3" : 'bg-gray-100 p-4 rounded-lg shadow-lg grid grid-cols-3 xl:grid-cols-3'}>
          <h2 className="text-lg font-semibold">Requests Over Time (Line Chart)</h2>
          <Line data={lineData} />
          <h2 className="text-lg font-semibold">Requests Status (Bar Chart)</h2>
          <Bar data={barData} />
          <div className={isDarkMode ? "bg-gray-800 p-4 rounded-lg shadow-lg" : 'bg-gray-100 p-4 rounded-lg shadow-lg'}>
            <h2 className="text-lg font-semibold">Service Metrics (Radar Chart)</h2>
            <Radar data={radarData} />
          </div>
        </div>
      </div>

      <div className={isDarkMode ? "bg-gray-800 p-6 rounded-lg shadow-lg h-[40vh]" : "bg-gray-100 p-6 rounded-lg shadow-lg h-[40vh]"}>
        <h2 className="text-lg font-semibold">Pending Requests</h2>
        <div className="overflow-y-auto mt-4 h-[70%]">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Static table data */}
              {[{ id: 1, name: "Request 1", type: "Repair", status: "pending" }].map((request) => (
                <tr key={request.id} className="border-b border-gray-700">
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
  );
};

export default Dashboard;

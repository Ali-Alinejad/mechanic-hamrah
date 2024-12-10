"use client";

import React, { useState, useEffect } from "react";
import { Bar, Line,   } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from "chart.js";
import {  Spinner } from "@nextui-org/react";
import { supabase } from "../SupaBase/supabaseClient";
import TimeShow from './time/timeShow'
import ModalCheck from "./modalCheck/ModalCheck"




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

    const [isDarkMode, setIsDarkMode] = useState(true);
    const [ListPending, setListPending] = useState([]); 
    const [Load, setLoad] = useState(true); 

        const fetchLocations = async () => {
            try {
              const { data: Type, error } = await supabase.from('Type').select('*');
              setLoad(false);

              if (error) throw error;
              setListPending(Type || []);



            } catch (error) {
              console.error("Error fetching locations:", error.message);
            }
          };       
        
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
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

  useEffect(() => {
    fetchLocations();
  }, []);




  return (
    
    <div className={isDarkMode ? " bg-gray-900 text-white h-[100vh]" : " bg-gray-100 text-black h-[100vh]"}>
      <div className="flex justify-between p-4 items-center m-0  bg-blue-800 text-white shadow-lg">
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
  className={`w-12 h-12 absolute bottom-20 right-20 ring-2 ring-gray-400 rounded-full transition-all duration-300 
    ${isDarkMode 
      ? "bg-white text-black shadow-inner hover:bg-yellow-100 hover:scale-110 hover:rotate-12" 
      : "bg-gray-900 text-white shadow-inner hover:bg-gray-700 hover:scale-110 hover:rotate-12"}`}
>
  <span className="transition-all duration-300">{isDarkMode ? "⋆｡˚☀️" : "‧₊˚ ☾. ⋅"}</span>
</button>



<div className={`p-4 grid grid-cols-4 grid-rows-4 gap-4 h-[90vh] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
 
  <div className={`col-span-2 row-span-2 col-start-3 row-start-3 p-4 rounded-lg  flex flex-col justify-center items-center ${isDarkMode ? 'bg-transparent text-white' : 'bg-transparent text-black'}`}>

<div className="grid grid-cols-2 grid-rows-2 gap-8 justify-items-stretch place-items-stretch">
    <div className={`" shadow-lg w-[440px]   p-4 rounded-lg text-center  " ${isDarkMode ? 'bg-gray-800 text-white' : ' text-black bg-white'} `}>
    <h2 className="text-lg font-semibold ">مجموع</h2>
    <div className="flex w-full justify-center gap-20 pt-2 items-center">
      <p className="text-4xl font-bold text-red-600">16</p>
      <p className="text-4xl font-bold text-green-500">75</p>
      <p className="text-4xl font-bold">91</p>
    </div>
    <div className="flex w-full justify-center gap-20 pt-2 items-center">
      <p className="text-sm font-bold text-gray-500  ">غیرفعال</p>
      <p className="text-sm font-bold text-gray-500  pr-4">فعال</p>
      <p className="text-sm font-bold text-gray-500 ">مجموع</p>
      </div>
    </div>
      <div className={`shadow-lg w-[440px]   p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : ' text-black bg-white'}`}>2</div>
    <div className={`shadow-lg w-[440px]   p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : ' text-black bg-white'}`}>3</div>
    <div className={`shadow-lg w-[440px]  p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : ' text-black bg-white'}`}>
        <TimeShow />
        </div>
  </div>
</div>


  <div className={`row-span-2 col-start-3 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
    <h2 className="text-lg font-semibold">Requests Over Time (Line Chart)</h2>
    <Line data={lineData} />
  </div>

 
  <div className={`row-span-2 col-start-4 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
    <h2 className="text-lg font-semibold">Requests Status (Bar Chart)</h2>
    <Bar data={barData} />
  </div>


  <div className={`text-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg row-start-1 row-span-4 col-span-2`}>
    <h2 className="text-xl py-2 text-gray-500  w-full font-semibold">جدول وضعیت</h2>
    {Load && <Spinner  color="primary" className="scale-150 z-10"/>}

    <div className="overflow-x-auto mt-4">
      <table className="min-w-full">
        <thead>
          <tr className={`${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <th className="py-2 px-4">حالت</th>
            <th className="py-2 px-4">وضعیت</th>
            <th className="py-2 px-4">نوع</th>
            <th className="py-2 px-4">آدرس</th>
            <th className="py-2 px-4">نام</th>
            <th className="py-2 px-4">کد</th>

          </tr>
        </thead>
        <tbody>
            {ListPending.map((list =>
            {
        
                    return <tr key={list.id} className={`text-center items-center border-y-1  ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>

                        <td className="py-2 px-4"><ModalCheck list={list} onClick={fetchLocations()}/> </td>

                        <td className="py-2 px-4 ">
                        <label 
                        className={` bg-transparent p-2 rounded-full ${list.pending ? 'text-amber-500  ring-2 ring-amber-500' : ''
                            ||  !list.check ? 'text-red-500 ring-2  ring-red-500' : '' 
                            || list.check   ? 'text-green-500 ring-2  ring-green-500' : ''  }`}>
                            {list.pending   ? 'جدید' : '' 
                            || list.check   ? 'تایید':'' 
                            || !list.check  ? 'مردود':''}
                            </label>
                            </td>
                        <td className="py-2 px-4">{list.type}</td>
                        <td className="py-2 px-4">{list.address} </td>
                        <td className="py-2 px-4">{list.name} </td>
                        <td className="py-2 px-4 ">{list.id}</td>

                    </tr>;
                }
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

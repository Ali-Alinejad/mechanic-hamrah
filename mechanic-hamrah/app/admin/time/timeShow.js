import React from "react";
import jalaali from "jalaali-js";

function TimeShow() {
  const date = new Date();
  const jDate = jalaali.toJalaali(date);


  const today = new Intl.DateTimeFormat("fa-IR", { weekday: "long" }).format(date);
  const day = jDate.jd;
  const month = new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(date);
  const year = jDate.jy;

  const endOfYear = jalaali.toGregorian(year, 12, 29);

  const endOfYearDate = new Date(endOfYear.gy, endOfYear.gm - 1, endOfYear.gd);


  const timeToEndOfYear = Math.ceil(
    (endOfYearDate - date) / (1000 * 60 * 60 * 24)
  );

  
  const specialMessage =
    timeToEndOfYear > 0
      ? `${timeToEndOfYear}`
      : "سال نو مبارک!";

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 h-40 gap-4 p-4 rounded-lg">
        
        <div className="col-span-2 text-xl font-bold text-blue-400 flex flex-row items-start">
          
          <span className="text-8xl font-extrabold ml-2">{day}</span>
         
          <span className="text-sm text-gray-400 p-2">{month}</span>
        </div>

     
        <div className="col-start-3 text-4xl font-semibold  text-center">{today}</div>

   
        <div className="col-span-2 col-start-1 p-8 row-start-2 text-sm text-gray-500">{year}</div>

     
        <div className="col-span-2 col-start-1 mt-2  text-sm font-semibold text-gray-500/80">
        <div className="flex flex-row">
        <span> روز تا پایان سال باقی مانده   </span> 
        <span>   {specialMessage} </span>
        </div>
        </div>
      </div>
    </>
  );
}

export default TimeShow;

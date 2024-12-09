import React from "react";
import jalaali from "jalaali-js";

function TimeShow() {
  const date = new Date();
  const jDate = jalaali.toJalaali(date);

  // استخراج اطلاعات تاریخ
  const today = new Intl.DateTimeFormat("fa-IR", { weekday: "long" }).format(date);
  const day = jDate.jd;
  const month = new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(date);
  const year = jDate.jy;

  // تاریخ پایان سال (۲۹ اسفند)
  const endOfYear = jalaali.toGregorian(year, 12, 29);

  const endOfYearDate = new Date(endOfYear.gy, endOfYear.gm - 1, endOfYear.gd);

  // محاسبه تعداد روزهای باقی‌مانده
  const timeToEndOfYear = Math.ceil(
    (endOfYearDate - date) / (1000 * 60 * 60 * 24)
  );

  // پیام برای پایان سال
  const specialMessage =
    timeToEndOfYear > 0
      ? `${timeToEndOfYear}`
      : "سال نو مبارک!";

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 h-40 gap-4 p-4 rounded-lg">
        {/* بخش نمایش تاریخ اصلی */}
        <div className="col-span-2 text-xl font-bold text-blue-400 flex flex-row items-start">
          {/* روز */}
          <span className="text-8xl font-extrabold ml-2">{day}</span>
          {/* ماه */}
          <span className="text-sm text-gray-400 p-2">{month}</span>
        </div>

        {/* روز هفته */}
        <div className="col-start-3 text-4xl font-semibold m-4 text-start">{today}</div>

        {/* سال */}
        <div className="col-span-2 col-start-1 p-8 row-start-2 text-sm text-gray-500">{year}</div>

        {/* پیام دلخواه */}
        <div className="col-span-2 col-start-1 mt-2  text-sm font-semibold text-gray-500/80">
        <div className="flex flex-row">
        <span> روز تا پایان سال باقی مانده اس  </span> 
        <span>   {specialMessage} </span>
        </div>
        </div>
      </div>
    </>
  );
}

export default TimeShow;

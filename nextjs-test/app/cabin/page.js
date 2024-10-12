"use client";

import Link from "next/link";
import LocationFinder from "./Api";
import Filter from "./filter";
import { useState } from "react";

function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="top-0 z-50 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="lg:px-5 lg:pl-3">
          <div className="flex w-[80%] max-sm:items-end max-sm:w-full text-white items-center justify-center bg-blue-700 p-3">
            <div className="flex items-center justify-start rtl:justify-end ">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                مکانیک همراه
              </span>
            </div>
          </div>

          <button
            onClick={toggleSidebar}
            className="sm:hidden p-1 text-gray-700 scale-125 ml-4  transition duration-500 "
          >
           {!isOpen ? "☰" :"X"} 
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-40 h-screen max-sm:w-96 transition duration-800 bg-white border-l border-gray-200 transition-transform ${
          isOpen ? "-translate-x-0" : "translate-x-full"
        } sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 w-[19%]`}
        aria-label="Sidebar"
      >
        <ul className="space-y-4 font-medium p-4">
          {[
            { name: " داشبورد", icon: "dashboard-icon-path" },
            { name: "برنامه", icon: "program-icon-path", newLabel: true },
            { name: "پیام ها", icon: "messages-icon-path" },
            { name: "بایگانی", icon: "archive-icon-path" },
          ].map((item) => (
            <li key={item.name} className="border-b p-2">
              <Link
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700 group transition duration-200"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d={item.icon} />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {item.name}
                </span>
                {item.newLabel && (
                  <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-blue-300 rounded-full dark:bg-gray-700 dark:text-gray-300 animate-pulse">
                    جدید
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-4">
          <Filter />
        </div>
      </aside>
      <div className={`flex flex-row ${isOpen ? "opacity-50" : ""}`}>
        <div className={`w-[80%] max-sm:w-[96%]`}>
          <LocationFinder />
        </div>
      </div>
    </div>
  );
}

export default Page;

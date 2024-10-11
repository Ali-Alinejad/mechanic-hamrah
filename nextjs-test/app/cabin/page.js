import Link from "next/link";
import LocationFinder from "./Api";
import Filter from "./filter";


function Page() {
  return (
    <div>
      <nav className="top-0 z-50 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="lg:px-5 lg:pl-3">
          <div className="flex w-[80%] max-sm:hidden text-white items-center justify-center bg-blue-700 p-3">
            <div className="flex items-center justify-start rtl:justify-end ">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                مکانیک همراه
              </span>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-row">
        <aside
          id="logo-sidebar"
          className="fixed top-0 right-0 z-40 h-screen pt-20 transition-transform -translate-x-full bg-white border-l border-gray-200 sm:translate-x-0 max-sm:hidden dark:bg-gray-800 dark:border-gray-700 w-[19%]"
          aria-label="Sidebar"
        >
          <ul className="space-y-4 font-medium p-4">
            {[
              { name: " داشبورد"  , icon: "dashboard-icon-path" }, 
              { name: "برنامه", icon: "program-icon-path", newLabel: true },
              { name: "پیام ها", icon: "messages-icon-path" },
              { name: "بایگانی", icon: "archive-icon-path" },
            ].map((item) => (
              <li key={item.name} className="border-b-1 p-2">
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
          <div className="p-5">
            <Filter />
          </div>
        </aside>
        <div className="w-[80%] max-sm:w-[96%] ">
        
          <LocationFinder />
        </div>
      </div>
    </div>
  );
}

export default Page;

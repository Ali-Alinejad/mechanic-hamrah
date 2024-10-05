'use-client'


import Link from "next/link";

function Navigation() {
  return (
    <nav className="bg-blue-600 fixed w-full top-0 left-0 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
         <Link href="/"
             className="text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-300">
        <h1 className="text-white text-2xl font-bold">سوپراپلیکیشن</h1>
          </Link>
        <div className="flex space-x-4">
         
         
            
          <Link href="/car"
             className="text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-300">
              درخواست خودرو
          
          </Link>
          <Link href="/food"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-300">
              سفارش غذا
      
          </Link>
          <Link href="/shopping"
             className="text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-300">
              خدمات
     
          </Link>
          <Link href="/account"
             className="bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded transition duration-300">
              ثبت‌نام
           
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

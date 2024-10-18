"use client";

import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin } from "../reducers/Authslice";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginToggle = () => {
    dispatch(toggleLogin());
  };

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md">
      <div className="flex justify-between items-center p-4">
        <Link href="/">
          <div className="text-xl font-bold">لوگو شرکتی</div>
        </Link>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      <ul
        className={`flex-col md:flex md:flex-row md:items-center md:justify-around ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <li className="p-4 hover:text-blue-500 transition duration-300">
          <Link href="/">خانه</Link>
        </li>
        <li className="p-4 hover:text-blue-500 transition duration-300">
          <Link href="/cabin">داشبورد</Link>
        </li>
        <li className="p-4 hover:text-blue-500 transition duration-300">
          <Link href="/blog">بلاگ</Link>
        </li>
        <li className="p-4 hover:text-blue-500 transition duration-300">
          {isLoggedIn ? (
            <Button
              onClick={handleLoginToggle}
              className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2"
            >
              خروج
            </Button>
          ) : (
            <Link href="/account">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2">
                ورود
              </Button>
            </Link>
          )}
        </li>
      </ul>

      <style jsx>{`
        nav {
          transition: all 0.3s ease;
        }
        ul {
          transition: all 0.3s ease;
        }
      `}</style>
    </nav>
  );
}

export default Navigation;

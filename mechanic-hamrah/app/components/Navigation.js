"use client";

import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import Background from "./background";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="relative bg-white text-gray-800 shadow-md h-[14vh] w-full z-50">
        <div className="flex justify-between items-center px-6 pt-10">
          {/* Logo */}
          <Link href="/">
            <div className="text-xl font-bold cursor-pointer transition-transform hover:scale-105">
              Company Logo
      <Background />
            </div>
          </Link>

          {/* Mobile Menu Icon */}
          <div className="md:hidden" onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes size={24} className="cursor-pointer" />
            ) : (
              <FaBars size={24} className="cursor-pointer" />
            )}
          </div>

          {/* Desktop Menu */}
          <ul
            className={`top-16 left-0 w-full md:w-auto bg-white md:flex items-center justify-center md:space-x-8 md:space-y-0 space-y-6 text-center transition-all duration-300 ease-in-out ${
              isOpen ? "translate-y-0" : "-translate-y-full"
            } md:translate-y-0`}
          >
            <li className="p-2 hover:text-blue-500 transition duration-300">
              <Link href="/">Home</Link>
            </li>
            <li className="p-2 hover:text-blue-500 transition duration-300">
              <Link href="/cabin">Dashboard</Link>
            </li>
            <li className="p-2 hover:text-blue-500 transition duration-300">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="p-2 flex gap-4 justify-center">
              <Link href="/account">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2">
                  User Login
                </Button>
              </Link>
              <Link href="/account">
                <Button className="bg-gray-800 hover:bg-gray-900 text-white rounded-md px-4 py-2">
                  Admin Login
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navigation;

'use-client'


import Link from "next/link";

function Navigation() {
  return (
    <>
      <li className="flex justify-around p-10 shadow-md">
        <ul className="p-4">لوگو شرکتی</ul>

        <Link href="/">
          <ul className="p-4">خانه</ul>
        </Link>
        <Link href="/cabin">
          <ul className="p-4">داشبورد</ul>
        </Link>
        <Link href="/blog">
          <ul className="p-4">بلاگ</ul>
        </Link>
        <Link href="/account">
          <ul className="border-2 rounded-md bg-cyan-700 text-white p-4 w-40 text-center hover:scale-105 transition duration-200  hover:ring-2">
            ورود
          </ul>
        </Link>
      </li>
    </>
  );
}

export default Navigation;

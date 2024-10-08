import { Button } from "@nextui-org/react";
import Link from "next/link";

function Navigation() {
  return (
    <ul className="flex justify-around p-10 shadow-md">
      <li className="p-4">لوگو شرکتی</li>

      <Link href="/">
        <li className="p-4">خانه</li>
      </Link>
      <Link href="/cabin">
        <li className="p-4">داشبورد</li>
      </Link>
      <Link href="/blog">
        <li className="p-4">بلاگ</li>
      </Link>
      <Link href="/account">
        <li>
          <Button className="p-8 w-32" color="primary" >
            ورود
          </Button>
       
        </li>
      </Link>
    </ul>
  );
}

export default Navigation;

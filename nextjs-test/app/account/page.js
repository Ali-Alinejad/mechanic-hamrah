"use client"; 

import { Button, Spacer, Link, Input } from "@nextui-org/react";
import { useState } from "react";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = () => {
    console.log("نام کاربری:", username);
    console.log("رمز عبور:", password);
    console.log("شماره تلفن:", phone);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-blend-multiply bg-sky-900"
      style={{
        backgroundImage:
          "url('https://di-uploads-pod40.dealerinspire.com/nissanofjeffersoncity/uploads/2023/04/Untitled-design.jpg')",
      }}
    >
      <div className="max-w-xl w-full bg-white bg-opacity-20 border-2 rounded-lg shadow-lg p-10">
        <h3 className="text-center text-2xl font-semibold mb-4 text-white">
          ورود به حساب
        </h3>

        <Input
          className="w-full p-2  border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="username"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          className="w-full p-2  border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          id="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          className="w-full p-2  border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="phone"
          placeholder="شماره تلفن"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button
          className="w-full bg-blue-500 text-white rounded-xl py-2 hover:bg-blue-600 transition duration-200"
          onClick={handleLogin}
        >
          ورود
        </Button>

        <Spacer y={10} />
        <div className="flex flex-row justify-around ">
          <Link
            href="#"
            className="text-blue-200 hover:text-yellow-100 transition duration-200"
          >
            رمز عبور خود را فراموش کرده‌اید؟
          </Link>

          <Spacer y={0.5} />

          <Link
            href="#"
            className="text-blue-200 hover:text-yellow-100 transition duration-200"
          >
            حساب کاربری ندارید؟
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;

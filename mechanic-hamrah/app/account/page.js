"use client";

import { Button, Spacer, Link, Input, Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import { supabase } from "../SupaBase/supabaseClient";
import { useRouter } from "next/navigation";


function Login() {
  const router = useRouter(); // تعریف router
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);



  const handleLogin = async (e) => {
    
    e.preventDefault();

    const dataToInsert = {
      name: name,
      phone: phone,
      email: email,
      active: true,
      admin:false,
      username: username,
      password: password
    };
    console.log(dataToInsert)

    const { data, error } = await supabase
      .from("Users")
      .insert([dataToInsert]);

    if (error) {
      console.error("Error inserting data:", error.message);
      alert("خطا در ارسال اطلاعات. لطفاً دوباره تلاش کنید.");
    } else {
      alert("اطلاعات ارسال شد", data);
      setName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setUsername('');
    }
};
const handleSignin = async (e) => {
  e.preventDefault();

  const { data , error } = await supabase
    .from("Users")
    .select("*")
    .eq("username", username)
    .eq("password", password);
    console.log(data)
  if (error) {
    console.error("Error fetching data:", error.message);
    alert("خطا در بررسی اطلاعات. لطفاً دوباره تلاش کنید.");
  } else if (data.length === 0) {
    alert("نام کاربری یا رمز عبور اشتباه است.");
    
  } else {
    alert("ورود موفقیت آمیز");
    console.log(`${data[0].name} ${" "}خوش اومدی `)
    router.push("/cabin");
    
  }
};



  const handleSignUpToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div
    className="flex justify-center items-center h-screen bg-cover bg-center bg-blend-multiply bg-sky-900"
    style={{
      backgroundImage:
        "url('https://di-uploads-pod40.dealerinspire.com/nissanofjeffersoncity/uploads/2023/04/Untitled-design.jpg')",
    }}
  >
      <div className="max-w-xl w-full text-center bg-gray-500/50 bg-opacity-90 border rounded-lg shadow-lg p-10">
        <h3 className="text-center text-3xl font-bold mb-6 text-white">
          {isSignUp ? "ایجاد حساب کاربری" : "ورود به سیستم"}
        </h3>

   <label className="text-white">نام کاربری</label>
        <Input
          className="w-full text-center p-3 border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="username"
          color="primary"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
   <label className="text-white">رمز عبور</label>

        <Input
          className="w-full text-center p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          color="primary"
          id="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isSignUp && (
          <>
           <Input
              className="w-full text-center p-3 border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              color="primary"
              placeholder="نام نام خانوادگی"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className="w-full text-center p-3 border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              color="primary"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Input
              className="w-full text-center p-3 border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="phone"
              color="primary"
              placeholder="شماره تلفن"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        )}

       { isSignUp &&
        <Button
          className="w-[96%]   bg-blue-900 text-white rounded-xl py-2 hover:bg-gray-900 transition duration-200 mb-4"
          onClick={handleLogin}
        >
  ایجاد حساب
        </Button>
      } 
 { !isSignUp &&
        <Button
          className="w-[96%]   bg-blue-900 text-white rounded-xl py-2 hover:bg-gray-900 transition duration-200 mb-4"
          onClick={handleSignin}
        >
 ورود
        </Button>
      } 

        <div className="flex justify-center">
          <Link
            onClick={handleSignUpToggle}
            className=" text-gray-300 hover:text-gray-500 cursor-pointer transition duration-200"
          >
            {isSignUp ? "قبلاً ثبت‌نام کرده‌اید؟ ورود" : "ثبت‌نام کنید"}
          </Link>
        </div>

        <Spacer y={10} />

        <div className="flex flex-row justify-around mt-4">
          {!isSignUp && (
            <Link
              href="#"
              className="text-gray-300 hover:text-gray-500 transition duration-200"
            >
              رمز عبور خود را فراموش کرده‌اید؟
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

"use client";

import { Button, Spacer, Link, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const [authMethod, setAuthMethod] = useState("email");

  const getPasswordBorderColor = () => {
    if (password.length > 0 && password.length < 8) {
      return "ring-yellow-600 ring-1";
    } else if (password.length >= 8) {
      return "ring-green-500 ring-1";
    }
    return "ring-0";
  };

  const handleLogin = () => {
    if (isEnabled) {
      setShowCodeInput(true);
    }
  };

  useEffect(() => {
    let validEmail = email.endsWith(".com");
    let validPhone = phone.length === 10 && /^\d+$/.test(phone);

    if (authMethod === "email") {
      if (username && password && validEmail) {
        setIsEnabled(true);
        setEmailError(false);
      } else {
        setIsEnabled(false);
        if (!validEmail) {
          setEmailError(true);
        }
      }
    } else if (authMethod === "phone") {
      if (validPhone) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    }
  }, [username, password, phone, email, authMethod]);

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

        <div className="flex justify-between mb-4 ">
          <Button
            className={`w-full ${
              authMethod === "email" ? "bg-blue-500" : "bg-gray-500"
            } text-white rounded-xl `}
            onClick={() => setAuthMethod("email")}
          >
            با جیمیل وارد شوید
          </Button>
          <Button
            className={`w-full ${
              authMethod === "phone" ? "bg-blue-500" : "bg-gray-500"
            } text-white rounded-xl`}
            onClick={() => setAuthMethod("phone")}
          >
            با موبایل وارد شوید
          </Button>
        </div>

        {!showCodeInput ? (
          <>
            {authMethod === "email" ? (
              <>
                <Input
                  className={`w-full p-2 border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  id="username"
                  placeholder="نام کاربری"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                  className={`w-full p-2 rounded mb-4 focus:outline-none focus:ring-2 ${getPasswordBorderColor()} focus:ring-blue-500`}
                  type="password"
                  id="password"
                  placeholder="رمز عبور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                  className={`w-full p-2 border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 ${
                    emailError ? "border-red-500" : "focus:ring-blue-500"
                  }`}
                  id="email"
                  placeholder="ایمیل"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500 text-sm">
                    لطفاً یک ایمیل معتبر وارد کنید.
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center mb-4">
                  <span className="mr-2 text-gray-600">+98</span>
                  <Input
                    className="flex-grow p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="phone"
                    placeholder="شماره تلفن"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </>
            )}

            <Button
              className="w-full bg-blue-500 text-white rounded-xl py-2 hover:bg-blue-600 transition duration-200"
              isDisabled={!isEnabled}
              onClick={handleLogin}
            >
              ورود
            </Button>
          </>
        ) : (
          <>
            <h4 className="text-center text-lg font-semibold mb-4 text-white">
              لطفاً کد 5 رقمی را وارد کنید
            </h4>
            <Input
              className={`w-full p-2 border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 ${
                code.length === 5 ? "border-green-500" : "border-red-500"
              }`}
              id="code"
              placeholder="کد 5 رقمی"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Link href="/cabin" className="w-full">
              <Button
                className="w-full bg-blue-500 text-white rounded-xl py-2 hover:bg-blue-600 "
                isDisabled={code.length !== 5}
              >
                ادامه
              </Button>
            </Link>
            <Button
              className="w-full mt-4 bg-gray-500 text-white rounded-xl py-2 hover:bg-gray-600 transition duration=200"
              onClick={() => setShowCodeInput(false)}
            >
              برگشت
            </Button>
          </>
        )}

        <Spacer y={10} />
        <div className="flex flex-row justify-around ">
          <Link
            href="#"
            className="text-blue-200 hover:text-yellow-100 transition duration=200"
          >
            رمز عبور خود را فراموش کرده‌اید؟
          </Link>

          <Spacer y={0.5} />

          <Link
            href="#"
            className="text-blue-200 hover:text-yellow-100 transition duration=200"
          >
            حساب کاربری ندارید؟
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

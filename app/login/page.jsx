"use client";
import { Moon } from "lucide-react";
import LoginImg from "@/app/assets/login.png";
import Image from "next/image";
import LoginForm from "@/components/Login";
import Protected from "@/components/AuthLayout";

export default function LoginPage() {
  return (
    <Protected authentication={false}>
    <div className="flex flex-col min-h-screen lg:flex-row min-w-full">
      {/* Left Image Section */}
      <div className="relative w-full lg:w-[65%] h-[250px] lg:h-auto overflow-hidden">
        <Image
          src={LoginImg}
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay for fade effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:to-transparent"></div>

        {/* Logo Section */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2 text-xl font-semibold text-white">
          <div className="flex items-center">
            <Moon className="text-blue-300 mr-2" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              NightTask
            </span>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className=" w-full lg:w-[35%]">
        <LoginForm />
      </div>
    </div>
    </Protected>
  );
}

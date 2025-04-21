"use client";

import { userLogin, userSignUp } from "@/app/connecting";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }
    
    if (!isLogin && !formData.username) {
      setError("Username is required for signup");
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password length check
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if(isLogin){
      await userLogin({Email : formData.email , Password : formData.password})
      .then((response) => {
        localStorage.setItem("token" , response?.token);
        setSuccess("Login successful!")
        router.push("/todo")
      })
      .catch((err) => {setError(err.error)})
    }else{
      await userSignUp({Username : formData.username , Email : formData.email , Password : formData.password})
      .then((response) => {
        setSuccess(response.message);
        setTimeout(() =>{
          setSuccess("please login")
          setIsLogin(true)
        } , 2000)
      })
      .catch((err) =>{setError(err.error)}
      )
    }

    
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#160430]">
      <div className="w-full max-w-md relative">
        {/* Stars decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute h-2 w-2 rounded-full bg-white top-10 left-10 opacity-70"></div>
          <div className="absolute h-1 w-1 rounded-full bg-white top-20 left-40 opacity-50"></div>
          <div className="absolute h-2 w-2 rounded-full bg-white top-40 right-20 opacity-70"></div>
          <div className="absolute h-1 w-1 rounded-full bg-white bottom-20 left-20 opacity-50"></div>
          <div className="absolute h-2 w-2 rounded-full bg-white bottom-40 right-10 opacity-70"></div>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="w-full mx-auto p-8 rounded-xl shadow-lg space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-violet-300">
              {isLogin 
                ? "Enter your details to access your account" 
                : "Join us by creating a new account"}
            </p>
          </div>

          <div className="space-y-5">
            {/* Username Field - Only for Signup */}
            {!isLogin && (
              <div className="space-y-1">
                <label htmlFor="username" className="block text-sm font-medium text-violet-200">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="cosmic_traveler"
                  className="w-full px-4 py-3 bg-gray-800 border border-purple-600 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-violet-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-purple-600 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-violet-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-purple-600 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              {isLogin && (
                <div className="text-right mt-1">
                  <a href="#" className="text-sm text-violet-400 hover:text-violet-300">
                    Forgot your password?
                  </a>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="py-2 px-3 bg-red-900 bg-opacity-50 border border-red-500 rounded-md text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="py-2 px-3 bg-green-900 bg-opacity-50 border border-green-500 rounded-md text-green-200 text-sm">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold py-3 rounded-md hover:from-violet-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 focus:outline-none"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>

            {/* Toggle between Login/Signup */}
            <div className="text-center mt-4">
              <button 
                type="button"
                onClick={toggleForm}
                className="text-violet-400 hover:text-violet-300 text-sm"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
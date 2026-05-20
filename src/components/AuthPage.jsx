import React, { useState } from "react";
import LoginSection from "./LoginSection";
import RegisterSection from "./RegisterSection";
import CheckOrderStatus from "./CheckOrderStatus";

export default function AuthPage({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'register'

  return (
    <div className="relative min-h-screen pt-[112px] bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 h-[60vh] lg:h-[80vh]">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1920&q=80"
          alt="Desert Night Sky"
          className="w-full h-full object-cover"
        />
        {/* Fading bottom edge into black background */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      </div>

      <div className="relative z-20 max-w-[1200px] mx-auto px-4 md:px-8 pt-12 pb-24">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-0">
          
          {/* Left Column: Auth Tabs & Forms */}
          <div className="w-full lg:w-[600px] bg-white shadow-2xl z-30 lg:translate-x-12 relative lg:mr-[-48px]">
            {/* Tabs */}
            <div className="flex justify-center border-b border-neutral-200 px-8 pt-8">
              <button
                onClick={() => setActiveTab("login")}
                className={`px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors relative ${
                  activeTab === "login" ? "text-black" : "text-neutral-400 hover:text-black"
                }`}
              >
                Login
                {activeTab === "login" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors relative ${
                  activeTab === "register" ? "text-black" : "text-neutral-400 hover:text-black"
                }`}
              >
                Create Account
                {activeTab === "register" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
                )}
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8 md:p-12">
              {activeTab === "login" ? <LoginSection onLoginSuccess={onLoginSuccess} /> : <RegisterSection />}
            </div>
          </div>

          {/* Right Column: Check Order Status */}
          <div className="w-full lg:w-[450px] lg:mt-24 z-20">
            <CheckOrderStatus />
          </div>

        </div>
      </div>
    </div>
  );
}

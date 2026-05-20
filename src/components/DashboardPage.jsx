import React, { useState } from "react";
import AccountTabs from "./AccountTabs";
import RecentOrders from "./RecentOrders";
import PersonalInfo from "./PersonalInfo";
import AddressBook from "./AddressBook";

export default function DashboardPage({ user }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!user) return null; // Fallback, shouldn't render if no user

  return (
    <div className="min-h-screen bg-white pt-[112px]">
      {/* Hero Banner Overlay */}
      <div className="relative w-full h-[250px] overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0 z-10 bg-black/50"></div>
        <img
          src="https://images.unsplash.com/photo-1517457210348-703079e57d4b?auto=format&fit=crop&w=1920&q=80"
          alt="MVMT Account"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <h1 className="relative z-20 text-white text-3xl md:text-5xl font-serif tracking-[0.3em] uppercase">
          MVMT Account
        </h1>
      </div>

      <AccountTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {activeTab === "dashboard" && (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif tracking-widest uppercase mb-4">
                Hey, {user.lastName} {user.firstName}
              </h2>
              <p className="text-xs text-neutral-800 font-bold max-w-lg mx-auto">
                Welcome to your dashboard, your one-stop-shop for all your recent MVMT account activity.
              </p>
              <div className="w-16 h-[1px] bg-neutral-300 mx-auto mt-6"></div>
            </div>

            <div className="max-w-2xl mx-auto">
              <RecentOrders />
              <PersonalInfo user={user} />
              <AddressBook />
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
             <RecentOrders />
          </div>
        )}

        {activeTab === "contact" && (
          <div className="animate-in fade-in duration-500 max-w-2xl mx-auto text-center py-12">
            <h3 className="text-2xl font-serif mb-4">Need Help?</h3>
            <p className="text-sm text-neutral-600 mb-8">Our customer support team is available 24/7.</p>
            <a href="mailto:support@mvmt.com" className="bg-black text-white px-8 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors">
              Contact Support
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

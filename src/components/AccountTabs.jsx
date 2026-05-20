import React from "react";

export default function AccountTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "dashboard", label: "DASHBOARD" },
    { id: "orders", label: "ORDER HISTORY" },
    { id: "contact", label: "CONTACT US" },
  ];

  return (
    <div className="flex justify-center border-b border-neutral-200 mt-8 mb-12">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-4 text-[10px] font-bold tracking-widest uppercase transition-colors relative outline-none focus-visible:ring-1 focus-visible:ring-black ${
            activeTab === tab.id ? "text-black" : "text-neutral-500 hover:text-black"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black"></div>
          )}
        </button>
      ))}
    </div>
  );
}

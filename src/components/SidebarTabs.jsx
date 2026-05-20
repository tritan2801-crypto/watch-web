import React from "react";

export default function SidebarTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <ul className="flex flex-col space-y-2.5 font-bold tracking-[0.18em] uppercase text-[11px]" role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isOrange = tab.isOrange;

        return (
          <li key={tab.id} role="presentation">
            <button
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setActiveTab(tab.id)}
              className={`w-full text-left py-2 px-3 transition-all duration-150 outline-none rounded-sm flex items-center justify-between cursor-pointer focus-visible:ring-1 focus-visible:ring-neutral-400 ${
                isActive
                  ? "bg-neutral-100 text-black font-extrabold"
                  : isOrange
                  ? "text-orange-500 hover:text-orange-600 hover:bg-neutral-50"
                  : "text-neutral-500 hover:text-black hover:bg-neutral-50"
              }`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 ml-2" />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

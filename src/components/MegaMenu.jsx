import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarTabs from "./SidebarTabs";
import MenuContent from "./MenuContent";
import { api } from "../api/dbService";

export default function MegaMenu({
  activeMenu,
  setActiveMenu,
  onMouseEnterMenu,
  onMouseLeaveMenu,
  activeTab,
  setActiveTab,
  isScrolled,
}) {

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setActiveMenu]);

  const [menuData, setMenuData] = React.useState(null);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const data = await api.getCategories();
      setMenuData(data);
    };
    fetchCategories();
  }, []);

  // Keep activeTab state correct when swapping menus
  useEffect(() => {
    if (activeMenu && menuData) {
      const activeMenuData = menuData[activeMenu];
      if (activeMenuData && activeMenuData.tabs.length > 0) {
        // If current activeTab is not in the new menu's tabs, reset to first tab
        const tabExists = activeMenuData.tabs.some((t) => t.id === activeTab);
        if (!tabExists) {
          setActiveTab(activeMenuData.tabs[0].id);
        }
      }
    }
  }, [activeMenu, activeTab, setActiveTab, menuData]);

  if (!activeMenu || !menuData || !menuData[activeMenu]) return null;

  const currentMenuData = menuData[activeMenu];

  const tabs = currentMenuData.tabs;
  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];



  return (
    <div
      id="mega-menu-panel"
      className="hidden lg:block"
      onMouseEnter={() => onMouseEnterMenu()}
      onMouseLeave={onMouseLeaveMenu}
    >
      {/* Semi-transparent Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-30 transition-opacity duration-300"
        aria-hidden="true"
        onClick={() => setActiveMenu(null)}
      />

      {/* The Mega Menu Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} // Elegant easing curve
        className={`fixed left-0 w-full bg-white z-35 shadow-xl border-b border-neutral-200 overflow-hidden ${
          isScrolled ? "top-[80px]" : "top-[112px]"
        }`}
      >
        <div className="max-w-7xl mx-auto flex h-[480px] min-h-[400px]">
          {/* LEFT SIDEBAR: Vertical Navigation */}
          <div className="w-[220px] shrink-0 border-r border-neutral-100 py-8 px-6 bg-neutral-50/50">
            <SidebarTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* RIGHT SIDE: Dynamic Content Panel */}
          <div className="flex-grow py-8 px-12 bg-white relative overflow-hidden">
            <AnimatePresence mode="wait">
              <MenuContent key={`${activeMenu}-${activeTab}`} currentTab={currentTab} />
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

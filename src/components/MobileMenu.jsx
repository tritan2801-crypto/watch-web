import React, { useEffect, useState, useRef } from "react";
import { X, Search } from "lucide-react";
import AccordionItem from "./AccordionItem";
import { api } from "../api/dbService";

export default function MobileMenu({ isOpen, onClose, onSearchClick }) {
  const [activeSection, setActiveSection] = useState(null); // 'MENS' or 'WOMENS' or null
  const [activeCategory, setActiveCategory] = useState(null); // Tab ID or null
  const [menuData, setMenuData] = useState(null);
  const drawerRef = useRef(null);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Fetch menu data
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await api.getCategories();
      setMenuData(data);
    };
    fetchCategories();
  }, []);

  // Handle ESC key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus trapping logic for screen readers & keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = drawerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex="0"]'
    );
    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!isOpen || !menuData) return null;

  const handleSectionToggle = (section) => {
    setActiveSection(activeSection === section ? null : section);
    setActiveCategory(null);
  };

  const handleCategoryToggle = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
      {/* Black Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-[340px] h-full bg-white shadow-2xl flex flex-col justify-between z-10 transition-transform duration-300 ease-out"
        role="document"
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-black select-none">
            NAVIGATION
          </span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 hover:text-neutral-500 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-black"
            aria-label="Close menu drawer"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-grow overflow-y-auto px-6 py-4 no-scrollbar">
          {/* Search Trigger for Mobile */}
          <button
            onClick={() => {
              onClose();
              onSearchClick();
            }}
            className="w-full flex items-center space-x-3 py-3 px-4 border border-neutral-200 rounded-sm mb-6 text-neutral-400 hover:text-black transition-colors text-left text-xs tracking-wider"
          >
            <Search className="w-4 h-4" />
            <span>SEARCH THE STORE</span>
          </button>

          {/* Level 1 Accordion: MENS */}
          <AccordionItem
            title="SHOP MENS"
            id="mens-section"
            isOpen={activeSection === "MENS"}
            onToggle={() => handleSectionToggle("MENS")}
          >
            <div className="pl-2 flex flex-col">
              {menuData.MENS.tabs.map((tab) => (
                <AccordionItem
                  key={tab.id}
                  title={tab.label}
                  id={`mens-${tab.id}`}
                  isOpen={activeCategory === `mens-${tab.id}`}
                  onToggle={() => handleCategoryToggle(`mens-${tab.id}`)}
                  isOrange={tab.isOrange}
                >
                  <div className="pl-4 flex flex-col space-y-4 pt-1">
                    {/* Render standard layout column links */}
                    {tab.columns &&
                      tab.columns.map((col, idx) => (
                        <div key={idx} className="flex flex-col space-y-2">
                          <span className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                            {col.title}
                          </span>
                          {col.links.map((link, lidx) => (
                            <a
                              key={lidx}
                              href={link.href}
                              onClick={onClose}
                              className={`text-[11px] font-medium tracking-widest uppercase py-1 ${
                                link.isOrange ? "text-orange-500" : "text-black hover:text-neutral-500"
                              }`}
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      ))}

                    {/* Render limited edition items in mobile */}
                    {tab.items && (
                      <div className="flex flex-col space-y-3">
                        <span className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                          LIMITED RUNS
                        </span>
                        {tab.items.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={onClose}
                            className="text-[11px] font-bold tracking-widest uppercase py-1 text-black hover:text-neutral-500"
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionItem>
              ))}
            </div>
          </AccordionItem>

          {/* Level 1 Accordion: WOMENS */}
          <AccordionItem
            title="SHOP WOMENS"
            id="womens-section"
            isOpen={activeSection === "WOMENS"}
            onToggle={() => handleSectionToggle("WOMENS")}
          >
            <div className="pl-2 flex flex-col">
              {menuData.WOMENS.tabs.map((tab) => (
                <AccordionItem
                  key={tab.id}
                  title={tab.label}
                  id={`womens-${tab.id}`}
                  isOpen={activeCategory === `womens-${tab.id}`}
                  onToggle={() => handleCategoryToggle(`womens-${tab.id}`)}
                  isOrange={tab.isOrange}
                >
                  <div className="pl-4 flex flex-col space-y-4 pt-1">
                    {/* Columns */}
                    {tab.columns &&
                      tab.columns.map((col, idx) => (
                        <div key={idx} className="flex flex-col space-y-2">
                          <span className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                            {col.title}
                          </span>
                          {col.links.map((link, lidx) => (
                            <a
                              key={lidx}
                              href={link.href}
                              onClick={onClose}
                              className={`text-[11px] font-medium tracking-widest uppercase py-1 ${
                                link.isOrange ? "text-orange-500" : "text-black hover:text-neutral-500"
                              }`}
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      ))}

                    {/* Limited runs */}
                    {tab.items && (
                      <div className="flex flex-col space-y-3">
                        <span className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                          LIMITED RUNS
                        </span>
                        {tab.items.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={onClose}
                            className="text-[11px] font-bold tracking-widest uppercase py-1 text-black hover:text-neutral-500"
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionItem>
              ))}
            </div>
          </AccordionItem>

          {/* Direct Mobile Links */}
          <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col space-y-4 text-xs font-bold tracking-[0.2em] uppercase">
            <a
              href="#clearance"
              onClick={onClose}
              className="text-orange-500 py-2.5 px-1 hover:text-orange-600"
            >
              LAST CHANCE
            </a>
            <a
              href="#stories"
              onClick={onClose}
              className="text-black py-2.5 px-1 hover:text-neutral-500"
            >
              EXPLORE STORIES
            </a>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-neutral-100 bg-neutral-50 text-[10px] text-neutral-400 font-bold tracking-widest uppercase">
          <div className="flex items-center space-x-2 justify-center">
            <span>🇺🇸</span>
            <span>UNITED STATES (USD $)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

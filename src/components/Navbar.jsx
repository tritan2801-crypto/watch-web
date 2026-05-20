import React, { useRef } from "react";
import { Search, User, ShoppingBag } from "lucide-react";

export default function Navbar({
  activeMenu,
  onMouseEnterMenu,
  onMouseLeaveMenu,
  onSearchClick,
  onCartClick,
  cartItemsCount,
  isScrolled,
  onLogoClick,
  onUserClick,
  currentUser,
  onLogout,
}) {


  return (
    <header
      id="main-header"
      className={`fixed left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100"
          : "top-[32px] bg-white border-b border-neutral-200"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between relative">
        {/* Left Section Navigation Links */}
        <nav
          className="flex items-center space-x-8 text-[11px] font-bold tracking-[0.22em] uppercase select-none"
          role="navigation"
          aria-label="Main navigation"
        >
          <div
            className="relative py-4 cursor-pointer"
            onMouseEnter={() => onMouseEnterMenu("MENS")}
            onMouseLeave={onMouseLeaveMenu}
          >
            <button
              id="nav-mens-btn"
              className={`hover:text-neutral-500 transition-colors py-2 uppercase tracking-[0.22em] outline-none focus-visible:ring-1 focus-visible:ring-black ${
                activeMenu === "MENS" ? "text-neutral-900 border-b border-black" : "text-black"
              }`}
              aria-expanded={activeMenu === "MENS"}
              aria-controls="mega-menu-panel"
            >
              MENS
            </button>
          </div>

          <div
            className="relative py-4 cursor-pointer"
            onMouseEnter={() => onMouseEnterMenu("WOMENS")}
            onMouseLeave={onMouseLeaveMenu}
          >
            <button
              id="nav-womens-btn"
              className={`hover:text-neutral-500 transition-colors py-2 uppercase tracking-[0.22em] outline-none focus-visible:ring-1 focus-visible:ring-black ${
                activeMenu === "WOMENS" ? "text-neutral-900 border-b border-black" : "text-black"
              }`}
              aria-expanded={activeMenu === "WOMENS"}
              aria-controls="mega-menu-panel"
            >
              WOMENS
            </button>
          </div>

          <div
            className="relative py-4 cursor-pointer"
            onMouseEnter={() => onMouseEnterMenu("LAST_CHANCE")}
            onMouseLeave={onMouseLeaveMenu}
          >
            <button
              id="nav-lastchance-btn"
              className={`hover:text-orange-600 transition-colors py-2 uppercase tracking-[0.22em] outline-none focus-visible:ring-1 focus-visible:ring-black text-orange-500 ${
                activeMenu === "LAST_CHANCE" ? "border-b border-orange-500" : ""
              }`}
              aria-expanded={activeMenu === "LAST_CHANCE"}
              aria-controls="mega-menu-panel"
            >
              LAST CHANCE
            </button>
          </div>
        </nav>

        {/* Center Section: Minimal Text Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onLogoClick?.(); }}
          className="text-xl md:text-2xl font-bold tracking-[0.32em] uppercase select-none transition-transform duration-300 hover:scale-102 absolute left-1/2 -translate-x-1/2 text-black focus-visible:ring-1 focus-visible:ring-black outline-none"
          aria-label="MVMT Homepage"
        >
          MVMT
        </a>

        {/* Right Section Actions */}
        <div className="flex items-center space-x-6 text-black">
          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            className="hover:text-neutral-500 p-2 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-black"
            aria-label="Open search overlay"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Profile link */}
          <div className="flex items-center">
            {currentUser ? (
              <div className="relative group flex items-center space-x-2 cursor-pointer h-full py-4">
                <a
                  href="#account"
                  onClick={(e) => { e.preventDefault(); onUserClick?.(); }}
                  className="hover:text-neutral-500 transition-colors outline-none focus-visible:ring-1 focus-visible:ring-black flex items-center space-x-2"
                >
                  <User className="w-5 h-5 stroke-[1.8]" />
                  <span className="text-[10px] uppercase font-bold tracking-widest hidden md:inline-block">
                    {currentUser.lastName} {currentUser.firstName}
                  </span>
                </a>
                
                {/* Dropdown for logout */}
                <div className="absolute top-full right-0 bg-white border border-neutral-200 shadow-md p-4 hidden group-hover:block w-32 z-50">
                  <button onClick={onLogout} className="text-xs uppercase tracking-widest w-full text-left hover:text-neutral-500 font-bold outline-none focus-visible:ring-1 focus-visible:ring-black">
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <a
                href="#account"
                onClick={(e) => { e.preventDefault(); onUserClick?.(); }}
                className="hover:text-neutral-500 p-2 transition-colors cursor-pointer hidden md:inline-block outline-none focus-visible:ring-1 focus-visible:ring-black"
                aria-label="View your account profile"
              >
                <User className="w-5 h-5 stroke-[1.8]" />
              </a>
            )}
          </div>

          {/* Cart Trigger */}
          <button
            onClick={onCartClick}
            className="relative hover:text-neutral-500 p-2 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-black"
            aria-label={`Open shopping bag, ${cartItemsCount} items`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {/* Dynamic Badge indicator */}
            <span
              className={`absolute top-0.5 right-0.5 bg-neutral-900 text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                cartItemsCount > 0 ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
              }`}
            >
              {cartItemsCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

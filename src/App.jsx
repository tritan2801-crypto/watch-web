import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import MegaMenu from "./components/MegaMenu";
import MobileMenu from "./components/MobileMenu";
import ProductDetail from "./components/ProductDetail";
import AuthPage from "./components/AuthPage";
import DashboardPage from "./components/DashboardPage";
import AdminLayout from "./components/admin/AdminLayout";
import { api } from "./api/dbService";
import { ChevronLeft, ChevronRight, Star, ArrowRight, Menu } from "lucide-react";

export default function App() {
  // Global Layout / Menu States
  const [activeMenu, setActiveMenu] = useState(null); // 'MENS' | 'WOMENS' | null
  const [activeTab, setActiveTab] = useState("watches"); // watches, sunglasses, etc.
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'product' | 'auth' | 'dashboard' | 'admin'
  const [currentUser, setCurrentUser] = useState(null);

  const handleViewChange = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleViewChange("home");
  };

  const menuTimeoutRef = useRef(null);

  const handleMouseEnterMenu = (menuName) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    if (menuName) {
      setActiveMenu(menuName);
    }
  };

  const handleMouseLeaveMenu = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 300);
  };

  // Cart State (Hydrated from localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("mvmt_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Newsletter signup state
  const [email, setEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Best Sellers Products Data with variant swap state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await api.getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Synchronize Cart to Local Storage
  useEffect(() => {
    localStorage.setItem("mvmt_cart", JSON.stringify(cart));
  }, [cart]);

  // Detect Scroll for header background blurring & top repositioning
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart utility handlers
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.variant === product.activeVariantName
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.variant === product.activeVariantName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.activeImage,
            variant: product.activeVariantName,
            quantity: 1,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id, variant) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.variant === variant)));
  };

  const handleUpdateQuantity = (id, variant, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.variant === variant
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleVariantChange = (productId, variant) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, activeVariantName: variant.name, activeImage: variant.image }
          : p
      )
    );
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setNewsletterSubscribed(true);
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // --- ADMIN BRANCH: completely separate layout, no storefront ---
  if (currentView === "admin" && currentUser?.role === "admin") {
    return (
      <AdminLayout
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  }

  // Best Sellers and Stories scroll viewports references
  const sellersViewportRef = useRef(null);

  const scrollSellers = (direction) => {
    const amount = 304; // Width + gap
    if (sellersViewportRef.current) {
      sellersViewportRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-black font-sans min-h-screen selection:bg-neutral-200 antialiased overflow-x-hidden">
      {/* ==================== ANNOUNCEMENT BAR ==================== */}
      <div
        id="announcement-bar"
        className="w-full bg-black text-[#FAF8F5] text-[10px] tracking-[0.2em] uppercase py-2 px-4 relative z-50 flex items-center justify-center font-bold"
      >
        <div className="flex items-center space-x-4">
          <span className="opacity-50 select-none">&lt;</span>
          <span className="select-none text-center">FREE SHIPPING ON ALL U.S. ORDERS $75+</span>
          <span className="opacity-50 select-none">&gt;</span>
        </div>
      </div>

      {/* ==================== REACT NAVBAR & MEGAMENU ==================== */}
      <Navbar
        activeMenu={activeMenu}
        onMouseEnterMenu={handleMouseEnterMenu}
        onMouseLeaveMenu={handleMouseLeaveMenu}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItemsCount={totalCartCount}
        onSearchClick={() => setIsSearchOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        isScrolled={isScrolled}
        onLogoClick={() => handleViewChange("home")}
          onUserClick={() => {
            if (!currentUser) return handleViewChange("auth");
            handleViewChange(currentUser.role === "admin" ? "admin" : "dashboard");
          }}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <MegaMenu
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onMouseEnterMenu={handleMouseEnterMenu}
        onMouseLeaveMenu={handleMouseLeaveMenu}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isScrolled={isScrolled}
      />

      {/* Mobile Navbar trigger header */}
      <div
        className={`lg:hidden fixed left-0 w-full z-40 bg-white border-b border-neutral-100 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
          isScrolled ? "top-0" : "top-[36px]"
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-black p-1 hover:text-neutral-500 transition-colors cursor-pointer"
          aria-label="Open mobile navigation drawer"
        >
          <Menu className="w-6 h-6" />
        </button>

        <a href="#" className="text-lg font-bold tracking-[0.25em] uppercase text-black select-none">
          MVMT
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative text-black p-1 hover:text-neutral-500 transition-colors cursor-pointer"
          aria-label="Open Cart"
        >
          <span className="text-[11px] font-bold tracking-widest">BAG</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-black text-white text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* ==================== RESPONSIVE MOBILE DRAWER ==================== */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* ==================== SIDE SLIDE-OUT CART DRAWER ==================== */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
            onClick={() => setIsCartOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-[#FAF8F5] shadow-2xl z-55 flex flex-col transition-transform duration-300 animate-slide-in"
            role="dialog"
            aria-label="Shopping Cart"
          >
            <div className="px-6 py-6 border-b border-neutral-200 flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black">
                Shopping Cart ({totalCartCount})
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:text-neutral-500 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <XIcon />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto px-6 py-4 no-scrollbar divide-y divide-neutral-200/50">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <ShoppingBagIconLarge />
                  <p className="text-xs tracking-widest text-neutral-400 uppercase mb-6 font-semibold">
                    Your cart is currently empty
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      document.getElementById("shop-sellers")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-8 py-3.5 bg-black text-[#FAF8F5] hover:bg-neutral-800 text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors"
                  >
                    Shop Best Sellers
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex items-center py-6">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-20 object-cover bg-neutral-100 border border-neutral-200/50 flex-shrink-0 select-none"
                    />
                    <div className="ml-5 flex-grow">
                      <h4 className="text-[11px] font-bold tracking-wider uppercase text-black mb-1">
                        {item.name}
                      </h4>
                      <p className="text-[9px] text-neutral-400 uppercase tracking-widest mb-3">
                        {item.variant}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-neutral-300 bg-white/50 text-[10px]">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.variant, -1)}
                            className="px-2 py-1 text-neutral-400 hover:text-black transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2.5 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.variant, 1)}
                            className="px-2 py-1 text-neutral-400 hover:text-black transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className="text-[11px] font-bold text-black">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemoveFromCart(item.id, item.variant)}
                            className="p-1 hover:text-red-500 text-neutral-400 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-neutral-200 bg-[#FAF8F5] flex flex-col space-y-4">
                <div className="flex justify-between items-center text-xs tracking-widest uppercase font-semibold">
                  <span>Subtotal</span>
                  <span className="text-xs font-bold text-black">${totalCartCost.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-neutral-400 tracking-wide">
                  Shipping and taxes calculated at checkout.
                </p>
                <button className="w-full py-4 bg-black text-[#FAF8F5] hover:bg-neutral-800 text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors shadow-md">
                  Proceed To Checkout
                </button>
              </div>
            )}
          </aside>
        </>
      )}

      {/* ==================== SEARCH OVERLAY ==================== */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-[#FAF8F5]/98 z-55 flex flex-col justify-start transition-all">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-8 right-8 p-4 hover:text-neutral-500 transition-colors cursor-pointer"
            aria-label="Close search overlay"
          >
            <XIconLarge />
          </button>
          <div className="max-w-4xl w-full mx-auto px-6 pt-32">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-4 select-none">
              Search the store
            </p>
            <div className="relative border-b-2 border-black flex items-center py-2">
              <input
                type="text"
                autoFocus
                placeholder="WHAT ARE YOU LOOKING FOR?"
                className="w-full bg-transparent border-none outline-none text-2xl md:text-3xl text-black placeholder:text-neutral-300 tracking-wider uppercase font-medium focus:ring-0"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="hover:text-neutral-500 p-2 cursor-pointer"
                aria-label="Submit search query"
              >
                <Search className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PRODUCT DETAIL PAGE ==================== */}
      {currentView === "product" && (
        <ProductDetail
          onAddToCart={handleAddToCart}
          onBack={() => handleViewChange("home")}
        />
      )}

      {/* ==================== AUTHENTICATION PAGE ==================== */}
      {currentView === "auth" && (
        <AuthPage onLoginSuccess={(user) => {
          setCurrentUser(user);
          handleViewChange(user.role === "admin" ? "admin" : "dashboard");
        }} />
      )}

      {/* ==================== DASHBOARD PAGE ==================== */}
      {currentView === "dashboard" && (
        <DashboardPage user={currentUser} />
      )}

      {/* ==================== MAIN CONTENT WRAPPER ==================== */}
      <main className={`pt-[112px] lg:pt-[112px] relative w-full ${currentView === 'home' ? 'block' : 'hidden'}`}>
        {/* ==================== TOP PROMO BANNER ==================== */}
        <div className="w-full bg-[#8EACC5] text-white py-3 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between z-30 relative shadow-sm">
          <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-8 text-center md:text-left select-none">
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase">
              Memorial Day Sale: 15% Off*
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/90 font-medium">
              Welcome Code: <strong className="text-white">MVMT-15</strong>
            </span>
          </div>
          <div className="flex space-x-3 mt-3 md:mt-0">
            <a
              href="#men-watches"
              className="text-[9.5px] font-bold tracking-widest border border-white px-5 py-2 hover:bg-white hover:text-black transition-colors"
            >
              SHOP MEN
            </a>
            <a
              href="#women-watches"
              className="text-[9.5px] font-bold tracking-widest border border-white px-5 py-2 hover:bg-white hover:text-black transition-colors"
            >
              SHOP WOMEN
            </a>
          </div>
        </div>

        {/* ==================== HERO SECTION ==================== */}
        <section id="hero" className="relative w-full h-[calc(100vh-172px)] min-h-[500px] overflow-hidden bg-black">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-black/35 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1920&q=80"
              alt="Legacy Slim Auto Bronze Face Link Strap Watch"
              className="w-full h-full object-cover scale-100 select-none"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-6 md:px-16 max-w-7xl mx-auto text-white">
              <h1 className="text-4xl md:text-6xl font-bold tracking-wide leading-tight mb-3 select-none">
                Legacy Slim Auto
              </h1>
              <p className="text-xs md:text-sm tracking-[0.18em] uppercase mb-8 text-white/80 font-medium select-none">
                24-Jewel Miyota Automatic
              </p>
              <div>
                <a
                  href="#shop-sellers"
                  className="bg-white text-black hover:bg-neutral-100 transition-colors font-bold tracking-widest text-[10.5px] px-8 py-3.5"
                >
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== FLOATING QUICK CARDS ==================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 md:-mt-16 relative z-30 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-neutral-200/50 flex flex-col justify-between h-[360px] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="w-full h-[62%] overflow-hidden bg-neutral-50">
                <img
                  src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=800&q=80"
                  alt="Couple wearing lifestyle sunglasses"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none"
                />
              </div>
              <div className="p-6 text-center flex flex-col items-center justify-center flex-grow bg-white">
                <h3 className="text-base font-bold tracking-wide mb-3">Trending Styles</h3>
                <a
                  href="#shop-sellers"
                  className="bg-black text-[#FAF8F5] hover:bg-neutral-800 text-[9px] font-bold tracking-widest px-6 py-2.5 uppercase"
                >
                  SHOP NOW
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-neutral-200/50 flex flex-col justify-between h-[360px] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="w-full h-[62%] overflow-hidden bg-neutral-50">
                <img
                  src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80"
                  alt="Sleek steel watch dial on wrist"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none"
                />
              </div>
              <div className="p-6 text-center flex flex-col items-center justify-center flex-grow bg-white">
                <h3 className="text-base font-bold tracking-wide mb-3">Odyssey Automatic</h3>
                <a
                  href="#shop-sellers"
                  className="bg-black text-[#FAF8F5] hover:bg-neutral-800 text-[9px] font-bold tracking-widest px-6 py-2.5 uppercase"
                >
                  SHOP NOW
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-neutral-200/50 flex flex-col justify-between h-[360px] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="w-full h-[62%] overflow-hidden bg-neutral-50">
                <img
                  src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=800&q=80"
                  alt="Woman wearing watch and gold chain links"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none"
                />
              </div>
              <div className="p-6 text-center flex flex-col items-center justify-center flex-grow bg-white">
                <h3 className="text-base font-bold tracking-wide mb-3">Women's Leather</h3>
                <div className="flex space-x-2">
                  <a
                    href="#men-watches"
                    className="border border-black text-black hover:bg-black hover:text-white transition-colors text-[8.5px] font-bold tracking-widest px-4 py-2 uppercase"
                  >
                    SHOP MEN
                  </a>
                  <a
                    href="#women-watches"
                    className="border border-black text-black hover:bg-black hover:text-white transition-colors text-[8.5px] font-bold tracking-widest px-4 py-2 uppercase"
                  >
                    SHOP WOMEN
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== EYEWEAR LOGO BAR ==================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-6 select-none">
          <div className="w-full bg-white border border-neutral-200/55 py-3.5 px-8 flex flex-col sm:flex-row items-center justify-between shadow-sm rounded-sm">
            <div className="flex items-center space-x-5">
              <svg className="w-12 h-6 text-black" viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 12C6 9.23858 8.23858 7 11 7H17C19.7614 7 22 9.23858 22 12V14C22 16.7614 19.7614 19 17 19H11C8.23858 19 6 16.7614 6 14V12Z" />
                <path d="M26 12C26 9.23858 28.2386 7 31 7H37C39.7614 7 42 9.23858 42 12V14C42 16.7614 39.7614 19 37 19H31C28.2386 19 26 16.7614 26 14V12Z" />
                <path d="M22 11H26" strokeLinecap="round" />
                <path d="M6 12C6 12 3 12 1 14" strokeLinecap="round" />
                <path d="M42 12C42 12 45 12 47 14" strokeLinecap="round" />
              </svg>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#1E2D3D] uppercase">
                Eco-Friendly Polarized Lenses
              </span>
            </div>
            <a
              href="#men-sunglasses"
              className="bg-[#1E2D3D] text-white hover:bg-[#111A24] transition-colors text-[9.5px] font-bold tracking-widest px-6 py-2.5 mt-3 sm:mt-0 uppercase rounded-sm"
            >
              SHOP EYEWEAR
            </a>
          </div>
        </section>

        {/* ==================== MIDDLE BLUE BANNER ==================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
          <div className="w-full bg-[#1E2D3D] text-white py-4 px-8 flex flex-col sm:flex-row items-center justify-between shadow-md select-none rounded-sm">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-center sm:text-left mb-3 sm:mb-0">
              Exclusive Offer: 15% Off sitewide*
            </span>
            <div className="flex space-x-3">
              <a
                href="#men-watches"
                className="text-[9.5px] font-bold tracking-widest border border-white px-5 py-2 hover:bg-white hover:text-black transition-colors"
              >
                SHOP MEN
              </a>
              <a
                href="#women-watches"
                className="text-[9.5px] font-bold tracking-widest border border-white px-5 py-2 hover:bg-white hover:text-black transition-colors"
              >
                SHOP WOMEN
              </a>
            </div>
          </div>
        </section>

        {/* ==================== SHOP BY CATEGORIES ==================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="text-left mb-10 select-none">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide mb-1 font-serif">
              Shop By Categories
            </h2>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">
              Explore premium minimalist craft
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Watches (Wide Card) */}
            <a
              href="#watches"
              className="group relative h-[250px] md:col-span-2 shadow-sm flex flex-col justify-start p-6 text-white overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-black/25 z-10 transition-opacity duration-300 group-hover:bg-black/35"></div>
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
                alt="Chronograph watch glowing gold"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none"
              />
              <div className="relative z-20">
                <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-white/90">Watches</h3>
                <span className="text-[8.5px] tracking-widest uppercase text-[#FAF8F5] mt-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  SHOP NOW &gt;
                </span>
              </div>
            </a>

            {/* Card 2: Eyewear */}
            <a
              href="#sunglasses"
              className="group relative h-[250px] md:col-span-1 shadow-sm flex flex-col justify-start p-6 text-white overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-black/25 z-10 transition-opacity duration-300 group-hover:bg-black/35"></div>
              <img
                src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
                alt="Man driving in premium sunglasses"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none"
              />
              <div className="relative z-20">
                <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-white/90">Eyewear</h3>
              </div>
            </a>

            {/* Card 3: Men's Jewelry */}
            <a
              href="#jewelry"
              className="group relative h-[250px] md:col-span-1 shadow-sm flex flex-col justify-start p-6 text-white overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-black/25 z-10 transition-opacity duration-300 group-hover:bg-black/35"></div>
              <img
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
                alt="Gold link wrist bracelets"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none"
              />
              <div className="relative z-20">
                <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-white/90">Mens Jewelry</h3>
              </div>
            </a>

            {/* Card 4: Women's Jewelry (Wide) */}
            <a
              href="#jewelry"
              className="group relative h-[250px] md:col-span-2 shadow-sm flex flex-col justify-start p-6 text-white overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-300 group-hover:bg-black/35"></div>
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80"
                alt="Sleek silver necklace"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none"
              />
              <div className="relative z-20">
                <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-white/90">Womens Jewelry</h3>
              </div>
            </a>
          </div>
        </section>

        {/* ==================== SOCIAL PROOF COLLAGE ==================== */}
        <section className="w-full bg-neutral-100/50 py-16 mb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center select-none">
            {/* Stars */}
            <div className="flex space-x-1 text-orange-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current stroke-none" />
              ))}
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-wide text-neutral-800 mb-1.5 font-serif">
              Over 95,000 Five Star Reviews
            </h2>
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10 relative h-[450px] shadow-md group overflow-hidden rounded-sm">
            <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 h-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80"
                  alt="Gold watch lifestyle shot"
                  className="w-full h-full object-cover select-none"
                />
              </div>
              <div className="w-full md:w-1/2 h-full overflow-hidden relative border-t md:border-t-0 md:border-l border-neutral-200/50">
                <img
                  src="https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1200&q=80"
                  alt="Steel watch lifestyle shot"
                  className="w-full h-full object-cover select-none"
                />
              </div>
            </div>

            <div className="absolute inset-0 bg-black/30 z-10 transition-opacity group-hover:bg-black/35 pointer-events-none"></div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-6">
              <h3 className="text-3xl md:text-4xl font-bold tracking-wide mb-6 font-serif select-none">
                Back In Stock
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#men-watches"
                  className="bg-white text-black font-bold tracking-widest text-[9.5px] px-6 py-2.5 hover:bg-neutral-100 transition-colors uppercase"
                >
                  SHOP MEN
                </a>
                <a
                  href="#women-watches"
                  className="bg-white text-black font-bold tracking-widest text-[9.5px] px-6 py-2.5 hover:bg-neutral-100 transition-colors uppercase"
                >
                  SHOP WOMEN
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== FEATURED STORIES ==================== */}
        <section id="stories" className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="text-center max-w-xl mx-auto mb-10 select-none">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide mb-1 font-serif">
              Featured Stories
            </h2>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">
              Daily inspiration, lookbooks and stories
            </p>
          </div>

          <div
            className="overflow-x-auto pb-6 cursor-grab no-scrollbar"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex space-x-6 w-max">
              {[
                {
                  title: "MVMT CLASSICS",
                  desc: "Our classic minimalist profiles, engineered out of coastal solar accents.",
                  img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
                },
                {
                  title: "9TO5 MALIBU AVENUE",
                  desc: "Seamless day-to-night transitions, constructed with brushed mesh straps.",
                  img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
                },
                {
                  title: "THE MODERN WANDERER",
                  desc: "Crafted out of lightweight durable acetates for modern global travel.",
                  img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
                },
              ].map((story, i) => (
                <article
                  key={i}
                  className="w-[280px] bg-white border border-neutral-200/50 shadow-sm flex flex-col justify-between overflow-hidden relative group rounded-sm"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={story.img}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none"
                    />
                  </div>
                  <div className="p-6 flex-grow bg-white">
                    <h3 className="font-serif text-sm font-bold tracking-wide mb-2">{story.title}</h3>
                    <p className="text-[11px] text-neutral-500 leading-relaxed mb-4">{story.desc}</p>
                    <a
                      href="#"
                      className="text-[10px] font-bold tracking-wider uppercase text-black hover:text-neutral-500 transition-colors inline-block"
                    >
                      READ STORY &gt;
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== BEST SELLERS PRODUCT CAROUSEL ==================== */}
        <section id="shop-sellers" className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="select-none">
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide mb-1 font-serif">Best Sellers</h2>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">
                Shop our globally trusted models
              </p>
            </div>
            {/* Carousel Buttons */}
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <button
                onClick={() => scrollSellers("left")}
                className="p-2 border border-neutral-300 text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                aria-label="Scroll best sellers left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSellers("right")}
                className="p-2 border border-neutral-300 text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                aria-label="Scroll best sellers right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={sellersViewportRef}
            className="overflow-x-auto no-scrollbar pb-4"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex space-x-6 w-max">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="w-[280px] bg-white border border-neutral-200/40 shadow-sm relative group flex flex-col justify-between overflow-hidden rounded-sm cursor-pointer hover:shadow-md transition-shadow"
                  style={{ scrollSnapAlign: "start" }}
                  onClick={() => handleViewChange("product")}
                >
                  {/* Image Viewport */}
                  <div className="relative w-full h-[320px] overflow-hidden bg-white">
                    <img
                      src={prod.activeImage}
                      alt={prod.name}
                      className="absolute inset-0 w-full h-full object-contain p-4 select-none transition-transform duration-700 group-hover:scale-102"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(prod); }}
                      className="absolute bottom-0 left-0 w-full py-3.5 bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all cursor-pointer opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 z-10"
                    >
                      Quick Add To Cart
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 bg-white border-t border-neutral-100">
                    {/* Variant Selectors */}
                    <div className="flex space-x-2.5 mb-3">
                      {prod.variants.map((v) => (
                        <button
                          key={v.key}
                          onClick={(e) => { e.stopPropagation(); handleVariantChange(prod.id, v); }}
                          style={{ backgroundColor: v.colorHex }}
                          className={`w-4 h-4 rounded-full border border-black/10 cursor-pointer transition-transform relative z-10 ${
                            prod.activeVariantName === v.name ? "scale-120 ring-1 ring-black ring-offset-1" : ""
                          }`}
                          aria-label={`Select variant ${v.name}`}
                        />
                      ))}
                    </div>

                    <h3 className="font-serif text-sm font-bold tracking-wide text-black mb-1">
                      {prod.name}
                    </h3>
                    <p className="text-[10px] text-neutral-400 mb-2 tracking-widest uppercase font-semibold">
                      {prod.activeVariantName}
                    </p>

                    <div className="flex justify-between items-center mt-2 border-t border-neutral-100 pt-2.5">
                      <span className="text-xs font-bold text-black">${prod.price.toFixed(2)}</span>
                      <span className="text-[10.5px] text-orange-500 flex items-center select-none font-bold">
                        <Star className="w-3.5 h-3.5 fill-current stroke-none mr-0.5" />
                        {prod.rating} ({prod.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ==================== PREMIUM FOOTER ==================== */}
      <footer className="bg-[#EFECE6] text-neutral-700 pt-16 pb-12 border-t border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-300/30">
            {/* Left: Newsletter */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <h4 className="text-xs font-bold tracking-[0.22em] uppercase text-black">
                Join the Movement
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
                Subscribe to receive exclusive editorial drop alerts, seasonal lookbooks, and 10% off your initial order.
              </p>
              {newsletterSubscribed ? (
                <div className="text-xs text-orange-500 font-bold tracking-wider py-2">
                  Thank you for subscribing! Welcome to the MVMT.
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex max-w-sm w-full bg-white border border-neutral-300 rounded-sm overflow-hidden p-1"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER EMAIL"
                    className="flex-grow px-4 py-3 text-xs bg-transparent border-none outline-none tracking-wider text-black placeholder:text-neutral-300 uppercase font-semibold"
                  />
                  <button
                    type="submit"
                    className="bg-black text-[#FAF8F5] hover:bg-neutral-800 text-[10px] font-bold tracking-widest px-6 uppercase"
                  >
                    JOIN
                  </button>
                </form>
              )}

              <div className="flex items-center space-x-2 pt-2 text-xs font-bold text-black select-none">
                <span className="text-lg">🇺🇸</span>
                <span>UNITED STATES (USD $)</span>
              </div>
            </div>

            {/* Right: Quick Links */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 text-[11px] tracking-wider uppercase font-medium">
              <div className="flex flex-col space-y-4">
                <h5 className="font-bold text-black tracking-[0.15em] mb-1">SHOP</h5>
                <a href="#men-watches" className="text-neutral-500 hover:text-black transition-colors">
                  Men's Watches
                </a>
                <a href="#women-watches" className="text-neutral-500 hover:text-black transition-colors">
                  Women's Watches
                </a>
                <a href="#men-sunglasses" className="text-neutral-500 hover:text-black transition-colors">
                  Premium Eyewear
                </a>
                <a href="#men-jewelry" className="text-neutral-500 hover:text-black transition-colors">
                  Minimal Jewelry
                </a>
              </div>

              <div className="flex flex-col space-y-4">
                <h5 className="font-bold text-black tracking-[0.15em] mb-1">SUPPORT</h5>
                <a href="#support" className="text-neutral-500 hover:text-black transition-colors">
                  Shipping & Returns
                </a>
                <a href="#support" className="text-neutral-500 hover:text-black transition-colors">
                  Warranty & Repairs
                </a>
                <a href="#support" className="text-neutral-500 hover:text-black transition-colors">
                  Help & FAQ
                </a>
              </div>

              <div className="flex flex-col space-y-4">
                <h5 className="font-bold text-black tracking-[0.15em] mb-1">BRAND</h5>
                <a href="#brand" className="text-neutral-500 hover:text-black transition-colors">
                  Our Story
                </a>
                <a href="#brand" className="text-neutral-500 hover:text-black transition-colors">
                  Sustainability
                </a>
                <a href="#brand" className="text-neutral-500 hover:text-black transition-colors">
                  Careers
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Legal */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-[9px] text-neutral-400 font-semibold tracking-wider select-none">
            <p className="mb-4 md:mb-0">© 2026 MVMT WATCHES INC. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-6">
              <a href="#privacy" className="hover:text-black transition-colors">PRIVACY POLICY</a>
              <a href="#terms" className="hover:text-black transition-colors">TERMS OF SERVICE</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Inline SVGs for lightweight, premium icons
function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function XIconLarge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ShoppingBagIconLarge() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-16 h-16 text-neutral-300 mb-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}

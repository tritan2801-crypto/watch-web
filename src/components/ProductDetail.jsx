import React from "react";
import { Star, Truck, RefreshCcw, ShieldCheck, Lock, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetail({ onAddToCart, onBack }) {
  // Placeholder Unsplash images mimicking the MVMT aesthetic
  const productImages = [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80", // Front/Square-ish looking watch
    "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=1200&q=80", // On wrist lifestyle
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80", // Detail/Jewelry stack
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80", // Another lifestyle
  ];

  const colorOptions = [
    { hex: "#d4af37", name: "Gold" },
    { hex: "#c0c0c0", name: "Silver" },
    { hex: "#b76e79", name: "Rose Gold" },
    { hex: "#111111", name: "Black" },
    { hex: "#23415c", name: "Navy/Gold" },
    { hex: "#5d4037", name: "Brown Leather" },
  ];

  const [activeColor, setActiveColor] = React.useState(0);

  return (
    <div className="bg-white min-h-screen pt-[112px] pb-24 text-black">
      {/* Breadcrumb / Back button */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center space-x-2 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
        <button onClick={onBack} className="hover:text-black transition-colors cursor-pointer">
          Home
        </button>
        <span>/</span>
        <button onClick={onBack} className="hover:text-black transition-colors cursor-pointer">
          Women's Watches
        </button>
        <span>/</span>
        <span className="text-black">Signature Square</span>
      </div>

      {/* Product Top Section (Split Layout) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-4 grid grid-cols-1 md:grid-cols-12 gap-12 relative items-start">
        {/* Left: Image Gallery (CSS Grid) */}
        <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 gap-4 md:gap-6">
          {/* Main Large Image */}
          <div className="col-span-2 relative aspect-[4/5] bg-neutral-100 overflow-hidden">
            <img
              src={productImages[0]}
              alt="Signature Square 24MM Gold Front View"
              className="w-full h-full object-cover select-none"
            />
          </div>
          {/* Secondary Images */}
          {productImages.slice(1).map((img, idx) => (
            <div key={idx} className="relative aspect-square bg-neutral-100 overflow-hidden">
              <img
                src={img}
                alt={`Signature Square 24MM View ${idx + 2}`}
                className="w-full h-full object-cover select-none"
              />
            </div>
          ))}
        </div>

        {/* Right: Sticky Product Info */}
        <div className="md:col-span-5 lg:col-span-4 sticky top-[132px] flex flex-col space-y-6">
          <div className="border-b border-neutral-200 pb-6">
            <h2 className="text-[10px] font-bold tracking-[0.25em] text-neutral-500 uppercase mb-2">
              MVMT
            </h2>
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide uppercase mb-3">
              Signature Square 24MM
            </h1>
            <p className="text-xl font-medium tracking-wider mb-4">$148.00</p>
            
            <div className="flex items-center space-x-2 mb-2 cursor-pointer hover:opacity-80">
              <div className="flex text-orange-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current stroke-none" />
                ))}
              </div>
              <span className="text-[11px] font-bold tracking-widest uppercase mt-0.5">
                4.9 (215)
              </span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-3">
              Color: <span className="text-black">{colorOptions[activeColor].name}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveColor(idx)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    activeColor === idx ? "border-black p-[2px]" : "border-transparent"
                  }`}
                  aria-label={`Select color ${color.name}`}
                >
                  <span
                    className="w-full h-full rounded-full shadow-inner block"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                onAddToCart({
                  id: "sig-sq-24",
                  name: "Signature Square 24MM",
                  price: 148.00,
                  activeVariantName: colorOptions[activeColor].name,
                  activeImage: productImages[0],
                });
              }}
              className="w-full py-4 bg-black text-[#FAF8F5] hover:bg-neutral-800 transition-colors text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center shadow-lg"
            >
              Add To Cart
            </button>
            <p className="text-[9px] text-center text-neutral-400 font-semibold tracking-widest uppercase mt-3">
              Free Shipping On Orders $75+
            </p>
          </div>

          {/* USPs Icons */}
          <div className="grid grid-cols-2 gap-y-6 pt-6 border-t border-neutral-200 mt-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <Truck className="w-5 h-5 text-neutral-800" strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-600">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <RefreshCcw className="w-5 h-5 text-neutral-800" strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-600">Free Returns</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <ShieldCheck className="w-5 h-5 text-neutral-800" strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-600">24 Month Warranty</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <Lock className="w-5 h-5 text-neutral-800" strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-600">100% Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marketing Section 1: Interchangeable Straps */}
      <section className="w-full bg-[#1A1F24] text-white mt-24 flex flex-col md:flex-row items-center overflow-hidden">
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col items-start justify-center">
          <h3 className="text-xs font-bold tracking-[0.3em] text-[#d4af37] uppercase mb-4">Interchangeable Straps</h3>
          <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">Switch It Up.</h2>
          <p className="text-sm text-neutral-400 font-medium leading-relaxed max-w-md">
            Swap your strap to match your style. Our quick release straps let you change your look in seconds, moving effortlessly from metal links to soft leather or casual mesh.
          </p>
        </div>
        <div className="w-full md:w-1/2 h-[400px] md:h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
            alt="Various watch straps"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </section>

      {/* Marketing Section 2: Water Resistance */}
      <section className="w-full bg-[#E5E9E8] text-black flex flex-col md:flex-row-reverse items-center overflow-hidden">
        <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col items-start justify-center">
          <h3 className="text-xs font-bold tracking-[0.3em] text-blue-600 uppercase mb-4">Water Resistance</h3>
          <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">Built For Life.</h2>
          <p className="text-sm text-neutral-600 font-medium leading-relaxed max-w-md mb-8">
            Engineered with a 5 ATM water resistance rating. Designed to withstand splashes, light rain, and brief immersion like showering or casual swimming.
          </p>
          <div className="flex items-center space-x-3 bg-white px-6 py-4 rounded-sm shadow-sm">
            <span className="text-lg font-bold text-blue-900">5 ATM</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">Rating</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[400px] md:h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80"
            alt="Woman relaxing in bathtub"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Technical Specifications Accordion / List */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mt-24 mb-24">
        <h3 className="text-xl font-bold tracking-wide uppercase font-serif border-b border-neutral-200 pb-4 mb-8 text-center">
          Technical Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="flex justify-between border-b border-neutral-100 py-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">Case Size</span>
            <span className="text-xs font-semibold text-black">24 mm</span>
          </div>
          <div className="flex justify-between border-b border-neutral-100 py-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">Case Thickness</span>
            <span className="text-xs font-semibold text-black">6 mm</span>
          </div>
          <div className="flex justify-between border-b border-neutral-100 py-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">Strap Material</span>
            <span className="text-xs font-semibold text-black">Link, Mesh, Leather, Silicone</span>
          </div>
          <div className="flex justify-between border-b border-neutral-100 py-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">Water Resistance</span>
            <span className="text-xs font-semibold text-black">5 ATM</span>
          </div>
          <div className="flex justify-between border-b border-neutral-100 py-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">Glass</span>
            <span className="text-xs font-semibold text-black">Hardened Mineral Crystal</span>
          </div>
          <div className="flex justify-between border-b border-neutral-100 py-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">Movement</span>
            <span className="text-xs font-semibold text-black">Miyota Quartz</span>
          </div>
        </div>
      </section>
    </div>
  );
}

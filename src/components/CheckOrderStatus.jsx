import React, { useState } from "react";

export default function CheckOrderStatus() {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Check order status:", { orderNumber, orderEmail, zipCode });
    // In a real app, this would make an API call
    alert(`Checking status for Order: ${orderNumber}`);
  };

  return (
    <div className="bg-white p-8 md:p-12 shadow-lg h-full flex flex-col justify-center">
      <h2 className="text-3xl font-serif text-center mb-4 tracking-wide uppercase">
        Check Order
      </h2>
      <p className="text-xs text-neutral-600 mb-8 text-center leading-relaxed">
        For orders within the US, use the form below to track your order. For international orders, you can track your order here: <a href="#" className="underline font-bold text-black hover:text-neutral-500 transition-colors">ESW TRACKING PORTAL</a>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            <span className="text-red-500 mr-1">*</span>Order Number
          </label>
          <input
            type="text"
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            <span className="text-red-500 mr-1">*</span>Order Email
          </label>
          <input
            type="email"
            required
            value={orderEmail}
            onChange={(e) => setOrderEmail(e.target.value)}
            className="border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-bold tracking-widest text-black uppercase">
            <span className="text-red-500 mr-1">*</span>Billing Zip Code
          </label>
          <input
            type="text"
            required
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            className="bg-[#1a1a1a] text-white px-8 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#333333] active:scale-95 transition-all rounded-sm"
          >
            Check Status
          </button>
        </div>
      </form>
    </div>
  );
}

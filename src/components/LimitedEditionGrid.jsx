import React from "react";

export default function LimitedEditionGrid({ items }) {
  return (
    <div className="w-full flex flex-col space-y-6">
      <h4 className="text-[10px] font-semibold tracking-[0.25em] text-neutral-400 uppercase select-none">
        LIMITED RUN COLLECTIONS
      </h4>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="group flex flex-col items-center bg-neutral-50/50 hover:bg-white rounded-md p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-center outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 border border-neutral-100/50"
          >
            {/* Product Thumbnail */}
            <div className="w-24 h-24 flex items-center justify-center overflow-hidden mb-4 select-none">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-104 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Product Title */}
            <h5 className="text-[9.5px] font-bold tracking-[0.18em] uppercase text-black line-clamp-2">
              {item.title}
            </h5>
          </a>
        ))}
      </div>
    </div>
  );
}

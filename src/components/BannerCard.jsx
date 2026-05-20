import React from "react";

export default function BannerCard({ image, caption, cta, href }) {
  return (
    <a
      href={href}
      className="group flex flex-col space-y-3.5 w-[260px] select-none outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 p-1"
    >
      {/* Zoomable Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-neutral-50 shadow-sm border border-neutral-100">
        <img
          src={image}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Caption & Underlined CTA */}
      <div className="flex flex-col space-y-1">
        {/* Caption in lowercase sentence case */}
        <p className="text-[11.5px] text-neutral-500 font-normal leading-relaxed lowercase first-letter:uppercase">
          {caption}
        </p>

        {/* CTA with sliding underline animation */}
        <div className="inline-flex items-center pt-0.5">
          <span className="relative text-[10px] font-bold tracking-[0.2em] uppercase text-black">
            {cta}
            <span className="absolute left-0 bottom-[-3px] w-full h-[1.2px] bg-black scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </span>
        </div>
      </div>
    </a>
  );
}

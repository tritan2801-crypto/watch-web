import React from "react";

export default function MenuColumn({ title, links }) {
  return (
    <div className="flex flex-col space-y-4">
      {/* Column Title */}
      <h4 className="text-[10px] font-semibold tracking-[0.25em] text-neutral-400 uppercase select-none">
        {title}
      </h4>

      {/* Links List */}
      <ul className="flex flex-col space-y-2.5" role="list">
        {links.map((link, index) => {
          const isOrange = link.isOrange;
          return (
            <li key={index}>
              <a
                href={link.href}
                className={`text-[11px] font-medium tracking-[0.18em] uppercase inline-block transition-transform duration-200 hover:translate-x-1 outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 ${
                  isOrange
                    ? "text-orange-500 hover:text-orange-600"
                    : "text-black hover:text-neutral-500"
                }`}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function AccordionItem({
  title,
  isOpen,
  onToggle,
  id,
  children,
  isOrange = false,
}) {
  return (
    <div className="border-b border-neutral-100 last:border-b-0 py-2">
      {/* Accordion Trigger Header */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between py-3.5 text-left text-xs font-bold tracking-[0.2em] uppercase select-none outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-sm cursor-pointer ${
          isOrange ? "text-orange-500 hover:text-orange-600" : "text-black hover:text-neutral-500"
        }`}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
        id={`accordion-trigger-${id}`}
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
            isOpen ? "transform rotate-180 text-black" : ""
          }`}
        />
      </button>

      {/* Collapsible Panel Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-panel-${id}`}
            role="region"
            aria-labelledby={`accordion-trigger-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-1 px-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

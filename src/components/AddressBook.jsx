import React from "react";

export default function AddressBook() {
  return (
    <div className="mb-24">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
        <h3 className="text-sm font-bold tracking-[0.2em] uppercase">
          Address Book
        </h3>
        <span className="hidden sm:inline-block text-neutral-300">|</span>
        <a
          href="#manage-address"
          className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 hover:text-black transition-colors underline"
        >
          Manage Addresses(0)
        </a>
      </div>

      <p className="text-xs text-neutral-500 mb-12">
        You have not yet added an address.
      </p>

      <div className="flex justify-center border-t border-neutral-200 pt-8">
        <button className="text-[10px] font-bold tracking-widest uppercase underline text-neutral-500 hover:text-black transition-colors">
          Add New
        </button>
      </div>
    </div>
  );
}

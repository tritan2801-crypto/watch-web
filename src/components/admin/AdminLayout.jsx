import React, { useState } from "react";
import ProductList from "./ProductList";
import ProductFormModal from "./ProductFormModal";

const navItems = [
  { id: "products", label: "Products" },
  { id: "orders", label: "Orders" },
  { id: "users", label: "Users" },
];

export default function AdminLayout({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState("products");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveSuccess = () => {
    handleModalClose();
    setRefreshKey((k) => k + 1);
  };

  const handleDeleteSuccess = () => {
    setRefreshKey((k) => k + 1);
  };

  const handleLogoutClick = () => {
    if (typeof onLogout === "function") {
      onLogout();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-neutral-900 font-sans antialiased overflow-hidden">
      {/* ============ SIDEBAR ============ */}
      <aside className="w-60 bg-neutral-900 text-white flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-6 pt-7 pb-5">
          <h1 className="text-base font-bold tracking-[0.3em] uppercase select-none">
            MVMT <span className="text-neutral-400 font-normal">ADMIN</span>
          </h1>
        </div>

        {/* Admin Info */}
        <div className="px-6 pb-5 border-b border-neutral-700">
          <p className="text-[13px] font-semibold truncate">
            {user?.firstName} {user?.lastName}
          </p>
          <span className="inline-block mt-1 px-2 py-0.5 bg-neutral-700 text-neutral-300 text-[9px] font-bold tracking-widest uppercase rounded-sm">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 pt-6 space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isPlaceholder = item.id !== "products";
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (!isPlaceholder) setActiveSection(item.id);
                }}
                disabled={isPlaceholder}
                className={`w-full flex items-center px-3 py-2.5 text-[12px] font-bold tracking-[0.1em] uppercase transition-colors ${
                  isActive
                    ? "bg-white text-neutral-900"
                    : isPlaceholder
                    ? "text-neutral-500 cursor-not-allowed"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {item.label}
                {isPlaceholder && (
                  <span className="ml-auto text-[7px] text-neutral-600 tracking-widest uppercase">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6 border-t border-neutral-700 pt-4">
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center px-3 py-2.5 text-[12px] font-bold tracking-[0.1em] uppercase text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-4 h-4 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* ============ MAIN CONTENT ============ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <h2 className="text-[13px] font-bold tracking-[0.15em] uppercase">
            {activeSection === "products" ? "Products" : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-neutral-400 font-medium">
              {user?.firstName} {user?.lastName}
            </span>
            <div className="w-7 h-7 bg-neutral-200 rounded-full flex items-center justify-center text-[11px] font-bold uppercase text-neutral-600">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === "products" && (
            <ProductList
              refreshKey={refreshKey}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDeleteSuccess={handleDeleteSuccess}
            />
          )}
          {activeSection !== "products" && (
            <div className="flex items-center justify-center h-full">
              <p className="text-[11px] text-neutral-400 font-bold tracking-[0.2em] uppercase">
                {activeSection} management coming soon
              </p>
            </div>
          )}
        </main>
      </div>

      {/* ============ MODAL ============ */}
      {modalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={handleModalClose}
          onSave={handleSaveSuccess}
        />
      )}
    </div>
  );
}

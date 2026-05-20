import React, { useState, useEffect } from "react";
import { api } from "../../api/dbService";

const defaultForm = {
  name: "",
  price: "",
  activeImage: "",
  activeVariantName: "",
  category: "",
};

export default function ProductFormModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const isEditing = Boolean(product);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price?.toString() || "",
        activeImage: product.activeImage || "",
        activeVariantName: product.activeVariantName || "",
        category: product.category || "",
      });
    } else {
      setForm(defaultForm);
    }
  }, [product]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setSaving(true);
    try {
      if (isEditing) {
        await api.updateProduct(product.id, form);
      } else {
        await api.createProduct(form);
      }
      onSave();
    } catch {
      alert("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white w-full max-w-lg shadow-xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-[13px] font-bold tracking-[0.1em] uppercase">
              {isEditing ? "Edit Product" : "Add Product"}
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500 mb-1.5">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-neutral-900 transition-colors"
                  placeholder="Enter product name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500 mb-1.5">
                    Price ($) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-neutral-900 transition-colors"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-neutral-900 transition-colors"
                    placeholder="e.g. Watches"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500 mb-1.5">
                  Image URL
                </label>
                <input
                  type="text"
                  name="activeImage"
                  value={form.activeImage}
                  onChange={handleChange}
                  className="w-full border border-gray-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-neutral-900 transition-colors"
                  placeholder="https://..."
                />
                {form.activeImage && (
                  <div className="mt-2">
                    <img
                      src={form.activeImage}
                      alt="Preview"
                      className="w-14 h-16 object-cover border border-gray-200 bg-neutral-50 rounded-sm"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500 mb-1.5">
                  Active Variant Name
                </label>
                <input
                  type="text"
                  name="activeVariantName"
                  value={form.activeVariantName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-neutral-900 transition-colors"
                  placeholder="e.g. Gold Navy Leather"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-300 text-neutral-600 hover:bg-gray-50 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-neutral-900 text-white hover:bg-neutral-800 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

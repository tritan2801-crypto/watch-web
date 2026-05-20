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
  const [imageSource, setImageSource] = useState("url"); // 'url' | 'file'
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
      if (product.activeImage && product.activeImage.startsWith("data:")) {
        setImageSource("file");
      } else {
        setImageSource("url");
      }
    } else {
      setForm(defaultForm);
      setImageSource("url");
    }
  }, [product]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Vui lòng tải lên tệp hình ảnh hợp lệ (PNG, JPG, JPEG, WEBP...)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setForm((prev) => ({ ...prev, activeImage: event.target.result }));
    };
    reader.readAsDataURL(file);
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
                  Product Image
                </label>
                
                {/* Tabs to select URL or File Upload */}
                <div className="flex border-b border-gray-200 mb-3 text-[10px] font-bold tracking-wider uppercase">
                  <button
                    type="button"
                    onClick={() => setImageSource("url")}
                    className={`pb-2 pr-4 border-b-2 transition-colors cursor-pointer ${
                      imageSource === "url"
                        ? "border-neutral-900 text-neutral-900"
                        : "border-transparent text-neutral-400 hover:text-neutral-600"
                    }`}
                  >
                    Image URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSource("file")}
                    className={`pb-2 px-4 border-b-2 transition-colors cursor-pointer ${
                      imageSource === "file"
                        ? "border-neutral-900 text-neutral-900"
                        : "border-transparent text-neutral-400 hover:text-neutral-600"
                    }`}
                  >
                    Upload File
                  </button>
                </div>

                {imageSource === "url" ? (
                  <input
                    type="text"
                    name="activeImage"
                    value={form.activeImage}
                    onChange={handleChange}
                    className="w-full border border-gray-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-neutral-900 transition-colors"
                    placeholder="https://example.com/image.jpg"
                  />
                ) : (
                  <div className="relative">
                    <div className="border-2 border-dashed border-gray-300 hover:border-neutral-400 transition-colors rounded-sm p-4 flex flex-col items-center justify-center cursor-pointer bg-gray-50/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-neutral-400 mb-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>
                      <span className="text-xs text-neutral-600 font-semibold mb-0.5">
                        Click to upload image file
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Supports PNG, JPG, JPEG, WEBP
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {form.activeImage && (
                  <div className="mt-3 flex items-center space-x-3 bg-neutral-50 border border-neutral-100 p-2 rounded-sm">
                    <img
                      src={form.activeImage}
                      alt="Preview"
                      className="w-10 h-12 object-cover border border-gray-200 bg-white rounded-sm flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                        Selected Image
                      </p>
                      <p className="text-[11px] text-neutral-400 truncate max-w-xs">
                        {form.activeImage.startsWith("data:")
                          ? "Base64 Uploaded File"
                          : form.activeImage}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, activeImage: "" }))}
                      className="p-1 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.8"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
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

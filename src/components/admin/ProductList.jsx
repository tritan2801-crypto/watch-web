import React, { useEffect, useState } from "react";
import { api } from "../../api/dbService";

export default function ProductList({ refreshKey, onAdd, onEdit, onDeleteSuccess }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.deleteProduct(id);
      onDeleteSuccess();
    } catch {
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-400">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold tracking-tight">Products</h1>
          <p className="text-[11px] text-neutral-500 mt-0.5">
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors flex items-center space-x-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add New Product</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500">Image</th>
              <th className="px-4 py-3 text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500">ID</th>
              <th className="px-4 py-3 text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500">Name</th>
              <th className="px-4 py-3 text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500">Price</th>
              <th className="px-4 py-3 text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500">Category</th>
              <th className="px-4 py-3 text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-bold">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <img
                      src={product.activeImage}
                      alt={product.name}
                      className="w-10 h-12 object-cover bg-neutral-100 border border-gray-200 rounded-sm"
                    />
                  </td>
                  <td className="px-4 py-3 text-[11px] font-mono text-neutral-500">{product.id}</td>
                  <td className="px-4 py-3 text-[13px] font-semibold">{product.name}</td>
                  <td className="px-4 py-3 text-[13px] font-semibold">${Number(product.price).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] text-neutral-500 font-medium">
                      {product.category || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-sm transition-colors"
                        title="Edit product"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                        title="Delete product"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

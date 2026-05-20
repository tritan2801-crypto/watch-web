import React from "react";

export default function RecentOrders({ orders = [] }) {
  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
        <h3 className="text-sm font-bold tracking-[0.2em] uppercase">
          Recent Orders
        </h3>
        <span className="hidden sm:inline-block text-neutral-300">|</span>
        <a
          href="#orders"
          className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 hover:text-black transition-colors underline"
        >
          View All Orders
        </a>
      </div>

      {orders.length === 0 ? (
        <p className="text-xs text-neutral-500">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-neutral-200 p-4">
              <p className="text-sm font-bold">Order #{order.id}</p>
              <p className="text-xs text-neutral-500">Date: {order.date}</p>
              <p className="text-xs text-neutral-500">Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

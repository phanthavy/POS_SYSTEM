"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatLAK } from "../lib/format";
import PaymentModal from "../components/PaymentModal";

function Order() {
  const { orders, updateOrderStatus, payOrder } = useCart();
  const activeOrders = orders.filter((o) => o.status !== "paid");
  const [payingId, setPayingId] = useState<number | null>(null);
  const payingOrder = orders.find((o) => o.id === payingId);

  return (
    <div className="p-3 md:p-4">
      <h2 className="text-lg font-semibold mb-4 text-[#006948]">Orders</h2>
      {activeOrders.length === 0 && (
        <p className="text-gray-400">No orders yet</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {activeOrders.map((order) => (
          <div
            key={order.id}
            className="border-2 border-[#BCCAC0] rounded-xl p-4"
          >
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Order #{order.id}</span>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-[#ADEDD3] text-[#006948]"
                }`}
              >
                {order.status}
              </span>
              {order.table && (
                <span className="text-sm text-gray-600">{order.table}</span>
              )}
            </div>

            <ul className="my-3 text-sm">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.qty}
                  </span>
                  <span className="font-mono">
                    {formatLAK(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between font-semibold border-t pt-2 mb-3">
              <span>Total</span>
              <span className="text-[#006948] font-mono">
                {formatLAK(order.total)}
              </span>
            </div>

            <div className="flex gap-2">
              {order.status === "pending" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "served")}
                  className="flex-1 border-2 border-[#006948] text-[#006948] py-2 md:py-1 rounded-lg"
                >
                  Served
                </button>
              )}
              <button
                onClick={() => setPayingId(order.id)}
                className="flex-1 bg-[#006948] text-white py-2 md:py-1 rounded-lg"
              >
                Pay
              </button>
            </div>
          </div>
        ))}
      </div>

      {payingOrder && (
        <PaymentModal
          order={payingOrder}
          onClose={() => setPayingId(null)}
          onConfirm={(method, received) => {
            payOrder(payingOrder.id, method, received);
            setPayingId(null);
          }}
        />
      )}
    </div>
  );
}
export default Order;

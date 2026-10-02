"use client";

import { Fragment, useState } from "react";
import { useCart } from "../context/CartContext";
import { formatDateTime, formatLAK } from "../lib/format";

function History() {
  const { orders } = useCart();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const paidOrders = orders
    .filter((o) => o.status === "paid")
    .sort(
      (a, b) =>
        new Date(b.payment?.paidAt ?? b.createdAt).getTime() -
        new Date(a.payment?.paidAt ?? a.createdAt).getTime(),
    );

  return (
    <div className="p-3 md:p-4 flex-1 min-w-0">
      <h2 className="text-lg font-semibold mb-4 text-[#006948]">History</h2>
      {paidOrders.length === 0 && (
        <p className="text-gray-400">No paid orders yet</p>
      )}

      {paidOrders.length > 0 && (
        <div className="overflow-x-auto border-2 border-[#BCCAC0] rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-[#F2F3FF] text-left">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Table / Customer</th>
                <th className="p-3">Paid at</th>
                <th className="p-3 hidden sm:table-cell">Items</th>
                <th className="p-3 hidden sm:table-cell">Method</th>
                <th className="p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {paidOrders.map((order) => (
                <Fragment key={order.id}>
                  <tr
                    onClick={() =>
                      setExpandedId(expandedId === order.id ? null : order.id)
                    }
                    className="border-t border-[#BCCAC0] cursor-pointer hover:bg-[#F2F3FF]"
                  >
                    <td className="p-3 font-semibold">#{order.id}</td>
                    <td className="p-3">{order.table || "-"}</td>
                    <td className="p-3">
                      {formatDateTime(order.payment?.paidAt ?? order.createdAt)}
                    </td>
                    <td className="p-3 hidden sm:table-cell">
                      {order.items.reduce((sum, i) => sum + i.qty, 0)}
                    </td>
                    <td className="p-3 capitalize hidden sm:table-cell">
                      {order.payment?.method ?? "-"}
                    </td>
                    <td className="p-3 text-right font-mono text-[#006948]">
                      {formatLAK(order.total)}
                    </td>
                  </tr>
                  {expandedId === order.id && (
                    <tr className="bg-[#F9FAFF]">
                      <td colSpan={6} className="p-3">
                        <ul className="mb-2">
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
                        <p className="text-gray-500 capitalize sm:hidden mb-1">
                          Method: {order.payment?.method ?? "-"}
                        </p>
                        {order.payment?.method === "cash" && (
                          <div className="text-gray-500 flex flex-wrap gap-x-6">
                            <span>
                              Received: {formatLAK(order.payment.received)}
                            </span>
                            <span>
                              Change: {formatLAK(order.payment.change)}
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default History;

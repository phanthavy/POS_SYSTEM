"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatLAK } from "../lib/format";

type Range = "today" | "all";

const isToday = (iso: string) =>
  new Date(iso).toDateString() === new Date().toDateString();

function Stats() {
  const { orders } = useCart();
  const [range, setRange] = useState<Range>("today");

  const paidOrders = orders.filter(
    (o) =>
      o.status === "paid" &&
      (range === "all" || isToday(o.payment?.paidAt ?? o.createdAt)),
  );

  const revenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
  const average = paidOrders.length ? revenue / paidOrders.length : 0;
  const cashTotal = paidOrders
    .filter((o) => o.payment?.method === "cash")
    .reduce((sum, o) => sum + o.total, 0);
  const transferTotal = revenue - cashTotal;
  const openOrders = orders.filter((o) => o.status !== "paid").length;

  const itemSales = new Map<string, { qty: number; revenue: number }>();
  for (const order of paidOrders) {
    for (const item of order.items) {
      const current = itemSales.get(item.name) ?? { qty: 0, revenue: 0 };
      itemSales.set(item.name, {
        qty: current.qty + item.qty,
        revenue: current.revenue + item.price * item.qty,
      });
    }
  }
  const topItems = [...itemSales.entries()]
    .sort((a, b) => b[1].qty - a[1].qty)
    .slice(0, 5);
  const maxQty = topItems[0]?.[1].qty ?? 0;

  const cards = [
    { label: "Revenue", value: formatLAK(revenue) },
    { label: "Paid orders", value: paidOrders.length.toString() },
    { label: "Average order", value: formatLAK(Math.round(average)) },
    { label: "Open orders", value: openOrders.toString() },
  ];

  return (
    <div className="p-3 md:p-4 flex-1 min-w-0">
      <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#006948]">Stats</h2>
        <div className="flex gap-2">
          {(["today", "all"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1 rounded-full border-2 border-[#BCCAC0] ${
                range === r ? "bg-[#006948] text-white" : ""
              }`}
            >
              {r === "today" ? "Today" : "All time"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="border-2 border-[#BCCAC0] rounded-xl p-4"
          >
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-lg md:text-2xl font-semibold font-mono text-[#006948] mt-1 break-all">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border-2 border-[#BCCAC0] rounded-xl p-4">
          <h3 className="font-semibold mb-3">Top selling items</h3>
          {topItems.length === 0 && (
            <p className="text-gray-400 text-sm">No sales yet</p>
          )}
          <ul className="flex flex-col gap-3">
            {topItems.map(([name, data]) => (
              <li key={name} className="text-sm">
                <div className="flex justify-between gap-2 mb-1">
                  <span className="truncate">{name}</span>
                  <span className="text-gray-500">
                    {data.qty} sold · {formatLAK(data.revenue)}
                  </span>
                </div>
                <div className="h-2 bg-[#E2E7FF] rounded-full">
                  <div
                    className="h-2 bg-[#006948] rounded-full"
                    style={{ width: `${(data.qty / maxQty) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-2 border-[#BCCAC0] rounded-xl p-4">
          <h3 className="font-semibold mb-3">Payment methods</h3>
          {[
            { label: "Cash", amount: cashTotal },
            { label: "Transfer", amount: transferTotal },
          ].map((m) => (
            <div key={m.label} className="text-sm mb-3">
              <div className="flex justify-between mb-1">
                <span>{m.label}</span>
                <span className="font-mono">{formatLAK(m.amount)}</span>
              </div>
              <div className="h-2 bg-[#E2E7FF] rounded-full">
                <div
                  className="h-2 bg-[#006948] rounded-full"
                  style={{
                    width: `${revenue ? (m.amount / revenue) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Stats;

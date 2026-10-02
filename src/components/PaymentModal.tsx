"use client";

import { useState } from "react";
import { Order, PaymentMethod } from "../context/CartContext";
import { formatLAK } from "../lib/format";

type PaymentModalProps = {
  order: Order;
  onConfirm: (method: PaymentMethod, received: number) => void;
  onClose: () => void;
};

export default function PaymentModal({
  order,
  onConfirm,
  onClose,
}: Readonly<PaymentModalProps>) {
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [receivedText, setReceivedText] = useState("");

  const received = method === "cash" ? Number(receivedText) || 0 : order.total;
  const change = received - order.total;
  const canConfirm = method === "transfer" || received >= order.total;

  const quickAmounts = [order.total, 50000, 100000, 200000, 500000].filter(
    (amount, i, arr) => amount >= order.total && arr.indexOf(amount) === i,
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 w-full sm:max-w-md max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-[#006948] mb-1">
          Payment - Order #{order.id}
        </h3>
        {order.table && (
          <p className="text-sm text-gray-500 mb-3">{order.table}</p>
        )}

        <div className="flex justify-between font-semibold text-xl my-4">
          <span>Total</span>
          <span className="font-mono text-[#006948]">
            {formatLAK(order.total)}
          </span>
        </div>

        <div className="flex gap-2 mb-4">
          {(["cash", "transfer"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 py-2 rounded-lg border-2 capitalize ${
                method === m
                  ? "bg-[#006948] text-white border-[#006948]"
                  : "border-[#BCCAC0]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {method === "cash" && (
          <>
            <label className="text-sm text-gray-600">Cash received</label>
            <input
              type="number"
              min={0}
              autoFocus
              value={receivedText}
              onChange={(e) => setReceivedText(e.target.value)}
              className="w-full bg-[#F2F3FF] rounded-lg py-2 px-3 border-2 border-[#BCCAC0] font-mono mt-1 mb-2 outline-none focus:border-[#006948]"
            />
            <div className="flex flex-wrap gap-2 mb-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setReceivedText(String(amount))}
                  className="text-xs px-3 py-1 rounded-full bg-[#ADEDD3] text-[#006948]"
                >
                  {amount === order.total ? "Exact" : formatLAK(amount)}
                </button>
              ))}
            </div>
            <div className="flex justify-between mb-4">
              <span>Change</span>
              <span
                className={`font-mono font-semibold ${
                  change < 0 ? "text-red-500" : "text-[#006948]"
                }`}
              >
                {change < 0 ? "Not enough" : formatLAK(change)}
              </span>
            </div>
          </>
        )}

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border-2 border-[#BCCAC0] py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(method, received)}
            disabled={!canConfirm}
            className="flex-1 bg-[#006948] text-white py-2 rounded-lg disabled:opacity-50"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}

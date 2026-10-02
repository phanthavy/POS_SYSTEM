"use client";

import { TbTrash } from "react-icons/tb";
import { PiPlus } from "react-icons/pi";
import { BiMinus } from "react-icons/bi";
import { FaCheckCircle, FaShoppingBasket } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { formatLAK } from "../lib/format";

function SidebarOrder() {
  const { cart, addByOne, removeByOne, removeAll, placeOrder } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const [showToast, setShowToast] = useState(false);
  const [table, setTable] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 2000);
    return () => clearTimeout(timer);
  }, [showToast]);

  useEffect(() => {
    if (!sheetOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [sheetOpen]);

  const handlePlaceOrder = () => {
    placeOrder(table);
    setTable("");
    setSheetOpen(false);
    setShowToast(true);
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-60 flex items-center gap-2 bg-[#006948] text-white px-5 py-3 rounded-xl shadow-lg whitespace-nowrap">
          <FaCheckCircle />
          <span>Order placed successfully!</span>
        </div>
      )}

      {cart.length > 0 && !sheetOpen && (
        <button
          onClick={() => setSheetOpen(true)}
          className="lg:hidden fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] md:bottom-4 z-30 flex items-center gap-3 bg-[#006948] text-white pl-3 pr-4 py-3 rounded-2xl shadow-lg active:scale-[0.98] transition-transform"
        >
          <span className="relative bg-white/20 p-2 rounded-xl">
            <FaShoppingBasket />
            <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-white text-[#006948] text-xs font-bold">
              {itemCount}
            </span>
          </span>
          <span className="flex-1 text-left font-semibold">View order</span>
          <span className="font-mono font-semibold">{formatLAK(total)}</span>
        </button>
      )}

      {sheetOpen && (
        <div
          onClick={() => setSheetOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/40"
        />
      )}

      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] flex flex-col bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ${sheetOpen ? "translate-y-0" : "translate-y-full"} lg:static lg:z-auto lg:max-h-none lg:translate-y-0 lg:rounded-none lg:shadow-none lg:bg-transparent lg:w-96 xl:w-120 lg:shrink-0 lg:border-l-2 border-[#BCCAC0]`}
      >
        <div className="lg:hidden flex justify-center pt-3">
          <div className="w-10 h-1.5 rounded-full bg-gray-300" />
        </div>

        <div className="flex justify-between items-center px-4 pt-3 lg:pt-4 pb-3">
          <h2 className="text-lg font-semibold text-[#006948]">
            Current Order
            {itemCount > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({itemCount} items)
              </span>
            )}
          </h2>
          <button
            onClick={() => setSheetOpen(false)}
            className="lg:hidden p-1 text-2xl text-gray-500"
            aria-label="Close"
          >
            <IoClose />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-4">
          {cart.length === 0 && (
            <p className="text-gray-400 py-6 text-center">No items yet</p>
          )}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 py-3 border-b border-[#E2E7FF]"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-sm font-mono text-[#006948]">
                  {formatLAK(item.price * item.qty)}
                </p>
              </div>

              <div className="flex items-center rounded-full border-2 border-[#BCCAC0]">
                <button
                  onClick={() => removeByOne(item.id)}
                  className="p-2 text-[#3D4A42]"
                  aria-label="Decrease"
                >
                  <BiMinus />
                </button>
                <span className="w-6 text-center font-semibold">
                  {item.qty}
                </span>
                <button
                  onClick={() => addByOne(item.id)}
                  className="p-2 text-[#006948]"
                  aria-label="Increase"
                >
                  <PiPlus />
                </button>
              </div>

              <button
                onClick={() => removeAll(item.id)}
                className="p-2 text-red-500"
                aria-label="Remove"
              >
                <TbTrash size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-[#BCCAC0] px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] lg:pb-4">
          <input
            value={table}
            onChange={(e) => setTable(e.target.value)}
            placeholder="Table no. / Customer name (optional)"
            className="w-full bg-[#F2F3FF] rounded-lg py-2 px-3 border-2 border-[#BCCAC0] text-base lg:text-sm mb-3 outline-none focus:border-[#006948]"
          />
          <div className="flex justify-between font-semibold mb-3">
            <span>Total</span>
            <span className="text-[#006948] font-mono">
              {formatLAK(total)}
            </span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={cart.length === 0}
            className="w-full bg-[#006948] text-white py-3 lg:py-2 rounded-xl lg:rounded-lg font-semibold disabled:opacity-50"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
export default SidebarOrder;

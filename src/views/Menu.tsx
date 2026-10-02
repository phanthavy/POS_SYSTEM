"use client";

import { MdLocalDrink, MdSoupKitchen } from "react-icons/md";
import { GiBarbecue, GiSalamander } from "react-icons/gi";
import { FiPlus } from "react-icons/fi";
import { IoFastFoodOutline } from "react-icons/io5";
import { useState } from "react";
import FriedchickenTendon from "../../public/Fried-chicken-tendon.jpg";
import FriedYellowTendon from "../../public/FriedYellowTendon.jpg";
import PapayaSalad from "../../public/PapayaSalad.jpg";
import ThaiPlaPao from "../../public/Thai-Pla-Pao.webp";
import grilledChicken from "../../public/grilledChicken.jpg";
import Laobeer from "../../public/Laobeer.jpg";
import TomYumKung from "../../public/TomYumKung.jpg";
import frenchfries from "../../public/frenchfries.jpg";
import carlsberg from "../../public/Carlsberg.jpg";
import jinro from "../../public/jinro.jpg";
import Image from "next/image";
import { useCart } from "../context/CartContext";

const mockCategories = [
  { name: "Drink", icon: <MdLocalDrink /> },
  { name: "Fried", icon: <IoFastFoodOutline /> },
  { name: "Soup", icon: <MdSoupKitchen /> },
  { name: "Grilled", icon: <GiBarbecue /> },
  { name: "Salad", icon: <GiSalamander /> },
];

const mockProducts = [
  {
    id: 1,
    name: "Lao beer",
    price: 25000,
    category: "Drink",
    img: Laobeer,
  },
  {
    id: 2,
    name: "Fried French fries",
    price: 35000,
    category: "Fried",
    img: frenchfries,
  },
  {
    id: 3,
    name: "spicy prawn soup",
    price: 30000,
    category: "Soup",
    img: TomYumKung,
  },
  {
    id: 4,
    name: "Fried chicken tendon",
    price: 45000,
    category: "Fried",
    img: FriedchickenTendon,
  },
  {
    id: 5,
    name: "Fried yellow tendon",
    price: 30000,
    category: "Fried",
    img: FriedYellowTendon,
  },
  {
    id: 6,
    name: "Grilled chicken",
    price: 30000,
    category: "Grilled",
    img: grilledChicken,
  },
  {
    id: 7,
    name: "Grilled fish",
    price: 30000,
    category: "Grilled",
    img: ThaiPlaPao,
  },
  {
    id: 8,
    name: "Papaya salad",
    price: 30000,
    category: "Salad",
    img: PapayaSalad,
  },
  {
    id: 9,
    name: "Carlsberg",
    price: 30000,
    category: "Drink",
    img: carlsberg,
  },
  {
    id: 10,
    name: "Jinro",
    price: 30000,
    category: "Drink",
    img: jinro,
  },
];

function Menu() {
  const [actived, setActived] = useState("all");
  const { cart, addToCart } = useCart();

  const filtered =
    actived === "all"
      ? mockProducts
      : mockProducts.filter((items) => items.category === actived);

  const formatLAK = (amount: number) => {
    return amount.toLocaleString("en-US") + " ₭";
  };

  return (
    // padding
    <div className="p-3 md:p-4 pb-28 lg:pb-4">
      {/* cate buttons */}
      <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
        <button
          onClick={() => setActived("all")}
          className={`${actived === "all" ? "bg-[#006948] text-[#ffffff]" : ""} shrink-0 flex gap-2 items-center border-2 border-[#BCCAC0] px-4 py-1 rounded-full`}
        >
          All
        </button>
        {mockCategories.map((cate) => (
          <button
            key={cate.name}
            className={`${actived === cate.name ? "bg-[#006948] text-[#ffffff]" : ""} shrink-0 flex gap-2 items-center border-2 border-[#BCCAC0] px-4 py-1 rounded-full`}
            onClick={() => setActived(cate.name)}
          >
            <span>{cate.icon}</span>
            <span>{cate.name}</span>
          </button>
        ))}
      </div>
      {/* display cate by filter */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 mt-4 md:mt-6">
        {filtered.map((items) => {
          const qtyInCart = cart.find((c) => c.id === items.id)?.qty ?? 0;
          return (
            <div
              key={items.id}
              className={`relative rounded-xl bg-[#FFFFFF] border p-2 hover:shadow-sm hover:shadow-green-500 transition duration-500 ${qtyInCart > 0 ? "border-[#006948]" : "border-[#BCCAC0]"}`}
            >
              {qtyInCart > 0 && (
                <span className="absolute top-3 right-3 z-10 min-w-7 h-7 px-2 flex items-center justify-center rounded-full bg-[#006948] text-white text-sm font-semibold shadow">
                  {qtyInCart}
                </span>
              )}
              <Image
                src={items.img}
                alt={items.name}
                className="h-32 sm:h-44 md:h-60 w-full object-cover rounded-xl mb-2"
                loading="eager"
              />

              <h1 className="text-sm md:text-base truncate">{items.name}</h1>
              <div className="w-full h-px bg-[#E2E7FF] rounded-full my-2" />
              <div className="flex justify-between items-center">
                <p className="text-[#006948] font-mono font-semibold text-sm md:text-base">
                  {formatLAK(items.price)}
                </p>
                <button
                  className="bg-[#ADEDD3] p-2 md:p-1 rounded-md shadow active:scale-95 transition-transform"
                  onClick={() => addToCart(items)}
                >
                  <FiPlus color="#006948" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Menu;

"use client";
import { FaStore, FaHistory } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { IoIosStats } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";

const sidebarLinks = [
  { name: "Product", href: "/menu", icon: <FaStore /> },
  { name: "Orders", href: "/orders", icon: <BiSolidFoodMenu /> },
  { name: "History", href: "/history", icon: <FaHistory /> },
  { name: "Stats", href: "/stats", icon: <IoIosStats /> },
];

function Sidebar() {
  const [active, setActive] = useState("Product");

  return (
    <div className="w-30 border-r-2 border-[#BCCAC0] py-6 px-2">
      {sidebarLinks.map((l) => (
        <Link
          key={l.name}
          href={l.href}
          className={`flex flex-col justify-center items-center mb-8 `}
          onClick={() => {
            setActive(l.name);
          }}
        >
          <span
            className={`text-[25px] text-[#3D4A42] p-4 rounded-xl hover:text-[#006948] transition-colors duration-300 ${active === l.name ? "bg-[#ADEDD3] text-[#006948]" : ""}`}
          >
            {l.icon}
          </span>
          <span className="mb-2 text-sm">{l.name}</span>
          {active === l.name && (
            <div className="w-12 h-0.5 rounded-full bg-[#006948]" />
          )}
        </Link>
      ))}
    </div>
  );
}
export default Sidebar;

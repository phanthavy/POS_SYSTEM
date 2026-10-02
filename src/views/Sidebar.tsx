"use client";
import { FaStore, FaHistory } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { IoIosStats } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { name: "Product", href: "/menu", icon: <FaStore /> },
  { name: "Orders", href: "/orders", icon: <BiSolidFoodMenu /> },
  { name: "History", href: "/history", icon: <FaHistory /> },
  { name: "Stats", href: "/stats", icon: <IoIosStats /> },
];

function Sidebar() {
  const pathname = usePathname();
  const active = sidebarLinks.find((l) => pathname.startsWith(l.href))?.name;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 h-[calc(4rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-white border-t-2 border-[#BCCAC0] flex justify-around items-center md:static md:h-auto md:w-30 md:shrink-0 md:flex-col md:justify-start md:border-t-0 md:border-r-2 md:py-6 md:px-2">
      {sidebarLinks.map((l) => (
        <Link
          key={l.name}
          href={l.href}
          className={`flex flex-col justify-center items-center md:mb-8 `}
        >
          <span
            className={`text-xl md:text-[25px] text-[#3D4A42] px-4 py-1 md:p-4 rounded-xl hover:text-[#006948] transition-colors duration-300 ${active === l.name ? "bg-[#ADEDD3] text-[#006948]" : ""}`}
          >
            {l.icon}
          </span>
          <span className="text-xs md:text-sm md:mb-2">{l.name}</span>
          {active === l.name && (
            <div className="hidden md:block w-12 h-0.5 rounded-full bg-[#006948]" />
          )}
        </Link>
      ))}
    </div>
  );
}
export default Sidebar;

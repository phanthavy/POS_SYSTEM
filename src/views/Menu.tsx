import { IoIosCafe } from "react-icons/io";
import { MdBakeryDining } from "react-icons/md";
import { GiButterToast } from "react-icons/gi";
import { LuIceCreamBowl } from "react-icons/lu";

const mockCategories = [
  { name: "Espresso & Coffee", icon: <IoIosCafe /> },
  { name: "Artisan", icon: <MdBakeryDining /> },
  { name: "Bowls & Toast", icon: <GiButterToast /> },
  { name: "Treats", icon: <LuIceCreamBowl /> },
];

function Menu() {


  return (
    <div className="p-4">
      <div className="flex gap-4">
        {mockCategories.map((cate) => (
          <button
            key={cate.name}
            className="flex gap-2 items-center bg-[#F2F3FF] border-2 border-[#BCCAC0] px-4 py-1 rounded-full"
          >  
            <span>{cate.icon}</span>
            <span>{cate.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
export default Menu;

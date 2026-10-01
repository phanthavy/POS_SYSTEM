import Input from "../components/Input";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";

export default function Navbar() {
  return (
    <div className="flex justify-between px-4 py-2 items-center bg-[#FFFFFF] border-b-2 border-[#BCCAC0] h-16">
      {/*  */}
      <div>
        <h1 className="font-bold text-[#006948] text-xl">POS SYSTEM</h1>
        <h1 className="text-[#6D7A72] text-[12px]">Artisan Bakery & Café</h1>
      </div>
      {/*  */}
      <div>
        <Input
          placehodler="search..."
          className="outline-none hover:border-[#6D7A72] focus:border-[#6D7A72] transition-colors duration-150"
        >
          <span className="flex items-center gap-2 rounded-full px-2 hover:bg-[#f7fffa] active:scale-101 cursor-pointer">
            <MdOutlineQrCodeScanner />
            <p>scan</p>
          </span>
        </Input>
      </div>
      {/*  */}
      <div className="h-full flex gap-4">
        <button className=" flex items-center gap-2 rounded-full border-2 border-[#9f1919] px-2 active:scale-101 cursor-pointer bg-[#BA1A1A]">
          <CiLogout className="text-white" />
          <p className="text-[12px] text-[#ffffff] font-semibold">Clock out</p>
        </button>

        <button className=" flex items-center gap-2 rounded-full bg-[#F2F3FF] border-2 border-[#BCCAC0] px-2 active:scale-101 cursor-pointer">
          <p className="text-[12px] text-[#6D7A72] font-semibold">
            Shift: 8am - 5pm
          </p>
          <CgProfile size={25} className="text-[#6D7A72]" />
        </button>
      </div>
    </div>
  );
}

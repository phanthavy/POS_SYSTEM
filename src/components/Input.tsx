import { ReactNode } from "react";

type InputProps = {
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  placehodler?: string;
};

export default function Input({
  className = "",
  children,
  disabled = false,
  placehodler = "",
  ...props
}: Readonly<InputProps>) {
  return (
    <div className="relative">
      {children && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#FFFFFF] border border-[#BCCAC0] text-[#006948] rounded-full">
          {children}
        </span>
      )}
      <input
        {...props}
        className={`${className} w-xl bg-[#F2F3FF] rounded-full py-2 px-6 border-2 border-[#BCCAC0]`}
        disabled={disabled}
        placeholder={placehodler}
      />
    </div>
  );
}

import { Props } from "@/types/props";
import React from "react";

const SubmitButton = ({ children }: Props) => {
  return (
    <button
      className="h-[35px] rounded text-red-300 font-bold bg-[#fcf5f2] mb-2 border border-[#f2c8c5]"
      style={{ boxShadow: "0px 1px 1px 0 rgba(0,0,0,0.2)" }}
    >
      {children}
    </button>
  );
};

export default SubmitButton;

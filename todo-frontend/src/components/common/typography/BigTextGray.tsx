import React from "react";

interface BigTextGrayProps {
  children: React.ReactNode;
}

const BigTextGray = ({ children }: BigTextGrayProps) => {
  return (
    <p className="text-base font-bold text-left text-[#a8a8a5]">{children}</p>
  );
};

export default BigTextGray;

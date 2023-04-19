import React from "react";

interface BigTextProps {
  children: React.ReactNode;
  className: string;
}

const BigText = ({ children, className }: BigTextProps) => {
  return (
    <p className={`${className} text-base font-bold text-left text-black`}>
      {children}
    </p>
  );
};

export default BigText;

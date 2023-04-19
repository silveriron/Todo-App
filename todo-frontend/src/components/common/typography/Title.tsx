import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <h1 className="text-[40px] font-bold text-left text-black">{children}</h1>
  );
};

export default Title;

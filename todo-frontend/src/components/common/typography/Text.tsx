import React from "react";

interface TextProps {
  children: React.ReactNode;
}

const Text = ({ children }: TextProps) => {
  return <p className="text-sm text-left text-black">{children}</p>;
};

export default Text;

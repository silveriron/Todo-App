import { Props } from "@/types/props";
import Link from "next/link";
import React from "react";

interface LinkButtonProps extends Props {
  href: string;
}

const LinkButton = ({ children, href }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className="text-center font-bold mx-auto border-b w-15 text-gray hover:text-red-300 hover:border-red-300"
    >
      {children}
    </Link>
  );
};

export default LinkButton;

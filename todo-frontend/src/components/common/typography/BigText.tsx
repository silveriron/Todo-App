import { Props } from "@/types/props";

const BigText = ({ children, className }: Props) => {
  return (
    <p className={`${className} text-base font-bold text-left text-black`}>
      {children}
    </p>
  );
};

export default BigText;

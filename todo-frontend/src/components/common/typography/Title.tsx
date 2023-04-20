import { Props } from "@/types/props";

const Title = ({ children, className }: Props) => {
  return (
    <h1 className={`${className} text-[40px] font-bold text-left text-black`}>
      {children}
    </h1>
  );
};

export default Title;

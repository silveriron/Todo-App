import { Props } from "@/types/props";

const Text = ({ children, className = "" }: Props) => {
  return (
    <p className={`${className} text-sm text-left text-black`}>{children}</p>
  );
};

export default Text;

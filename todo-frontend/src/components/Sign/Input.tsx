import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: HTMLInputTypeAttribute | undefined;
  testid: string;
}

const Input = ({ value, onChange, name, type, testid }: InputProps) => {
  return (
    <div className=" flex flex-col gap-3">
      <label className="block text-center font-bold text-lg" htmlFor={name}>
        {name.toLocaleUpperCase()}
      </label>
      <input
        className="w-full p-2 border border-gray-300 rounded-md"
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        data-testid={testid}
      />
    </div>
  );
};

export default Input;

import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
}

const Input = ({ name, type, placeholder }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mb-5">
      <label
        className="text-base block font-bold text-left text-gray mb-3"
        htmlFor={name}
      >
        {name[0].toUpperCase() + name.slice(1)}
      </label>
      <input
        id={name}
        className="w-full h-[35px] rounded bg-[#f7f7f5] border border-[#ebebea]"
        {...register(name)}
        type={type}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-300 text-sm">
          {errors[name]!.message as string}
        </p>
      )}
    </div>
  );
};

export default Input;

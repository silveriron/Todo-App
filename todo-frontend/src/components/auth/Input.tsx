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
    <>
      <label
        className="text-base font-bold text-left text-[#a8a8a5] mb-3"
        htmlFor={name}
      >
        {name}
      </label>
      <input
        id={name}
        className="w-full h-[35px] rounded bg-[#f7f7f5] border border-[#ebebea]"
        {...register(name)}
        type={type}
        placeholder={placeholder}
      />
      {errors.email && (
        <p className="text-slate-">{errors.email.message as string}</p>
      )}
    </>
  );
};

export default Input;

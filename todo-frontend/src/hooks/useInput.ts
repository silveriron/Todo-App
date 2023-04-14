import { useState } from "react";

interface UseInputProps {
  init?: string;
  validator?: (value: string) => boolean;
}

const useInput = ({ init = "", validator }: UseInputProps) => {
  const [value, setValue] = useState(init);
  const [isValidate, setIsValidate] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (validator) {
      setIsValidate(validator(e.target.value));
    }
  };

  return {
    value,
    onChange,
    isValidate,
  };
};

export default useInput;

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/auth/input";

const schema = yup.object().shape({
  email: yup.string().email().required("이메일을 확인해주세요."),
  password: yup.string().min(8).required(),
});

const Signin = () => {
  const methods = useForm({ resolver: yupResolver(schema), mode: "onBlur" });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-screen h-screen flex justify-center items-center">
        <form
          className="w-[26.80%] flex flex-col"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Input
            name="email"
            type="email"
            placeholder="Enter your email address..."
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <input type="submit" />
        </form>
      </div>
    </FormProvider>
  );
};

export default Signin;

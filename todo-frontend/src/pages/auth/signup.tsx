import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/auth/Input";
import Title from "@/components/common/typography/Title";
import { signupSchema } from "@/lib/formSchema";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/lib/api";
import { useRouter } from "next/router";

type FormValues = {
  email: string;
  userName: string;
  password: string;
};

const Signup = () => {
  const methods = useForm<FormValues>({
    resolver: yupResolver(signupSchema),
    mode: "onBlur",
  });
  const router = useRouter();
  const { isLoading, mutate } = useMutation(signUp, {
    onSuccess: (data) => {
      console.log(data);
      router.push("/todo");
    },
  });

  const onSubmit = async (data: FormValues) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-screen h-screen flex justify-center items-center">
        <form
          className="w-[26.80%] min-w-[200px] flex flex-col"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Title className="text-center mb-8">Sign up</Title>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email address..."
          />
          <Input
            name="userName"
            type="userName"
            placeholder="Enter your user name"
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <button
            className="h-[35px] rounded text-red-300 font-bold bg-[#fcf5f2] border border-[#f2c8c5]"
            style={{ boxShadow: "0px 1px 1px 0 rgba(0,0,0,0.2)" }}
          >
            Submit
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default Signup;

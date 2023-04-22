import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/auth/Input";
import Title from "@/components/common/typography/Title";
import { signinSchema } from "@/lib/formSchema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/lib/api";
import { useRouter } from "next/router";
import Link from "next/link";
import LinkButton from "@/components/auth/LinkButton";
import SubmitButton from "@/components/auth/SubmitButton";

const Signin = () => {
  const methods = useForm({
    resolver: yupResolver(signinSchema),
    mode: "onBlur",
  });
  const router = useRouter();
  const { mutate } = useMutation(signIn, {
    onSuccess: () => {
      router.push("/todo");
    },
  });

  const onSubmit = async (data: any) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-screen h-screen flex justify-center items-center">
        <form
          className="w-[26.80%] min-w-[200px] flex flex-col"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Title className="text-center mb-8">Sign in</Title>
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
          <SubmitButton>Submit</SubmitButton>
          <LinkButton href="/auth/signup">sign up</LinkButton>
        </form>
      </div>
    </FormProvider>
  );
};

export default Signin;

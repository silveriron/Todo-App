import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/auth/Input";
import Title from "@/components/common/typography/Title";
import { signinSchema } from "@/lib/formSchema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/lib/api/api";
import { useRouter } from "next/router";
import LinkButton from "@/components/auth/LinkButton";
import SubmitButton from "@/components/auth/SubmitButton";
import KaKaoLogin from "@/components/auth/kakao/KaKaoLogin";

const Signin = () => {
  const methods = useForm({
    resolver: yupResolver(signinSchema),
    mode: "onBlur",
  });
  const router = useRouter();
  const { mutate } = useMutation(signIn, {
    onSuccess: () => {
      router.push("/");
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
    },
  });

  const onSubmit = async (data: any) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-screen h-screen flex justify-center items-center">
        <form
          className="w-[26.80%] min-w-[200px] mb-28 flex flex-col"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Title className="text-center mb-8">Sign In</Title>
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
          <KaKaoLogin />
          <LinkButton href="/auth/signup">sign up</LinkButton>
        </form>
      </div>
    </FormProvider>
  );
};

export default Signin;

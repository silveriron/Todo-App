import { kakaoSignin } from "@/lib/api/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Callback = () => {
  const router = useRouter();
  const code = router.query.code;
  const { mutate } = useMutation(kakaoSignin, {
    onSuccess: () => {
      router.push("/todo");
    },
  });

  useEffect(() => {
    if (code && typeof code === "string") {
      mutate(code);
    }
  }, [code]);

  return <div>callback</div>;
};

export default Callback;

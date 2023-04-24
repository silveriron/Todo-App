import { useEffect } from "react";
import { getAccessToken } from "@/lib/api/api";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();

  useEffect(() => {
    getAccessToken()
      .then((res) => {
        if (res.status === 201) {
          router.push("/todo");
        } else {
          router.push("/auth/signin");
        }
      })
      .catch((err) => {
        router.push("/auth/signin");
      });
  });

  return <div>index</div>;
};

export default Main;

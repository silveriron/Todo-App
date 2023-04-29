import { useEffect } from "react";
import { getAccessToken } from "@/lib/api/api";

const Main = () => {
  useEffect(() => {
    getAccessToken()
      .then((res) => {
        if (res.status === 201) {
          window.location.href = "/todo";
        } else {
          window.location.href = "/auth/signin";
        }
      })
      .catch((err) => {
        window.location.href = "/auth/signin";
      });
  });

  return <div></div>;
};

export default Main;

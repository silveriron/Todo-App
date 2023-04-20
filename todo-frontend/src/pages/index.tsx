import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "@/lib/api";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["user"],
    queryFn: getAccessToken,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  if (data.status === 201) {
    router.push("/todo");
  }

  if (data.status === 401) {
    router.push("/auth/signin");
  }

  return <div>index</div>;
};

export default Main;

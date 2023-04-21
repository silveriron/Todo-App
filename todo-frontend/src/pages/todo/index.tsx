import React from "react";
import { getTodos } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  // const { isLoading, isError, data } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: getTodos,
  // });

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error</div>;

  return <div className="w-full"></div>;
};

export default Index;

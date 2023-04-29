import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { GetServerSideProps } from "next";
import { getAccessToken } from "@/lib/api/api";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const refresh_token = context.req.cookies.refresh_token;

  try {
    const res = await getAccessToken(refresh_token);

    if (res.status === 201) {
      return {
        props: { userInfo: res.data },
      };
    }

    return {
      props: {},
      redirect: {
        destination: "/auth/signin",
      },
    };
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: "/auth/signin",
      },
    };
  }
};

import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { QueryClient, QueryClientProvider } from "react-query";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { ThemeProvider } from "@material-ui/core";
import theme from "../styles/theme";
import "../styles/globals.css";

import firebaseConfig from "../config/firebaseConfig";
import { pageview } from "../utils/gtag";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  useEffect(() => {
    getAnalytics(initializeApp(firebaseConfig));
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BRNCH_NAME == "master") {
      const handleRouteChange = (url: string) => {
        pageview(url);
      };

      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

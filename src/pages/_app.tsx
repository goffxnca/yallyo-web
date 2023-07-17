import Layout from "@/components/Layouts/Layout";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Auth from "@/components/Layouts/Auth";
import store from "@/store/store";
import LogRocket from "logrocket";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.log("Register log rocket");
      LogRocket.init("l36g1y/yallyo");
    }
  }, []);

  return (
    <Provider store={store}>
      <Auth />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

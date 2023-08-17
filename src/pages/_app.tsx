import Layout from "@/components/Layouts/Layout";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Auth from "@/components/Layouts/Auth";
import store from "@/store/store";
import Alert from "@/components/Layouts/Alert";
// import { useEffect } from "react";
// import LogRocket from "logrocket";

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   if (process.env.NODE_ENV === "production") {
  //     console.log("Register log rocket");
  //     LogRocket.init("l36g1y/yallyo");
  //   }
  // }, []);

  const noLayout = (Component as any)["noLayout"];

  return (
    <Provider store={store}>
      <Auth />
      <Alert />
      {noLayout ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </Provider>
  );
}

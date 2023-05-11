import Layout from "@/components/Layouts/Layout";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Auth from "@/components/Layouts/Auth";
import store from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Auth />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

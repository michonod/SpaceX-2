import "../styles/globals.css";
import type { AppProps } from "next/app";
import Router from "next/router";
import { Fragment, useState } from "react";
import Loading from "../components/Loading";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });
  return (
    <Fragment>
      <Head>
        <title>Space X</title>
      </Head>
      {loading && <Loading />}
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { init, trackPages } from "insights-js";
init("nZXShkaXeRcaALNK");
trackPages();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

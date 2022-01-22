import Layout from "../components/Layout";
import NextNprogress from "nextjs-progressbar";
import "../styles/scss/global.scss";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <NextNprogress color="#fa5145" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

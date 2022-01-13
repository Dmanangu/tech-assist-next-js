import "../styles/globals.css";
import { useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

//
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <PayPalScriptProvider>
      <Component {...pageProps} />
    </PayPalScriptProvider>
  );
}

export default MyApp;

import "../styles/globals.css";
import { useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { UserContextProvider } from "../lib/userContext";
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
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </PayPalScriptProvider>
  );
}

export default MyApp;

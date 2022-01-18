import { Button } from "@mui/material";
import React, { useReducer, useEffect, useContext } from "react";
import Layout from "../component/Layout";
import paymentStyles from "./css/payment.module.css";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { UserContext } from "../lib/context";
//
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
      return {
        ...state,
        // loadingDeliver: false,
        // successDeliver: false,
        // errorDeliver: '',
      };
    default:
      state;
  }
}

//

export default function Payments({ params }) {
  const [{ loading, error, successPay }] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const { user } = useContext(UserContext);
  // useEffect(() => {
  //   // if (!userAdmin) {
  //   //   return router.push("/login");
  //   // } else {
  //   const loadPaypalScript = async () => {
  //     const { data: clientId } = await axios.get("/api/keys/paypal", {
  //       headers: { authorization: `Bearer ${user}` },
  //     });
  //     paypalDispatch({
  //       type: "resetOption",
  //       value: {
  //         "client-id": clientId,
  //         currency: "PHP",
  //       },
  //     });
  //     paypalDispatch({ type: "setLoadingStatus", value: "pending" });
  //   };
  //   loadPaypalScript();
  //   // }
  // }, [successPay]);

  //

  const styles = useStyles();
  return (
    <Layout>
      <div>
        <div className={paymentStyles.paymentContainer}>
          <div className={paymentStyles.paymentButtonContainer}>
            <NextLink href={"/paymenthistory"} passHref>
              <button className={paymentStyles.buttons}>PAYMENT HISTORY</button>
            </NextLink>
            <NextLink href={"/requestwithdrawal"} passHref>
              <button className={paymentStyles.buttons}>
                REQUEST WITHDRAWAL
              </button>
            </NextLink>
            <NextLink href={"/clientpayment"} passHref>
              <button className={paymentStyles.buttons}>CLIENT PAYMENTS</button>
            </NextLink>
          </div>
        </div>
      </div>
    </Layout>
  );
}

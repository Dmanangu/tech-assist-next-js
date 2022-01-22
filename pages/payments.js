import { Button } from "@mui/material";
import React, { useReducer, useEffect, useContext } from "react";
import Layout from "../component/Layout";
import paymentStyles from "./css/payment.module.css";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
// import { UserContext } from "../lib/context";
//

//

export default function Payments({ params }) {
  const styles = useStyles();
  return (
    <Layout>
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
    </Layout>
  );
}

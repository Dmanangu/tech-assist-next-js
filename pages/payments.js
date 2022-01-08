import { Button } from "@mui/material";
import React from "react";
import Layout from "../component/Layout";
import paymentStyles from "./css/payment.module.css";
import useStyles from "../utils/styles";
import NextLink from "next/link";

export default function Payments() {
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

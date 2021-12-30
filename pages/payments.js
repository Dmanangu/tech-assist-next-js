import { Button } from "@mui/material";
import React from "react";
import Layout from "../component/Layout";
import paymentStyles from "./css/payment.module.css";
import useStyles from "../utils/styles";

export default function Payments() {
  const styles = useStyles();
  return (
    <Layout>
      <div>
        <div className={paymentStyles.paymentContainer}>
          <div className={paymentStyles.paymentButtonContainer}>
            <button className={paymentStyles.buttons}>PAYMENT HISTORY</button>
            <button className={paymentStyles.buttons}>
              REQUEST WITHDRAWAL
            </button>
            <button className={paymentStyles.buttons}>CLIENT PAYMENTS</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

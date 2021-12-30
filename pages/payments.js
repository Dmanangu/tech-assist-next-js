import React from "react";
import Layout from "../component/Layout";
import paymentStyles from "./css/payment.module.css";

export default function Payments() {
  return (
    <Layout>
      <div>
        <div className={paymentStyles.paymentContainer}>x</div>
      </div>
    </Layout>
  );
}

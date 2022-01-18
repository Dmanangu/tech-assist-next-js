import { Button, Table, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import Layout from "../component/Layout";
import paymentStyles from "./css/payment.module.css";
import paymentHistoryStyles from "./css/paymenthistory.module.css";
import useStyles from "../utils/styles";
import NextLink from "next/link";

export default function PaymentHistory() {
  const styles = useStyles();
  return (
    <Layout>
      <div>
        <div className={paymentHistoryStyles.paymentHistoryContainer}>
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
          <div className={paymentHistoryStyles.transactionHistory}>
            <div>
              <Table
                style={{ backgroundColor: "#b4b8c7", borderStyle: "solid" }}
              >
                <TableRow>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h3"> Date </Typography>
                  </TableCell>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h3">From Client's Payment </Typography>
                  </TableCell>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h3"> To Worker </Typography>
                  </TableCell>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h3">Amount </Typography>
                  </TableCell>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h3">Status </Typography>
                  </TableCell>
                </TableRow>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import {
  Button,
  Card,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import Layout from "../component/Layout";
import paymentStyles from "./css/payment.module.css";
import paymentHistoryStyles from "./css/paymenthistory.module.css";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { Paper } from "@material-ui/core";

export default function ClientPayment() {
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
              <Paper
                style={{
                  maxHeight: 700,
                  overflow: "auto",
                  borderStyle: "solid",
                }}
              >
                <Table style={{ backgroundColor: "#d8cccc" }}>
                  <Typography variant="h4">
                    <strong>Client's Payment</strong>
                  </Typography>
                </Table>
                <Table>
                  <Card> XXXXXXXXXXXXXXXXXXXXXXXXXXX </Card>
                </Table>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

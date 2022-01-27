import {
  Button,
  Paper,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import Layout from "../component/Layout";
import paymentStyles from "./css/payment.module.css";
import paymentHistoryStyles from "./css/paymenthistory.module.css";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { postToJSON, firestore } from "../lib/firebase";

//
export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("payment");
  // .where('published', '==', true)
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  // console.log(posts);
  return {
    props: { posts }, // will be passed to the page component as props
  };
}
//

export default function PaymentHistory(props) {
  const styles = useStyles();
  //firebase
  const [posts, setPosts] = useState(props.posts);
  const usersClient = posts.filter((payment) => {
    return payment.payment_status.toLowerCase().includes("completed");
  });

  //firebase
  return (
    <Layout>
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
            <Paper style={{ maxHeight: 750, overflow: "auto", marginLeft: 40 }}>
              {/* changed to margin 70 last margin is 40: To center the table */}
              <Table
                style={{
                  backgroundColor: "#b4b8c7",
                  borderStyle: "solid",
                }}
              >
                <TableRow>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h4"> Date </Typography>
                  </TableCell>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h4">From Client's Payment </Typography>
                  </TableCell>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h4"> To Worker </Typography>
                  </TableCell>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h4">Amount </Typography>
                  </TableCell>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h4">Status </Typography>
                  </TableCell>
                </TableRow>
                {usersClient.map((payment) => (
                  <TableRow style={{ backgroundColor: "#f0dcdc" }}>
                    <TableCell style={{ borderStyle: "solid" }}>
                      <Typography>
                        <b>{payment.date}</b>
                      </Typography>
                    </TableCell>
                    <TableCell style={{ borderStyle: "solid" }}>
                      <Typography variant="h6">
                        <b>{payment.from}</b>
                      </Typography>
                    </TableCell>
                    <TableCell style={{ borderStyle: "solid" }}>
                      <Typography variant="h6">
                        <b>{payment.to}</b>
                      </Typography>
                    </TableCell>
                    <TableCell style={{ borderStyle: "solid" }}>
                      <Typography variant="h6">
                        <b>PHP {payment.amount}</b>
                      </Typography>
                    </TableCell>
                    <TableCell style={{ borderStyle: "solid" }}>
                      <Typography variant="h6">
                        <b>{payment.payment_status}</b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            </Paper>
          </div>
        </div>
      </div>
    </Layout>
  );
}

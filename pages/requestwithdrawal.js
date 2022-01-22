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
  const postsQuery = firestore.collectionGroup("withdrawal");
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

export default function RequestWithdrawal(props) {
  const styles = useStyles();
  //firebase
  const [posts, setPosts] = useState(props.posts);
  const usersClient = posts.filter((withdrawal) => {
    return withdrawal;
  });
  //firebase
  return (
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
            <Paper style={{ maxHeight: 750, overflow: "auto", marginLeft: 50 }}>
              <Table
                style={{ backgroundColor: "#b4b8c7", borderStyle: "solid" }}
              >
                <TableRow>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h4"> &emsp; Date &emsp; </Typography>
                  </TableCell>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h4"> &emsp;Name&emsp; </Typography>
                  </TableCell>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h4"> &emsp;Amount&emsp; </Typography>
                  </TableCell>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h4"> Withdrawal </Typography>
                    <Typography variant="h4"> &emsp;Method </Typography>
                  </TableCell>
                  <TableCell style={{ borderStyle: "solid" }}>
                    <Typography variant="h4"> &emsp;Status&emsp; </Typography>
                  </TableCell>
                </TableRow>

                {usersClient.map((withdrawal) => (
                  <NextLink href={`./withdrawal/${withdrawal.withdrawer}`}>
                    <TableRow
                      style={{
                        backgroundColor: "#ffecec",
                        borderStyle: "solid",
                      }}
                    >
                      <TableCell>
                        <Typography variant="h6">{withdrawal.date}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" align="center">
                          {withdrawal.withdrawer}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" align="center">
                          PHP {withdrawal.amount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" align="center">
                          {withdrawal.paymentMethod}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" align="center">
                          {withdrawal.withdraw_status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </NextLink>
                ))}
              </Table>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}

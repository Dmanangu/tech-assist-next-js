import {
  Button,
  Card,
  CardActionArea,
  CardContent,
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
import { Paper } from "@material-ui/core";
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

export default function ClientPayment(props) {
  const styles = useStyles();
  //firebase
  const [posts, setPosts] = useState(props.posts);
  const [filteredPosts, setFilteredPosts] = useState(props.posts);
  const usersClient = posts.filter((payment) => {
    return payment.payment_status.toLowerCase().includes("process");
  });
  //firebase
  const clientSearchHandler = (e) => {
    const searchClient = filteredPosts;

    if (e.target.value.length >= 0 && e.target.value === "") {
      setPosts(filteredPosts);
    } else {
      const filter = usersClient.filter((payment) => {
        return payment.from.toLowerCase().includes(e.target.value);
      });
      setPosts(filter);
    }
  };
  return (
    <Layout>
      <input
        style={{ marginTop: 20, width: 600 }}
        type="search"
        placeholder="Search User Here"
        value={usersClient.payment}
        onChange={clientSearchHandler}
      />
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
                <Card>
                  {usersClient.map((payment) => (
                    <CardActionArea>
                      <NextLink
                        href={`./clientpaymentverification/${payment.from}`}
                      >
                        <CardContent sx={{ display: "flex" }}>
                          <Table>
                            <TableCell>
                              <img
                                component="img"
                                src={
                                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                }
                                height={100}
                                width={100}
                                alt={payment.from}
                                align="left"
                              />
                              <TableCell>
                                <Typography variant="h5">
                                  FROM:<b>{payment.from} (CLIENT)</b> &emsp; TO:
                                  <b>{payment.to} (WORKER)</b>
                                </Typography>
                                <Typography variant="h5">
                                  <b>Received:</b> {payment.message}
                                </Typography>
                              </TableCell>
                            </TableCell>
                          </Table>
                        </CardContent>
                      </NextLink>
                    </CardActionArea>
                  ))}
                </Card>
              </Table>
            </Paper>
          </div>
        </div>
      </div>
    </Layout>
  );
}

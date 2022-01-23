import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useReducer, useEffect, useContext, useState } from "react";
import Layout from "../../component/Layout";
import useStyles from "../../utils/styles";
import NextLink from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid";
import { postToJSON, firestore } from "../../lib/firebase";
import paymentStyles from "../css/payment.module.css";
import { useRouter } from "next/router";
import { borderRadius } from "@mui/system";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
//
export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("payment");
  // .where('published', '==', true)
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}
//

export default function ClientPaymentVerification(props) {
  const styles = useStyles();

  const [posts, setPosts] = useState(props.posts);
  const usersClient = posts.filter((payment) => {
    return payment.payment_status.toLowerCase().includes("process");
  });

  const router = useRouter();
  const { from } = router.query;

  const profile = usersClient.find((payment) => payment.from === from);

  if (!profile) {
    return <div>User not found</div>;
  }

  const [status, setStatus] = React.useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    if (status === 100) {
      try {
        firestore
          .collection("payment")
          .doc(usersClient[0].id)
          .update({
            payment_status: "COMPLETED",
          })
          .then(alert("Tech Assist Client's Payment Completed and Verified"));
        router.push("../paymenthistory");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };
  return (
    <Layout>
      <div>
        <div className={paymentStyles.paymentContainer}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <div className={paymentStyles.paymentButtonContainer}>
                <NextLink href={"/paymenthistory"} passHref>
                  <button className={paymentStyles.buttons}>
                    PAYMENT HISTORY
                  </button>
                </NextLink>
                <NextLink href={"/requestwithdrawal"} passHref>
                  <button className={paymentStyles.buttons}>
                    REQUEST WITHDRAWAL
                  </button>
                </NextLink>
                <NextLink href={"/clientpayment"} passHref>
                  <button className={paymentStyles.buttons}>
                    CLIENT PAYMENTS
                  </button>
                </NextLink>
              </div>
            </Grid>

            <Grid item xs={6} style={{ marginLeft: 50 }}>
              {/* {usersClient.map((payment) => ( */}
              <Card style={{ backgroundColor: "#efe2e2" }}>
                <Typography variant="h5">
                  <b>CLIENTS PAYMENT</b>
                </Typography>

                <CardContent align="center">
                  <img
                    component="img"
                    //   src={payment.imageUrl}
                    src={
                      "https://images.unsplash.com/photo-1622151834625-66296f9f0e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwd29ya2luZ3xlbnwwfHwwfHw%3D&w=1000&q=80"
                    }
                    height={250}
                    width={350}
                    alt={profile.from}
                  />
                  <CardContent>
                    <FormControl
                      style={{
                        width: 200,
                        textAlign: "center",
                        backgroundColor: "#ffecec",
                      }}
                    >
                      <InputLabel id="demo-simple-select">STATUS</InputLabel>
                      <Select
                        // labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="STATUS"
                        value={status}
                        onChange={handleChange}
                      >
                        <MenuItem value={0}>PROCESS</MenuItem>
                        <MenuItem value={100}>COMPLETED</MenuItem>
                      </Select>
                    </FormControl>
                  </CardContent>

                  <Typography
                    variant="h5"
                    align="center"
                    border={2}
                    borderRadius={10}
                    maxWidth={500}
                    backgroundColor="white"
                  >
                    {profile.from}
                  </Typography>

                  <Typography variant="h5" align="center">
                    {profile.PaymentMethod} NUMBER
                  </Typography>

                  <Typography
                    variant="h5"
                    align="center"
                    border={2}
                    borderRadius={10}
                    maxWidth={500}
                    backgroundColor="white"
                  >
                    {profile.phone}
                  </Typography>

                  <Typography variant="h5" align="center">
                    AMOUNT
                  </Typography>

                  <Typography
                    variant="h5"
                    align="center"
                    border={2}
                    borderRadius={10}
                    maxWidth={500}
                    backgroundColor="white"
                  >
                    {profile.amount}
                  </Typography>
                </CardContent>
                <CardContent align="center">
                  <Button
                    style={{
                      backgroundColor: "#ed9220",
                      borderRadius: 20,
                      width: 100,
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    OKAY
                  </Button>
                </CardContent>
              </Card>
              {/* ))} */}
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
}

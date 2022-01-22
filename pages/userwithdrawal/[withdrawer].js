import { Alert, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useReducer, useEffect, useContext, useState } from "react";
import Layout from "../../component/Layout";
import paymentStyles from "../css/payment.module.css";
import useStyles from "../../utils/styles";
import NextLink from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { UserContext } from "../../lib/userContext";
import { postToJSON, firestore } from "../../lib/firebase";
import { useRouter } from "next/router";
import { Checkbox } from "@material-ui/core";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

//

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

export default function WithdrawalRequest(props) {
  //
  const [posts, setPosts] = useState(props.posts);

  const usersClient = posts.filter((withdrawal) => {
    return withdrawal.withdraw_status.toLowerCase().includes("pending");
  });

  const router = useRouter();
  const { withdrawer } = router.query;

  const userProfile = usersClient.find(
    (withdrawal) => withdrawal.withdrawer === withdrawer
  );

  if (!userProfile) {
    return (
      <Typography align="center" variant="h3" style={{ marginTop: 400 }}>
        This user has already processed their withdrawal{" "}
      </Typography>
    );
  }

  const [status, setStatus] = React.useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const [checked, setChecked] = React.useState([true, false]);
  const checkerStatus = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const submitHandlerForm = (e) => {
    var message =
      "We have already sent PHP " +
      (usersClient[0].amount - usersClient[0].amount * 0.08) +
      " to your " +
      usersClient[0].paymentMethod +
      " account from Tech Assist. Thank you for improving your service and loyalty to clients. Take note that Tech Assist takes 8% of the total payment.";
    if (checked[0] === true) {
      try {
        firestore
          .collection("withdrawal")
          .doc(e)
          .update({
            withdraw_status: "Completed",
          })
          .then(alert(message));
        router.push("/requestwithdrawal");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else {
      alert("The Admin must check the box first for approval");
    }
  };
  const styles = useStyles();
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
              {/* {usersClient.map((withdrawal) => ( */}
              <Card style={{ backgroundColor: "#efe2e2" }}>
                <Typography variant="h5">
                  <b>REQUEST WITHDRAWAL</b>
                </Typography>

                <CardContent align="center">
                  <img
                    component="img"
                    //   src={profile.imageUrl}
                    src={
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    height={150}
                    width={125}
                    borderRadius={30}
                    //   alt={profile.fullname}
                  />

                  <Typography
                    variant="h5"
                    align="center"
                    border={2}
                    padding={3}
                    maxWidth={500}
                    backgroundColor="#ffecec"
                  >
                    <b>Verification:/TechAssist Okay</b>
                    <Checkbox
                      checked={checked[0]}
                      onChange={checkerStatus}
                      color="success"
                      style={{
                        borderRaduis: 10,
                        backgroundColor: "#3ed21b",
                        borderStyle: "none",
                        fontSize: "30px",
                      }}
                    />
                  </Typography>

                  <Typography variant="h5" align="center">
                    {userProfile.paymentMethod} NAME
                  </Typography>

                  <CardContent>
                    <Typography
                      variant="h5"
                      align="center"
                      border={2}
                      borderRadius={10}
                      maxWidth={500}
                      backgroundColor="white"
                    >
                      {userProfile.withdrawer}
                    </Typography>
                  </CardContent>

                  <Typography variant="h5" align="center">
                    {userProfile.paymentMethod} NUMBER
                  </Typography>

                  <CardContent>
                    <Typography
                      variant="h5"
                      align="center"
                      border={2}
                      borderRadius={10}
                      maxWidth={500}
                      backgroundColor="white"
                    >
                      {userProfile.phone}
                    </Typography>
                  </CardContent>

                  <Typography variant="h5" align="center">
                    AMOUNT
                  </Typography>

                  <CardContent>
                    <Typography
                      variant="h5"
                      align="center"
                      border={2}
                      borderRadius={10}
                      maxWidth={500}
                      backgroundColor="white"
                    >
                      {userProfile.amount}
                    </Typography>
                  </CardContent>
                </CardContent>
                <CardContent align="center">
                  <Button
                    style={{
                      backgroundColor: "#ed9220",
                      borderRadius: 20,
                      width: 100,
                    }}
                    onClick={() => submitHandlerForm(userProfile.id)}
                    variant="contained"
                  >
                    Send
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

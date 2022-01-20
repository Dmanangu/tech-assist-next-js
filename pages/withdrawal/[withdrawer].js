import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useReducer, useEffect, useContext, useState } from "react";
import Layout from "../../component/Layout";
import paymentStyles from "../css/payment.module.css";
import useStyles from "../../utils/styles";
import NextLink from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { UserContext } from "../../lib/context";
import { postToJSON, firestore } from "../../lib/firebase";
import { useRouter } from "next/router";

//
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
      return {
        ...state,
        // loadingDeliver: false,
        // successDeliver: false,
        // errorDeliver: '',
      };
    default:
      state;
  }
}

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
  // const [{ loading, error, successPay }] = useReducer(reducer, {
  //   loading: true,
  //   error: "",
  // });

  const { user } = useContext(UserContext);
  // useEffect(() => {
  //   // if (!userAdmin) {
  //   //   return router.push("/login");
  //   // } else {
  //   const loadPaypalScript = async () => {
  //     const { data: clientId } = await axios.get("/api/keys/paypal", {
  //       headers: { authorization: `Bearer ${user}` },
  //     });
  //     paypalDispatch({
  //       type: "resetOption",
  //       value: {
  //         "client-id": clientId,
  //         currency: "PHP",
  //       },
  //     });
  //     paypalDispatch({ type: "setLoadingStatus", value: "pending" });
  //   };
  //   loadPaypalScript();
  //   // }
  // }, [successPay]);

  //
  const [posts, setPosts] = useState(props.posts);
  const router = useRouter();
  const { withdrawer } = router.query;

  const usersClient = posts.filter((withdrawal) => {
    return withdrawal;
  });

  const profile = usersClient.find(
    (withdrawal) => withdrawal.withdrawer === withdrawer
  );

  if (!profile) {
    return <div>User not found</div>;
  }

  const [status, setStatus] = React.useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
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
              {usersClient.map((withdrawal) => (
                <Card style={{ backgroundColor: "#efe2e2" }}>
                  <Typography variant="h5">
                    <b>REQUEST WITHDRAWAL</b>
                  </Typography>

                  <CardContent align="center">
                    <img
                      component="img"
                      //   src={profile.imageUrl}
                      src={
                        "https://images.unsplash.com/photo-1622151834625-66296f9f0e96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwd29ya2luZ3xlbnwwfHwwfHw%3D&w=1000&q=80"
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
                      Verification:
                    </Typography>

                    <Typography variant="h5" align="center">
                      GCASH NAME
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
                        {withdrawal.withdrawer}
                      </Typography>
                    </CardContent>

                    <Typography variant="h5" align="center">
                      GCASH NUMBER
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
                        {withdrawal.phone}
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
                        {withdrawal.amount}
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
                      variant="contained"
                    >
                      Send
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
}

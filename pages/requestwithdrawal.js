import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useReducer, useEffect, useContext } from "react";
import Layout from "../component/Layout";
import paymentStyles from "./css/payment.module.css";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { UserContext } from "../lib/context";

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

// export async function getServerSideProps() {
//   const postsQuery = firestore.collectionGroup("users");
//   // .where('published', '==', true)
//   // .orderBy('createdAt', 'desc')
//   // .limit(LIMIT);

//   const posts = (await postsQuery.get()).docs.map(postToJSON);
//   // console.log(posts);
//   return {
//     props: { posts }, // will be passed to the page component as props
//   };
// }

//

export default function RequestWithdrawal({ params }, props) {
  const [{ loading, error, successPay }] = useReducer(reducer, {
    loading: true,
    error: "",
  });

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
                    height={250}
                    width={350}
                    //   alt={profile.fullname}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
}

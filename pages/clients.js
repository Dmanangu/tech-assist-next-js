import { Box, Typography } from "@material-ui/core";
import React from "react";
import Layout from "../component/Layout";
import clientStyles from "./css/client.module.css";

export default function Clients() {
  return (
    <Layout title="Clients">
      <div>
        <div className={clientStyles.clientContainer}>
          <Typography>Hello</Typography>
        </div>
      </div>
    </Layout>
  );
}

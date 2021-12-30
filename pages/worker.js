import React from "react";
import Layout from "../component/Layout";
import workerStyles from "./css/worker.module.css";
export default function Worker() {
  return (
    <Layout>
      <div className={workerStyles.workerContainer}></div>
    </Layout>
  );
}

import React from "react";
import Layout from "../../../components/Layout/Layout";

function Dashboard() {
  const userid = window.localStorage.getItem("tpkey");

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
      Dashboard
    </Layout>
  );
}

export default Dashboard;

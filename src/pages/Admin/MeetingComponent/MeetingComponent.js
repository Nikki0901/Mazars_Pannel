import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import Meeting from "../meeting/index";

function MeetingComponent(props) {
  const userid = window.localStorage.getItem("adminkey");

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Meeting />
    </Layout>
  );
}

export default MeetingComponent;

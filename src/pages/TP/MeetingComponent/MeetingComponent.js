import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import Meeting from "../meeting/index";

function MeetingComponent(props) {
  const userid = window.localStorage.getItem("tpkey");

  console.log("ppp", props.match.params.id)
  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
      <Meeting id={props.match.params.id} />
    </Layout>
  );
}

export default MeetingComponent;
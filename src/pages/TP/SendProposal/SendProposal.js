import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
// import {  useParams } from "react-router-dom";
import ProposalComponent from "../Proposal/ProposalComponent";


function SendProposal() {

  const userid = window.localStorage.getItem("tpkey");
  return (
    <>
      <Layout TPDashboard="TPDashboard" TLuserId={userid}>
        <ProposalComponent />
      </Layout>
    </>
  );
}

export default SendProposal;

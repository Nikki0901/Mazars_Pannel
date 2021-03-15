import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
// import {  useParams } from "react-router-dom";
import ProposalComponent from "../Proposal/ProposalComponent";


function SendProposal() {
    // const { id } = useParams();
  const userid = window.localStorage.getItem("tlkey");
  return (
    <>
      <Layout TLDashboard="TLDashboard" TLuserId={userid}>
        <ProposalComponent />
      </Layout>
    </>
  );
}

export default SendProposal;
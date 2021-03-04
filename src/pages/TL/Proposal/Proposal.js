import React from "react";
import Layout from "../../../components/Layout/Layout";
import ProposalComponent from "./ProposalComponent";

function Proposal() {
  const userid = window.localStorage.getItem("tlkey");

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <div class="row mt-3">
        <ProposalComponent />
      </div>
    </Layout>
  );
}

export default Proposal;

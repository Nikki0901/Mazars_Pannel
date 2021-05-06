import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";

import AllProposalComponent from "../AllProposalComponent/AllProposalComponent";
import PendingForAcceptence from "../../../components/PendingForAcceptence/PendingForAcceptence";
import AcceptedProposal from "../AcceptedProposal/AcceptedProposal";
import DeclinedPropoal from "../DeclinedProposal/DeclinedPropoal";


function Proposal() {
  const [allProposalCount, setAllProposalCount] = useState("");
  const [pendingProposalCount, setPendingProposalCount] = useState("");
  // const [acceptedProposalCount, setAcceptedProposalCount] = useState("");
  const [declinedProposalCount, setDeclinedProposalCount] = useState("");

  const userid = window.localStorage.getItem("adminkey");

  const allProposal = (data) => {
    setAllProposalCount(data);
  };

  const pendingProposal = (data) => {
    setPendingProposalCount(data);
  };

  // const acceptedProposal = (data) => {
  //   setAcceptedProposalCount(data);
  // };

  const declinedProposal = (data) => {
    setDeclinedProposalCount(data);
  };

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <div class="row mt-3">
        <div class="col-md-12" style={{ top: "-12px" }}>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="query"
              role="tabpanel"
              aria-labelledby="pills-query-tab"
            >
              <ul
                class="nav nav-pills mb-3 col-sm-12"
                style={{ justifyContent: "space-around" }}
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link text-white active"
                    id="pills-d-tab"
                    data-toggle="pill"
                    href="#d"
                    role="tab"
                    aria-controls="pills-d"
                    aria-selected="true"
                  >
                    All Proposal ({allProposalCount})
                  </a>
                </li>

                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link text-white"
                    id="pills-a-tab"
                    data-toggle="pill"
                    href="#a"
                    role="tab"
                    aria-controls="pills-a"
                    aria-selected="false"
                  >
                    Pending For Acceptence ({pendingProposalCount})
                  </a>
                </li>

                {/* <li class="nav-item" role="presentation">
                  <a
                    class="nav-link text-white"
                    id="pills-b-tab"
                    data-toggle="pill"
                    href="#b"
                    role="tab"
                    aria-controls="pills-b"
                    aria-selected="false"
                  >
                    Accepted ({acceptedProposalCount})
                  </a>
                </li> */}

                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link text-white"
                    id="pills-c-tab"
                    data-toggle="pill"
                    href="#c"
                    role="tab"
                    aria-controls="pills-c"
                    aria-selected="false"
                  >
                    Declined ({declinedProposalCount})
                  </a>
                </li>
              </ul>

              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="d"
                  role="tabpanel"
                  aria-labelledby="pills-d-tab"
                >
                  <AllProposalComponent allProposal={allProposal} />
                </div>

                <div
                  class="tab-pane fade"
                  id="a"
                  role="tabpanel"
                  aria-labelledby="pills-a-tab"
                >
                  <PendingForAcceptence pendingProposal={pendingProposal} />
                </div>

                {/* <div
                  class="tab-pane fade"
                  id="b"
                  role="tabpanel"
                  aria-labelledby="pills-b-tab"
                >
                  <AcceptedProposal acceptedProposal={acceptedProposal} />
                </div> */}

                <div
                  class="tab-pane fade"
                  id="c"
                  role="tabpanel"
                  aria-labelledby="pills-c-tab"
                >
                  <DeclinedPropoal declinedProposal={declinedProposal} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Proposal;

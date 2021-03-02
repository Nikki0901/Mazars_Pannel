import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import PendingForAllocation from "../../../components/PendingForAllocation/PendingForAllocation";
import PendingForProposals from "../../../components/PendingForProposals/PendingForProposals";
import PendingForNonPayment from "../../../components/PendingForNonPayment/PendingForNonPayment";
import AllQueriesData from "../../../components/AllQueriesData/AllQueriesData";

function QueriesTab() {
  const userid = window.localStorage.getItem("adminkey");

  const [allQueriesCount, setAllQueriesCount] = useState('');
  const [pendingAllocationCount, setPendingAllocationCount] = useState('');



  const CountAllQuery = (data) => {
    setAllQueriesCount(data)
  }

  const CountPendingAllocation = (data) => {
    setPendingAllocationCount(data)
  }

 
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
                    All Queries ({allQueriesCount})
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
                    Pending for Allocation ({pendingAllocationCount})
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
                    Pending for Proposal ({pendingProposalCount})
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
                    Pending for Non-Payment
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
                  <AllQueriesData CountAllQuery={CountAllQuery}/>
                </div>

                <div
                  class="tab-pane fade"
                  id="a"
                  role="tabpanel"
                  aria-labelledby="pills-a-tab"
                >
                  <PendingForAllocation CountPendingAllocation={CountPendingAllocation} />
                </div>

                {/* <div
                  class="tab-pane fade"
                  id="b"
                  role="tabpanel"
                  aria-labelledby="pills-b-tab"
                >
                  <PendingForProposals CountPendingProposal={CountPendingProposal}/>
                </div> */}

                <div
                  class="tab-pane fade"
                  id="c"
                  role="tabpanel"
                  aria-labelledby="pills-c-tab"
                >
                  <PendingForNonPayment />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QueriesTab;

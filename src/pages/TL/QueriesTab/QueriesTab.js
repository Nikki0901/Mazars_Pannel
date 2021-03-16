import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import PendingForAcceptence from "../PendingForAcceptence/PendingForAcceptence";
import InCompleteData from "../InCompleteData/InCompleteData";
import CompleteData from "../CompleteData/CompleteData";

function QueriesTab() {
  const userid = window.localStorage.getItem("tlkey");

  const [pendingAcceptence, setPendingAcceptence] = useState("");
  const [incomplete, setIncomplete] = useState("");

  const CountPendingForAcceptence = (data) => {
    setPendingAcceptence(data);
  };

  const CountIncomplete = (data) => {
    setIncomplete(data);
  };

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <div class="row mt-3">
        <div class="col-md-12">
          <ul
            class="nav nav-pills mb-3"
            style={{ justifyContent: "space-around" }}
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-white active"
                id="pills-pending-tab"
                data-toggle="pill"
                href="#pending"
                role="tab"
                aria-controls="pills-pending"
                aria-selected="false"
              >
                Pending for Acceptance ({pendingAcceptence})
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-white"
                id="pills-incomplete-tab"
                data-toggle="pill"
                href="#incomplete"
                role="tab"
                aria-controls="pills-incomplete"
                aria-selected="false"
              >
                Incomplete ({incomplete})
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-white"
                id="pills-complete-tab"
                data-toggle="pill"
                href="#complete"
                role="tab"
                aria-controls="pills-complete"
                aria-selected="false"
              >
                Complete
              </a>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pending"
              role="tabpanel"
              aria-labelledby="pills-pending-tab"
            >
              <PendingForAcceptence
                CountPendingForAcceptence={CountPendingForAcceptence}
              />
            </div>

            <div
              class="tab-pane fade"
              id="incomplete"
              role="tabpanel"
              aria-labelledby="pills-incomplete-tab"
            >
              <InCompleteData CountIncomplete={CountIncomplete} />
            </div>

            <div
              class="tab-pane fade"
              id="complete"
              role="tabpanel"
              aria-labelledby="pills-complete-tab"
            >
              <CompleteData />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QueriesTab;

{
  /* {pendingData.map((p, i) => ( */
}
// <PendingForAcceptence
// p={p}
// getPendingforAcceptance={getPendingforAcceptance}
// />
// {/* // ))}

import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
// import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import PendingForAcceptence from "../PendingForAcceptence/PendingForAcceptence";
import InCompleteData from "../InCompleteData/InCompleteData";
import PendingForPayment from "../PendingForPayment/PendingForPayment";


function QueriesTab() {
  const userid = window.localStorage.getItem("tlkey");

  const [pendingAcceptence, setPendingAcceptence] = useState("");
  const [incomplete, setIncomplete] = useState("");
  const [complete, setComplete] = useState("");

  const CountPendingForAcceptence = (data) => {
    setPendingAcceptence(data);
  };

  const CountIncomplete = (data) => {
    setIncomplete(data);
  };

  const CountComplete = (data) => {
    setComplete(data);
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
                id="pills-query-tab"
                data-toggle="pill"
                href="#query"
                role="tab"
                aria-controls="pills-query"
                aria-selected="false"
              >
                All query
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-white"
                id="pills-pendingAllocation-tab"
                data-toggle="pill"
                href="#pendingAllocation"
                role="tab"
                aria-controls="pills-pendingAllocation"
                aria-selected="false"
              >
                Pending For allocation
              </a>
            </li>

            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-white"
                id="pills-pendingPayment-tab"
                data-toggle="pill"
                href="#pendingPayment"
                role="tab"
                aria-controls="pills-pendingPayment"
                aria-selected="false"
              >
                Pending For Payment
              </a>
            </li>
          </ul>

          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="query"
              role="tabpanel"
              aria-labelledby="pills-query-tab"
            >
              <PendingForAcceptence
                CountPendingForAcceptence={CountPendingForAcceptence}
              />
            </div>

            <div
              class="tab-pane fade"
              id="pendingAllocation"
              role="tabpanel"
              aria-labelledby="pills-pendingAllocation-tab"
            >
              <InCompleteData CountIncomplete={CountIncomplete} />
            </div>

            <div
              class="tab-pane fade"
              id="pendingPayment"
              role="tabpanel"
              aria-labelledby="pills-pendingPayment-tab"
            >
              <PendingForPayment />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QueriesTab;

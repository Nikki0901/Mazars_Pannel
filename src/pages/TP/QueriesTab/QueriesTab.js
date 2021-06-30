import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import InComplete from "../InComplete/InComplete";
import Complete from "../Complete/Complete";

function QueriesTab() {
  const userid = window.localStorage.getItem("tpkey");

  // const [pendingAcceptence, setPendingAcceptence] = useState("");
  // const [incomplete, setIncomplete] = useState("");
  // const [complete, setComplete] = useState("");

  // const CountPendingForAcceptence = (data) => {
  //   setPendingAcceptence(data);
  // };

  // const CountIncomplete = (data) => {
  //   setIncomplete(data);
  // };

  // const CountComplete = (data) => {
  //   setComplete(data);
  // };

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
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
                id="pills-incomplete-tab"
                data-toggle="pill"
                href="#incomplete"
                role="tab"
                aria-controls="pills-incomplete"
                aria-selected="false"
              >
                Inprogress
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
              id="incomplete"
              role="tabpanel"
              aria-labelledby="pills-incomplete-tab"
            >
              <InComplete />
            </div>

            <div
              class="tab-pane fade"
              id="complete"
              role="tabpanel"
              aria-labelledby="pills-complete-tab"
            >
              <Complete />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QueriesTab;
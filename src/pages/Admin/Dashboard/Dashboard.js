import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";

function Dashboard() {
  const userId = window.localStorage.getItem("adminkey");

  const [allQueries, setAllQueries] = useState("");
  const [allProposal, setAllProposal] = useState("");
  const [allPendingForAllocation, setPendingForAllocation] = useState("");
  const [allPendingForProposal, setPendingForProposal] = useState("");
  const [allAcceptedProposal, setAcceptedProposal] = useState("");
  const [allDeclinedProposal, setDeclinedProposal] = useState("");

  useEffect(() => {
    const getAllQueries = () => {
      axios
        .get(`${baseUrl}/admin/getAllQueries`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setAllQueries(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getAllProposal = () => {
      axios
        .get(`${baseUrl}/admin/getProposals`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setAllProposal(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getPendingForAllocation = () => {
      axios
        .get(`${baseUrl}/admin/pendingAllocation`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setPendingForAllocation(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getPendingForProposal = () => {
      axios
        .get(`${baseUrl}/admin/pendingProposal`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setPendingForProposal(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getAcceptedProposal = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?&status=5,7`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setAcceptedProposal(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getDeclinedProposal = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?&status=6`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setDeclinedProposal(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    getAllQueries();
    getPendingForAllocation();
    getPendingForProposal();
    getAllProposal();
    getAcceptedProposal();
    getDeclinedProposal();
  }, []);

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>
      <div class="row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <p style={{ fontSize: "20px" }}>All Queries</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <h2>{allQueries}</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <p style={{ fontSize: "20px" }}>Pending For Allocation</p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <h2>{allPendingForAllocation}</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <p style={{ fontSize: "20px" }}>Pending For Proposal</p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <h2>{allPendingForProposal}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <p style={{ fontSize: "20px" }}>All Proposal</p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <h2>{allProposal}</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <p style={{ fontSize: "20px" }}>Accepted Proposal</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <h2>{allAcceptedProposal}</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <p style={{ fontSize: "20px" }}>Declined Proposal</p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <h2>{allDeclinedProposal}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 
      <div class="row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <p style={{ fontSize: "20px" }}>Accepted Proposal</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <h2>100</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <p style={{ fontSize: "20px" }}>Declined Proposal</p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <h2>100</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <p style={{ fontSize: "20px" }}>Pending For Proposal</p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <h2>100</h2>
              </div>
            </div>
          </div>
        </div>
        
      </div> */}
    </Layout>
  );
}

export default Dashboard;

{
  /* <div class="row mt-3">
        <div class="col-md-12" style={{ top: "-12px" }}>
          <ul
            class="nav nav-pills mb-3 col-sm-12"
            style={{ justifyContent: "space-around" }}
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-white active"
                id="pills-a-tab"
                data-toggle="pill"
                href="#a"
                role="tab"
                aria-controls="pills-a"
                aria-selected="true"
              >
                Pending for Allocation
              </a>
            </li>

            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-white"
                id="pills-b-tab"
                data-toggle="pill"
                href="#b"
                role="tab"
                aria-controls="pills-b"
                aria-selected="false"
              >
                Pending for Payment
              </a>
            </li>
          </ul>

          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="a"
              role="tabpanel"
              aria-labelledby="pills-a-tab"
            >
              <PendingForAllocation />
            </div>

            <div
              class="tab-pane fade"
              id="b"
              role="tabpanel"
              aria-labelledby="pills-b-tab"
            >
              <PendingForPayment />
            </div>
          </div>
        </div>
      </div> */
}

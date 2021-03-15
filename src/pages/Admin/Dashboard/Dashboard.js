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
      <div class="row mt-3">
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-150">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    All Queries
                  </h5>
                </div>
                <div>
                  <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "50px",
                }}
              >
                <h4>{allQueries}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-150">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    Pending For Allocation
                  </h5>
                </div>
                <div>
                  <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "50px",
                }}
              >
                <h4>{allPendingForAllocation}</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-150">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    Pending For Proposal
                  </h5>
                </div>
                <div>
                  <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "50px",
                }}
              >
                <h4>{allPendingForProposal}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-150">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    All Proposal
                  </h5>
                </div>
                <div>
                  <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "50px",
                }}
              >
                <h4>{allProposal}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-150">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    Accepted Proposal
                  </h5>
                </div>
                <div>
                  <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "50px",
                }}
              >
                <h4>{allAcceptedProposal}</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-150">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    Declined Proposal
                  </h5>
                </div>
                <div>
                  <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "50px",
                }}
              >
                <h4>{allDeclinedProposal}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
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

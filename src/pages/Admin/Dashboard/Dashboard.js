import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";

function Dashboard() {
  const userId = window.localStorage.getItem("adminkey");

  const [allQueries, setAllQueries] = useState("");
  const [allProposal, setAllProposal] = useState("");
  const [allPendingForAllocation, setPendingForAllocation] = useState("");
  const [allPendingForPayment, setPendingForPayment] = useState("");
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

    const getPendingForPayment = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?&status=5,7`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setPendingForPayment(response.data.result.length);
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
    getPendingForPayment();
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
                  <Link to={`/admin/queriestab`}>
                    <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                  </Link>
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
                  <Link to={`/admin/queriestab`}>
                    <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                  </Link>
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
                    Pending For Payment
                  </h5>
                </div>
                <div>
                  <Link to={`/admin/proposal`}>
                    <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                  </Link>
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
                <h4>{allPendingForPayment}</h4>
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
                  <Link to={`/admin/proposal`}>
                    <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                  </Link>
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
                  <Link to={`/admin/proposal`}>
                    <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                  </Link>
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
                  <Link to={`/admin/proposal`}>
                    <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                  </Link>
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

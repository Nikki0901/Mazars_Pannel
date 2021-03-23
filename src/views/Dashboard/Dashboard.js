import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/config";


function Dashboard() {
  const userId = window.localStorage.getItem("userid");
  const [queries, setQueries] = useState("");
  const [proposal, setProposal] = useState("");
  const [assignment, setAssignment] = useState("");

  useEffect(() => {
    const getQueries = () => {
      axios
        .get(
          `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
            userId
          )}`
        )
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setQueries(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getProposal = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?uid=${JSON.parse(userId)}`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setProposal(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getAssignment = () => {
      axios
        .get(
          `${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`
        )
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setAssignment(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    getQueries();
    getProposal();
    getAssignment();
  }, []);

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <div class="row mt-3">
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-180">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">Queries</h5>
                </div>
                <div>
                  <Link to={`/customer/queries/`}>
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
                <h4>{queries === "0" ? "0" : queries}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-180">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    Proposal
                  </h5>
                </div>
                <div>
                  <Link to={`/customer/proposal/`}>
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
                <h4>{proposal === "0" ? "0" : proposal}</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-180">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    Assignment
                  </h5>
                </div>
                <div>
                  <Link to={`/customer/assignment/`}>
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
                <h4>{assignment === "" ? "0" : assignment}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

// <div class="row">
// <div class="col-sm-4">
//   <div class="card">
//     <div class="card-body">
//       <p style={{ fontSize: "24px" }}>Queries</p>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "flex-end",
//         }}
//       >
//         <h2>{queries === "0" ? "0" : queries}</h2>
//       </div>
//     </div>
//   </div>
// </div>

// <div class="col-sm-4">
//   <div class="card">
//     <div class="card-body">
//       <p style={{ fontSize: "24px" }}>Proposal</p>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "flex-end",
//         }}
//       >
//         <h2>{proposal === "0" ? "0" : proposal}</h2>
//       </div>
//     </div>
//   </div>
// </div>

// <div class="col-sm-4">
//   <div class="card">
//     <div class="card-body">
//       <p style={{ fontSize: "24px" }}>Assignment</p>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "flex-end",
//         }}
//       >
//         <h2>{assignment === "" ? "0" : assignment}</h2>
//       </div>
//     </div>
//   </div>
// </div>
// </div>

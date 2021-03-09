import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

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
      <div class="row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <p style={{ fontSize: "24px" }}>Queries</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <h2>{queries === "0" ? "0" : queries}</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <p style={{ fontSize: "24px" }}>Proposal</p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <h2>{proposal === "0" ? "0" : proposal}</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <p style={{ fontSize: "24px" }}>Assignment</p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <h2>{assignment === "0" ? "0" : assignment}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;



// {check ? (
// <div class="col-md-12">
//   <div class="schedule">
//     <Link to="/customer/select-category" class="btn btn-primary">
//       Fresh Assignment
//     </Link>
//   </div>
//   <br />
// </div>
// ) : (
//   <div class="col-md-12">
//     <ul
//       class="nav nav-pills mb-3"
//       style={{ justifyContent: "space-around" }}
//       id="pills-tab"
//       role="tablist"
//     >
//       <li class="nav-item" role="presentation">
//         <a
//           class="nav-link text-white active"
//           id="pills-Queries-tab"
//           data-toggle="pill"
//           href="#Queries"
//           role="tab"
//           aria-controls="pills-Queries"
//           aria-selected="true"
//         >
//           Incomplete
//         </a>
//       </li>

//       <li class="nav-item" role="presentation">
//         <a
//           class="nav-link text-white"
//           id="pills-Assignments-tab"
//           data-toggle="pill"
//           href="#Assignments"
//           role="tab"
//           aria-controls="pills-Assignments"
//           aria-selected="false"
//         >
//           Complete
//         </a>
//       </li>
//     </ul>

//   </div>
// )}

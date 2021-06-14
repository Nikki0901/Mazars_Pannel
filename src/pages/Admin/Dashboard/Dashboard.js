import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { values } from "lodash";


function Dashboard() {
  const userId = window.localStorage.getItem("adminkey");

  const [allQueries, setAllQueries] = useState({
    total_query: '',
    total_inprogress: '',
    total_complete: '',
    pendingfor_allocation: '',
    customer_decline: '',
    admin_decline: '',
  });

  const [proposal, setProposal] = useState({
    allproposal: '',
    pendingforacceptance: '',
    declineed: '',
  });

  const [assignment, setAssignment] = useState({
    inprogress: '',
    complete: '',
  });

  const { total_query, total_inprogress,
    total_complete, pendingfor_allocation,
    customer_decline, admin_decline } = allQueries;

  const { allproposal,
    pendingforacceptance,
    declineed, } = proposal;

  const {
    inprogress,
    complete } = assignment;


  const [value, setValue] = useState(false);
  const [allPendingForPayment, setPendingForPayment] = useState("");

  const [allDeclinedProposal, setDeclinedProposal] = useState("");
  const [pendingForAcceptence, setPendingForAcceptence] = useState("");





  useEffect(() => {
    const getAllQueries = () => {
      axios
        .get(`${baseUrl}/admin/totalComplete`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setAllQueries({
              total_query: response.data.result.total_query,
              total_inprogress: response.data.result.total_inprogress,
              total_complete: response.data.result.total_complete,
              pendingfor_allocation: response.data.result.pendingfor_allocation,
              customer_decline: response.data.result.customer_decline,
              admin_decline: response.data.result.admin_decline,
            })
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getAllProposal = () => {
      axios
        .get(`${baseUrl}/admin/getProposalsCount`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setProposal({
              allproposal: response.data.result.allproposal,
              pendingforacceptance: response.data.result.pendingforacceptance,
              declineed: response.data.result.declineed,
            })
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getAssignment = () => {
      axios
        .get(`${baseUrl}/admin/getAssignmentsCount`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setAssignment({
              inprogress: response.data.result.inprogress,
              complete: response.data.result.complete,
            })
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };


    getAllQueries();
    getAllProposal();
    getAssignment()
  }, []);


  const toggle = () => {
    setValue(!value)
  }

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>
      <div class="row mt-3">
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-info">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white info position-absolute p-1">
                    All Queries
                  </h5>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/admin/queriestab`,
                      index: 0,
                    }}
                  >
                    <i class="fa fa-tasks text-white font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <h4 class="text-white">{total_query}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-info">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white info position-absolute p-1">
                    Inprogress Queries
                  </h5>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/admin/queriestab`,
                      index: 1,
                    }}
                  >
                    <i class="fa fa-tasks text-white font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <h4 class="text-white">{total_inprogress}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-info">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white info position-absolute p-1">
                    Completed Queries
                  </h5>
                </div>
                <div>
                  <Link to={`/admin/queriestab`}>
                    <i class="fa fa-tasks text-white font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <h4 class="text-white">{total_complete}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="row mt-3">
        <div class="col-xl-6 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-info">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white info position-absolute p-1">
                    Pending For Allocation
                  </h5>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/admin/queriestab`,
                      index: 1,
                    }}
                  >
                    <i class="fa fa-tasks text-white font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <h4 class="text-white">{pendingfor_allocation}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-6 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-info">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white info position-absolute p-1">
                    Decline
                  </h5>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/admin/queriestab`,
                      index: 1,
                    }}
                  >
                    <i class="fa fa-tasks text-white font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", }}>
                <div>
                  <button type="button" class="btn btn-warning btn-sm"
                    onClick={toggle}
                  >expand</button>
                </div>
                <div>
                  <h4 class="text-white">{
                    customer_decline + admin_decline
                  }</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        value &&
        <div class="row mt-3">
          <div class="col-xl-6 col-lg-6 col-md-12">
            <div class="card pull-up ecom-card-1 bg-info">
              <div class="card-body height-100">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <h5 class="text-white info position-absolute p-1">
                      Customer Decline
                    </h5>
                  </div>
                  <div>
                    <Link
                      to={{
                        pathname: `/admin/queriestab`,
                        index: 1,
                      }}
                    >
                      <i class="fa fa-tasks text-white font-large-1 float-right p-1"></i>
                    </Link>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: "15px",
                  }}
                >
                  <h4 class="text-white">{customer_decline}</h4>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-6 col-lg-6 col-md-12">
            <div class="card pull-up ecom-card-1 bg-info">
              <div class="card-body height-100">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <h5 class="text-white info position-absolute p-1">
                      Admin Decline
                    </h5>
                  </div>
                  <div>
                    <Link
                      to={{
                        pathname: `/admin/queriestab`,
                        index: 1,
                      }}
                    >
                      <i class="fa fa-tasks text-white font-large-1 float-right p-1"></i>
                    </Link>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: "15px",
                  }}
                >
                  <h4 class="text-white">{admin_decline}</h4>
                </div>

              </div>
            </div>
          </div>
        </div>
      }


      <div class="row mt-3">
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-danger">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white  info position-absolute p-1">
                    All Proposal
                  </h5>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/admin/proposal`,
                      index: 0,
                    }}
                  >
                    <i class="fa fa-tasks text-white  font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <h4 class="text-white">{allproposal}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-danger">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white  info position-absolute p-1">
                    Pending For Acceptence
                  </h5>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/admin/proposal`,
                      index: 1,
                    }}
                  >
                    <i class="fa fa-tasks text-white  font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <h4 class="text-white">{pendingforacceptance}</h4>
              </div>
            </div>
          </div>
        </div>



        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-danger">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white  info position-absolute p-1">
                    Declined Proposal
                  </h5>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/admin/proposal`,
                      index: 2,
                    }}
                  >
                    <i class="fa fa-tasks text-white  font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <h4 class="text-white">{declineed}</h4>
              </div>
            </div>
          </div>
        </div>


      </div>



      <div class="row mt-3">
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-primary">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white info position-absolute p-1">
                    Unpaid
                  </h5>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/admin/queriestab`,
                      index: 3,
                    }}
                  >
                    <i class="fa fa-tasks text-white font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <h4 class="text-white">{allPendingForPayment}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-primary">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white info position-absolute p-1">
                    Paid
                  </h5>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/admin/queriestab`,
                      index: 3,
                    }}
                  >
                    <i class="fa fa-tasks text-white font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <h4 class="text-white">{allPendingForPayment}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div class="row mt-3">

      <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-success">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white info position-absolute p-1">
                    Total Assignment 
                  </h5>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/admin/queriestab`,
                      index: 3,
                    }}
                  >
                    <i class="fa fa-tasks text-white font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <h4 class="text-white">{complete + inprogress}</h4>
              </div>
            </div>
          </div>
        </div>


        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-success">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white info position-absolute p-1">
                    Inprogress
                  </h5>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/admin/queriestab`,
                      index: 3,
                    }}
                  >
                    <i class="fa fa-tasks text-white font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <h4 class="text-white">{inprogress}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-success">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white info position-absolute p-1">
                   Complete
                  </h5>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/admin/queriestab`,
                      index: 3,
                    }}
                  >
                    <i class="fa fa-tasks text-white font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <h4 class="text-white">{complete}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}

export default Dashboard;



// {
//   Object.keys(response.data.result[0]).map((key, i ,value) => (
//     console.log(key,i,value)
//   )
//   )
// }

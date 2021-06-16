import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import {
  Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';

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
    pendingforPreperation: '',
    declineed: '',
    InProgress: '',
  });

  const [assignment, setAssignment] = useState({
    inprogress: '',
    complete: '',
  });

  const [payment, setPayment] = useState({
    paid: '',
    unpaid: '',
  });

  const { total_query, total_inprogress,
    total_complete, pendingfor_allocation,
    customer_decline, admin_decline } = allQueries;

  const { allproposal,
    pendingforacceptance,
    declineed, pendingforPreperation, InProgress } = proposal;

  const {
    inprogress,
    complete } = assignment;

  const {
    paid,
    unpaid } = payment;

  const [value, setValue] = useState(false);
  const [valueProposal, setValueProposal] = useState(false);
  const [valueProposal2, setValueProposal2] = useState(false);
  const [valuePayment, setValuePayment] = useState(false);
  const [valueAssignment, setValueAssignment] = useState(false);






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
              pendingforPreperation: response.data.result.pendingforPreperation,
              InProgress: response.data.result.InProgress,
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

    const getPayment = () => {
      axios
        .get(`${baseUrl}/admin/getAssignmentsPaymentCount`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setPayment({
              paid: response.data.result.paid,
              unpaid: response.data.result.unpaid,
            })
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    getAllQueries();
    getAllProposal();
    getPayment();
    getAssignment();
  }, []);


  const toggle = () => {
    setValue(!value)
  }

  const toggleProposal = () => {
    setValueProposal(!valueProposal)
  }

  const toggleProposal2 = () => {
    setValueProposal2(!valueProposal2)
  }

  const togglePayment = () => {
    setValuePayment(!valuePayment)
  }

  const toggleAssignment = () => {
    setValueAssignment(!valueAssignment)
  }

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>
      <div class="row mt-3">
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-info">
            <div class="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p class="text-white info">
                    All Queries
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p class="text-white">{total_query}</p>
                  {/* <Link
                    to={{
                      pathname: `/admin/queriestab`,
                      index: 0,
                    }}
                  >
                    <i class="fa fa-tasks text-white"></i>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-info">
            <div class="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p class="text-white info">
                    Inprogress Queries
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p class="text-white">{total_inprogress + pendingfor_allocation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-info">
            <div class="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p class="text-white info">
                    Completed Queries
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p class="text-white">{total_complete}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="row mt-3">

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-info">
            <div class="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p class="text-white info">
                    Decline
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p onClick={toggle} title="Expand"
                    style={{ cursor: "pointer", color: "white" }}>
                    {
                      customer_decline + admin_decline
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        value &&
        <div class="row mt-3">

          <div class="col-xl-4 col-lg-6 col-md-12">
            <div class="card pull-up ecom-card-1 bg-info">
              <div class="card-body">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p class="text-white info">
                      Customer Decline
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p class="text-white">{customer_decline}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-6 col-md-12">
            <div class="card pull-up ecom-card-1 bg-info">
              <div class="card-body">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p class="text-white info">
                      Admin Decline
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p class="text-white">{admin_decline}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      }


      <div class="row mt-3">

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-secondary">
            <div class="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p class="text-white info">
                    All Proposal
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p onClick={toggleProposal} title="Expand"
                    style={{ cursor: "pointer", color: "white" }}>
                    {
                      allproposal
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-secondary">
            <div class="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p class="text-white info">
                    In Progress
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p onClick={toggleProposal2} title="Expand"
                    style={{ cursor: "pointer", color: "white" }}>
                    {
                      InProgress
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


      {
        valueProposal &&
        <div class="row mt-3">

          <div class="col-xl-4 col-lg-6 col-md-12">
            <div class="card pull-up ecom-card-1 bg-secondary">
              <div class="card-body">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p class="text-white info">
                      Pending for Acceptance
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p class="text-white">{pendingforacceptance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-6 col-md-12">
            <div class="card pull-up ecom-card-1 bg-secondary">
              <div class="card-body">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p class="text-white info">
                      Declined
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p class="text-white">{declineed}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      }

      {
        valueProposal2 &&
        <div class="row mt-3">
          <div class="col-xl-4 col-lg-6 col-md-12">
            <div class="card pull-up ecom-card-1 bg-secondary">
              <div class="card-body">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p class="text-white info">
                      Pending for Acceptance
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p class="text-white">{pendingforacceptance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="col-xl-4 col-lg-6 col-md-12">
            <div class="card pull-up ecom-card-1 bg-secondary">
              <div class="card-body">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p class="text-white info">
                      Pending for Preperation
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p class="text-white">{pendingforPreperation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <div class="row mt-3">

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1" style={{ background: "#a07a5f" }}>
            <div class="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p class="text-white info">
                    All payment
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p onClick={togglePayment} title="Expand"
                    style={{ cursor: "pointer", color: "white" }}>
                    {unpaid + paid}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {
          valuePayment &&

          <div class="col-xl-4 col-lg-6 col-md-12">
            <div class="card pull-up ecom-card-1" style={{ background: "#a07a5f" }}>
              <div class="card-body">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p class="text-white info">
                      Unpaid
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p class="text-white">{unpaid}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        {
          valuePayment &&
          <div class="col-xl-4 col-lg-6 col-md-12">
            <div class="card pull-up ecom-card-1" style={{ background: "#a07a5f" }}>
              <div class="card-body">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p class="text-white info">
                      Paid
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p class="text-white">{paid}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        }


      </div>



      <div class="row mt-3">

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1" style={{ background: "#549263" }}>
            <div class="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p class="text-white info">
                    Total Assignment
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p onClick={toggleAssignment} title="Expand"
                    style={{ cursor: "pointer", color: "white" }}>
                    {complete + inprogress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          valueAssignment &&

          <div class="col-xl-4 col-lg-6 col-md-12">
            <div class="card pull-up ecom-card-1" style={{ background: "#549263" }}>
              <div class="card-body">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p class="text-white info">
                      Inprogress
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p class="text-white">{inprogress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        }

        {
          valueAssignment &&

          <div class="col-xl-4 col-lg-6 col-md-12">
            <div class="card pull-up ecom-card-1" style={{ background: "#549263" }}>
              <div class="card-body">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p class="text-white info">
                      Complete
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p class="text-white">{complete}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
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



{/* <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-secondary">
            <div class="card-body height-100">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white  info position-absolute p-1">
                    Pending for Preperation
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
                <h4 class="text-white">{pendingforPreperation}</h4>
              </div>
            </div>
          </div>
        </div> */}

{/* <div class="card bg-info">
            <div class="card-body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-white info">
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
                    <i class="fa fa-tasks text-white"></i>
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
          </div> */}
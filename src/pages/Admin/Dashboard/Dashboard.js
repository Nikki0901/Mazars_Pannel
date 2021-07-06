import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";



function Dashboard() {
  const userId = window.localStorage.getItem("adminkey");

  const [allQueries, setAllQueries] = useState({
    total: '',
    inprogress_queries: '',
    inprogress_allocation: '',
    inprogress_proposal: '',
    inprogress_assignment: '',
    complete_query: '',
    declined_queries: '',
    admin_declined_query: '',
    customer_declined_Query: '',
    customer_declined_proposal: '',
    Customer_declined_payment: '',

    allproposal: '',
    accepted_proposals: '',
    InProgress: '',
    inprogress_preparation: '',
    inprogress_acceptance: '',
    declined: '',
  });


  const [assignment, setAssignment] = useState({
    inprogress: '',
    complete: '',
    client_discussion: '',
    draft_report: '',
    final_discussion: '',
    final_report: '',
    complete_inprocess: '',
    customer_declined_payment: ''
  });

  const [payment, setPayment] = useState({
    paid: '',
    unpaid: '',
  });

  const { total, inprogress_queries,
    inprogress_allocation, inprogress_proposal,
    inprogress_assignment, complete_query,
    declined_queries, admin_declined_query,
    customer_declined_Query, customer_declined_proposal,
    Customer_declined_payment,
    allproposal,
    inprogress_preparation,
    declined, inprogress_acceptance,
    accepted_proposals, InProgress } = allQueries;


  const {
    inprogress,
    complete, client_discussion, draft_report, final_discussion,
    final_report, complete_inprocess,
    customer_declined_payment } = assignment;

  const {
    paid,
    unpaid } = payment;


  useEffect(() => {
    const getAllQueries = () => {
      axios
        .get(`${baseUrl}/admin/totalComplete`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setAllQueries({
              total: response.data.result.total,
              inprogress_queries: response.data.result.inprogress_queries,
              inprogress_allocation: response.data.result.inprogress_allocation,
              inprogress_proposal: response.data.result.inprogress_proposal,
              inprogress_assignment: response.data.result.inprogress_assignment,
              complete_query: response.data.result.complete_query,
              declined_queries: response.data.result.declined_queries,
              admin_declined_query: response.data.result.admin_declined_query,
              customer_declined_Query: response.data.result.customer_declined_Query,
              customer_declined_proposal: response.data.result.customer_declined_proposal,
              Customer_declined_payment: response.data.result.Customer_declined_payment,

              allproposal: response.data.result.proposal.allproposal,
              InProgress: response.data.result.proposal.InProgress,
              inprogress_preparation: response.data.result.proposal.inprogress_preparation,
              inprogress_acceptance: response.data.result.proposal.inprogress_acceptance,
              accepted_proposals: response.data.result.proposal.accepted_proposals,
              declined: response.data.result.proposal["customer_declined_proposals "],
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
              client_discussion: response.data.result.client_discussion,
              draft_report: response.data.result.draft_report,
              final_discussion: response.data.result.final_discussion,
              final_report: response.data.result.final_report,
              complete_inprocess: response.data.result.complete_inprocess,
              customer_declined_payment: response.data.result.customer_declined_payment,
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
    getPayment();
    getAssignment();
  }, []);

  console.log("declined", declined)

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>

      <div class="card">
        <div class="card-header">
          All Queries :  {total}
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Inprogress Queries</th>
                <th scope="col">{inprogress_queries}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Inprogress; Allocation</td>
                <td>{inprogress_allocation}</td>
              </tr>
              <tr>
                <td>Inprogress; Proposals</td>
                <td>{inprogress_proposal}</td>
              </tr>
              <tr>
                <td>Inprogress; Assignments</td>
                <td>{inprogress_assignment}</td>
              </tr>
            </tbody>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Completed Queries</th>
                <th scope="col">{complete_query}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Completed; Assignments</td>
                <td>{complete_query}</td>
              </tr>
            </tbody>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Declined Queries</th>
                <th scope="col">{declined_queries}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Admin Declined; Queries</td>
                <td>{admin_declined_query}</td>
              </tr>
              <tr>
                <td> Customer Declined; Queries</td>
                <td>{customer_declined_Query}</td>
              </tr>
              <tr>
                <td>Customer Declined; Proposals</td>
                <td>{customer_declined_proposal}</td>
              </tr>
              <tr>
                <td>Customer Declined; Payment</td>
                <td>{Customer_declined_payment}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>


      <div class="card">
        <div class="card-header">
        All Proposals :  {allproposal}
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Inprogress Proposals</th>
                <th scope="col">{InProgress}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Inprogress; Preparation</td>
                <td>{inprogress_preparation}</td>
              </tr>
              <tr>
                <td>Inprogress; Acceptance</td>
                <td>{inprogress_acceptance}</td>
              </tr>
            </tbody>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Accepted; Proposals </th>
                <th scope="col">{accepted_proposals}</th>
              </tr>
            </thead>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Customer Declined; Proposals</th>
                <th scope="col">{declined}</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>


      <div class="card">
        <div class="card-header">
        All Assignments :  {inprogress + complete + +(customer_declined_payment)}
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Inprogress Assignments</th>
                <th scope="col">{inprogress}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Client Discussion</td>
                <td>{client_discussion}</td>
              </tr>
              <tr>
                <td>Draft Reports</td>
                <td>{draft_report}</td>
              </tr>
              <tr>
                <td>Final Discussion</td>
                <td>{final_discussion}</td>
              </tr>
              <tr>
                <td>Delivery of Final Reports</td>
                <td>{final_report}</td>
              </tr>
              <tr>
                <td>Awaiting Completion</td>
                <td>{complete_inprocess}</td>
              </tr>
            </tbody>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Completed; Assignments</th>
                <th scope="col">{complete}</th>
              </tr>
            </thead>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Customer Declined; Payment</th>
                <th scope="col">{customer_declined_payment}</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>


      <div class="card">
        <div class="card-header">
        All Payments :  {unpaid + paid}
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Paid</th>
                <th scope="col">{paid}</th>
              </tr>
            </thead>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Unpaid</th>
                <th scope="col">{unpaid}</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
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
{/* <div class="row mt-3">
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
      </div> */}


{/* <div class="row mt-3">

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
      } */}

{/* 
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

      </div> */}


{/* {
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
      } */}
{/* 
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
      </div> */}



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


  // const toggle = () => {
  //   setValue(!value)
  // }

  // const toggleProposal = () => {
  //   setValueProposal(!valueProposal)
  // }

  // const toggleProposal2 = () => {
  //   setValueProposal2(!valueProposal2)
  // }

  // const togglePayment = () => {
  //   setValuePayment(!valuePayment)
  // }

  // const toggleAssignment = () => {
  //   setValueAssignment(!valueAssignment)
  // }

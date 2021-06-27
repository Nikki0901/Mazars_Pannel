import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";

function Dashboard() {
  const userid = window.localStorage.getItem("tlkey");

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
        .get(`${baseUrl}/admin/totalComplete?itl_d=${JSON.parse(userid)}`)
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
        .get(`${baseUrl}/admin/getAssignmentsCount?itl_d=${JSON.parse(userid)}`)
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
        .get(`${baseUrl}/admin/getAssignmentsPaymentCount?itl_d=${JSON.parse(userid)}`)
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



  var todaysDate = new Date();
  console.log(todaysDate);

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>


      <div class="card ecom-card-1" style={{ background: "#c74e07" }}>
        <div class="card-header">
          <p class="mb-0">
            <button class="btn btn-link text-white"
              style={{ textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}
            >
              All Queries :  {total}
            </button>
          </p>
        </div>

        <div class="card-body" style={{ background: "#c36d56", fontFamily: "monospace" }}>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Inprogress Queries</th>
                <th scope="col">{inprogress_queries}</th>
              </tr>
            </thead>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Completed Queries</th>
                <th scope="col">{complete_query}</th>
              </tr>
            </thead>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Declined Queries</th>
                <th scope="col">{declined_queries}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>


      <div class="card ecom-card-1 bg-info">
        <div class="card-header">
          <p class="mb-0">
            <button class="btn btn-link text-white"
              style={{ textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}
            >
              Proposals :  {allproposal}
            </button>
          </p>
        </div>

        <div class="card-body" style={{ background: "#5dabb9", fontFamily: "monospace" }}>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Inprogress</th>
                <th scope="col">{InProgress}</th>
              </tr>
            </thead>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Accepted Proposal </th>
                <th scope="col">{accepted_proposals}</th>
              </tr>
            </thead>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Customer Declined Proposal</th>
                <th scope="col">{declined}</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>

      </div>


      <div class="card ecom-card-1" style={{ background: "#2ea226" }}>
        <div class="card-header">
          <p class="mb-0">
            <button class="btn btn-link text-white"
              style={{ textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}
            >
              Assignments :  {inprogress + complete + +(customer_declined_payment)}
            </button>
          </p>
        </div>

        <div class="card-body" style={{ background: "#288836", fontFamily: "monospace" }}>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Inprogress</th>
                <th scope="col">{inprogress}</th>
              </tr>
            </thead>         
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Completed</th>
                <th scope="col">{complete}</th>
              </tr>
            </thead>
          </table>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col" style={{ width: "400px" }}>Customer Declined Payment</th>
                <th scope="col">{customer_declined_payment}</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>

      </div>



      <div class="card ecom-card-1" style={{ background: "#ffc107" }}>
        <div class="card-header">
          <p class="mb-0">
            <button class="btn btn-link text-white"
              style={{ textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}
            >
              Payments :  {unpaid + paid}
            </button>
          </p>
        </div>

        <div class="card-body" style={{ background: "#a98a0aba", fontFamily: "monospace" }}>

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

// var todaysDate = new Date();
//   console.log(todaysDate);
// function convertDate(date) {
//   var yyyy = date.getFullYear().toString();
//   var mm = (date.getMonth() + 1).toString();
//   var dd = date.getDate().toString();

//   var mmChars = mm.split("");
//   var ddChars = dd.split("");

//   return (
//     yyyy +
//     "-" +
//     (mmChars[1] ? mm : "0" + mmChars[0]) +
//     "-" +
//     (ddChars[1] ? dd : "0" + ddChars[0])
//   );
// }

// console.log(convertDate(todaysDate));

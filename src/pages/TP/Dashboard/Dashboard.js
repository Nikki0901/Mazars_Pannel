import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "../../../../node_modules/react-tabs/style/react-tabs.css";

import Layout from "../../../components/Layout/Layout";

function Dashboard() {
  const userid = window.localStorage.getItem("tpkey");
  const [incomplete, setIncomplete] = useState("");
  // const [complete, setcomplete] = useState("");

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
    totalpayment: '',
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
    unpaid,
    totalpayment } = payment;



  useEffect(() => {

    const getAllQueries = () => {
      axios
        .get(`${baseUrl}/admin/totalComplete?tp_id=${JSON.parse(userid)}`)
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
        .get(`${baseUrl}/admin/getAssignmentsCount?tp_id=${JSON.parse(userid)}`)
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
        .get(`${baseUrl}/admin/getAssignmentsPaymentCount?tp_id=${JSON.parse(userid)}`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setPayment({
              paid: response.data.result.paid,
              unpaid: response.data.result.unpaid,
              totalpayment: response.data.result.totalpayment,
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



  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
      <div class="row mt-3">
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-150">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    Inprogress
                  </h5>
                </div>
                <div>
                  <Link to={`/teamleader/queriestab`}>
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
                <h4>{incomplete}</h4>
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
                    Complete
                  </h5>
                </div>
                <div>
                  <Link to={`/teamleader/queriestab`}>
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
                <h4>{complete}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
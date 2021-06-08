import React from "react";
import CommonServices from "../../common/common";
import DownloadLink from "react-download-link";
import axios from "axios";
import { baseUrl } from "../../config/config";

function ProposalDetails({
  diaplayProposal,
  diaplayHistory,
  paymentDetails,
  p,
}) {
  const {
    amount,
    accepted_amount,
    payment_received,
    cust_accept_date,
    proposal_date,
    misc2,
  } = diaplayProposal;

  const { tlname, date_of_allocation } = diaplayHistory;

  const userId = window.localStorage.getItem("userid");

  console.log("p", p.query_status);

  // CommonServices.removeTime(proposal_date);

  // const url = `https://mazarsapi.multitvsolution.com/mazarapi/v1/customers/dounloadpdf?id=28`;

  // const getDataFromURL = (url) =>
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       fetch(url)
  //         .then((response) => response.text())
  //         .then((data) => {
  //           console.log("res",data)
  //           resolve(data);
  //         });
  //     });
  //   }, 2000);

  const getProposalData = () => {
    axios
      .get(`${baseUrl}/customers/dounloadpdf?id=28`)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <div>
        <p
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "18px",
          }}
        >
          PROCESSING OF QUERY
        </p>
        <div>
          <DownloadLink
            label={"Download"}
            filename={"filename.pdf"}
            exportFile={getProposalData}
          />
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Titles</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Date of Allocation</th>
              <td>{CommonServices.changeFormateDate(date_of_allocation)}</td>
            </tr>
            <tr>
              <th scope="row">Name of Team Leader</th>
              <td>{tlname}</td>
            </tr>
            <tr>
              <th scope="row">Name of Tax Professional(s)</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Date of Proposal</th>
              <td>{CommonServices.removeTime(proposal_date)}</td>
            </tr>
            <tr>
              <th scope="row">Proposal Description</th>
              <td>{misc2}</td>
            </tr>
            <tr>
              <th scope="row">Proposed Amount</th>
              <td>{amount}</td>
            </tr>
            <tr>
              <th scope="row">Proposal Status</th>
              <td>
                {p.query_status == "4" && "pending"}
                {p.query_status == "6" && "Declined"}
                {(p.query_status == "5" || p.query_status > 6) && "Accepted"}
              </td>
            </tr>
            <tr>
              <th scope="row">Amount Accepted</th>
              <td>{accepted_amount}</td>
            </tr>
            <tr>
              <th scope="row">Date of Acceptance</th>
              <td>{CommonServices.removeTime(cust_accept_date)}</td>
            </tr>
            <tr>
              <th scope="row">Payment Terms</th>
              <td>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
                {paymentDetails.map((pay, i) => (
                  <tr>
                    <td>{CommonServices.removeTime(pay.payment_date)}</td>
                    <td>{pay.paid_amount}</td>
                  </tr>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Payment Received</th>
              <td>{payment_received}</td>
            </tr>
            <tr>
              <th scope="row">Payment Due</th>
              <td>{accepted_amount - payment_received}</td>
            </tr>
            <tr>
              <th scope="row">Payment Outstanding</th>
              <td>{accepted_amount - payment_received}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProposalDetails;

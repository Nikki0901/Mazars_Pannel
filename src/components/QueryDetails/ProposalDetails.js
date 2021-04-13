import React from "react";
import CommonServices from "../../common/common";

function ProposalDetails({ diaplayProposal, diaplayHistory }) {
  const {
    amount,
    accepted_amount,
    payment_received,
    cust_accept_date,
    proposal_date,
    misc2,
  } = diaplayProposal;

  const { tlname, date_of_allocation } = diaplayHistory;

  // CommonServices.removeTime(proposal_date);
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
              <td></td>
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
                <tr>
                  <td>{CommonServices.removeTime(cust_accept_date)}</td>
                  <td>{payment_received}</td>
                </tr>
              </td>
            </tr>
            <tr>
              <th scope="row">Payment Received</th>
              <td>{payment_received}</td>
            </tr>
            <tr>
              <th scope="row">Payment Due</th>
              <td></td>
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

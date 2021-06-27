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
    description,

    amount_type,
    amount_fixed,
    amount_hourly,
    payment_terms,
    no_of_installment,
    installment_amount,
    due_date,
  } = diaplayProposal;

  const { tlname, date_of_allocation } = diaplayHistory;


  console.log("diaplayProposal", diaplayProposal);
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
              <th scope="col" style={{ width: "400px" }}>Titles</th>
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
              <td>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                {CommonServices.removeTime(proposal_date)}
                  {proposal_date && (
                    <a
                      class="btn btn-primary btn-sm"
                      href={`${baseUrl}/customers/dounloadpdf?id=${p.id}`}
                      role="button"
                    >
                      Download
                    </a>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Scope of Work</th>
              <td>{description}</td>
            </tr>

            <tr>
              <th scope="row">Amount</th>
              <td>
                <tr>
                  <th>Amount Type</th>
                  <th>Price</th>
                </tr>
                <tr>
                  <td>{amount_type}</td>
                  <td>
                    {
                      amount_type == "fixed" ?
                        amount_fixed
                        :
                        amount_type == "hourly" ?
                          amount_hourly
                          :
                          amount_type == "mixed" ?
                            <div>
                              <p>Fixed : {amount_fixed}</p>
                              <p>Hourly : {amount_hourly}</p>
                            </div>
                            :
                            ""
                    }
                  </td>
                </tr>
              </td>
            </tr>

            <tr>
              <th scope="row">Payment Terms</th>
              {
                payment_terms == "Lumpsum" ?
                  <td>
                    <tr>
                      <th>Payment Type</th>
                      <th>Due Dates</th>
                    </tr>
                    <tr>
                      <td>{payment_terms}</td>
                      <td>{due_date}</td>
                    </tr>
                  </td>
                  :
                  payment_terms == "installment" ?
                    <td>
                      <tr>
                        <th>Payment Type</th>
                        <th>No of Installments</th>
                        <th>Installment Amount</th>
                        <th>Due Dates</th>
                      </tr>
                      <tr>
                        <td>{payment_terms}</td>
                        <td>{no_of_installment}</td>
                        <td>{installment_amount}</td>
                        <td>{due_date}</td>
                      </tr>
                    </td>
                    :
                    ""
              }

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
              <th scope="row">Payment History</th>
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

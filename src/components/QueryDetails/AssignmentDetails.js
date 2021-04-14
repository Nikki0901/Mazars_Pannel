import React from "react";
import CommonServices from "../../common/common";

function AssignmentDetails({ p, diaplayAssignment }) {
  const {
    assignment_number,
    assignment_date,
    date_of_delivery,
  } = diaplayAssignment;

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
          PROCESSING OF ASSIGNMENT
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
              <th scope="row">Assignment Number</th>
              <td>{assignment_number}</td>
            </tr>
            <tr>
              <th scope="row">Assignment Date</th>
              <td>{CommonServices.removeTime(assignment_date)}</td>
            </tr>
            <tr>
              <th scope="row">Proposed Date of Completion</th>
              <td>{CommonServices.removeTime(date_of_delivery)}</td>
            </tr>
            {/* {p.query_status >= 9 ? ( */}
              <tr>
                <th scope="row">Assignment Status</th>
                <td>
                  <tr>
                    <th>Assignment Stage</th>
                    <th>Status</th>
                  </tr>
                  <tr>
                    <td>Client Discussion</td>
                    <td>{p.client_discussion}</td>
                  </tr>
                  <tr>
                    <td>Draft report</td>
                    <td>{p.draft_report}</td>
                  </tr>
                  <tr>
                    <td>Final Discussion</td>
                    <td>{p.final_discussion}</td>
                  </tr>
                  <tr>
                    <td> Delivery of report</td>
                    <td>{p.delivery_report}</td>
                  </tr>
                  <tr>
                    <td>Complete</td>
                    <td>{p.other_stage}</td>
                  </tr>
                </td>
              </tr>
            {/* ) : null} */}
            <tr>
              <th scope="row">Time taken to complete the assignment</th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AssignmentDetails;

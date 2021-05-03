import React from "react";
import CommonServices from "../../common/common";

function AssignmentDetails({ p, diaplayAssignment, diaplayProposal }) {
  const {
    assignment_number,
    assignment_date,
    date_of_delivery,
  } = diaplayAssignment;

  const { cust_accept_date } = diaplayProposal;

  const timeTaken = (a, b) => {
    var date2 = CommonServices.removeTime(a);
    var date1 = CommonServices.removeTime(b);

    console.log("a", date2);
    console.log("b", date1);

    // var difference = Math.abs(date2 - date1);
    // var days = difference / (1000 * 3600 * 24);
    var difference =  Math.round((date2-date1)/(1000*60*60*24));
    console.log(difference);
    // var difference = date2.getTime() - date1.getTime();
    // return difference;
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
              <td>
                {p.query_status >= 9 ? (
                  <p>{CommonServices.removeTime(p.Exp_Delivery_Date)}</p>
                ) : null}
              </td>
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
              <td>
                {p.client_discussion == "completed" &&
                p.delivery_report == "completed" &&
                p.draft_report == "completed" &&
                p.final_discussion == "completed" &&
                p.other_stage == "completed"
                  ? CommonServices.removeTime(p.final_date)
                  : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AssignmentDetails;

// {timeTaken(p.final_date,cust_accept_date)}



// function parseDate(str) {
//   var mdy = str.split('/');
//   return new Date(mdy[2], mdy[0]-1, mdy[1]);
// }

// function datediff(first, second) {
//   // Take the difference between the dates and divide by milliseconds per day.
//   // Round to nearest whole number to deal with DST.
//   return Math.round((second-first)/(1000*60*60*24));
// }

// alert(datediff(parseDate(first.value), parseDate(second.value)));
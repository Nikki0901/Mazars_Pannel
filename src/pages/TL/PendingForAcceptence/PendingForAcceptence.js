import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";


function PendingForAcceptence({ p, getPendingforAcceptance }) {
  const alert = useAlert();
  const userid = window.localStorage.getItem("tlkey");

  const acceptHandler = (key) => {
    console.log("acceptHandler", key);

    let formData = new FormData();
    formData.append("set", 1);
    formData.append("tlid", JSON.parse(userid));
    formData.append("assignment_id", key);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/AcceptRejectQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("response-", response);
        if (response.data.code === 1) {
          console.log(response.data.result);
          getPendingforAcceptance();
          alert.success("Query successfully accepted !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  

  const rejectHandler = (key) => {
    console.log("rejectHandler", key);

    let formData = new FormData();
    formData.append("set", 0);
    formData.append("tlid", JSON.parse(userid));
    formData.append("assignment_id", key);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/AcceptRejectQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) { 
          getPendingforAcceptance();
          alert.success("Query successfully rejected !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


   // change date format
   function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("-");
  }

  return (
    <>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Date.</th>
                <th scope="col">Query No .</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Facts of the Case</th>
                <th scope="col">Exp. Delivery Date</th>
                <th scope="col">Accept / Reject</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ChangeFormateDate(p.date_of_completion)}</td>
                <th scope="row">
                  <Link to={`/teamleader/queries/${p.id}`}>
                    {p.assign_no}
                  </Link>
                </th>
                <td>{p.name}</td>
                <td>{p.fact_case}</td>
                <td>{p.Exp_Delivery_Date}</td>
                <td>


                {
                  p.accept == "1" ?
                
                    <div id="div2" class="text-center">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          color: "#6967ce",
                        }}
                      >
                        <Link to={`/teamleader/addassingment/${p.id}`}>
                          <i class="fa fa-tasks"></i>
                        </Link>

                        <Link to={`/teamleader/queryassing/${p.id}`}>
                          <i class="fa fa-share"></i>
                        </Link>
                      </div>
                    </div>
                        :   
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        color: "#6967ce",
                      }}
                      id="div1"
                    >
                      <div
                        id="accept"
                        title="Accept Assignment"
                        onClick={() => acceptHandler(p.id)}
                      >
                        <i class="fa fa-check"></i>
                      </div>
                      <div
                        id="reject"
                        title="Reject Assignment"
                        onClick={() => rejectHandler(p.id)}
                      >
                        <i class="fa fa-times"></i> 
                      </div>
                    </div>    
                    }
                 

                </td>
              </tr>
              <tr>
                <td></td>
                <th scope="row"></th>
                <td></td>
                <td>{p.Fact}</td>
                <td></td>
                <td class="bg-danger text-white">
                  Query not rejected within 24 hours will be deemed accepted.
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default PendingForAcceptence;










  /* {display === "showR" && (
                  <div
                    id="reject"
                    title="Reject Assignment"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      color: "#6967ce",
                    }}
                  >
                    <div>
                      <i class="fa fa-times"></i>
                    </div>
                  </div>
                )} */






// {display === p.accept && (
//   <div id="div2" class="text-center">
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-evenly",
//         color: "#6967ce",
//       }}
//     >
//       <Link to={`/teamleader/addassingment/${p.id}`}>
//         <i class="fa fa-tasks"></i>
//       </Link>

//       <Link to={`/teamleader/queryassing/${p.id}`}>
//         <i class="fa fa-share"></i>
//       </Link>
//     </div>
//   </div>
// )}

// {p.accept === accept && (
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "space-evenly",
//       color: "#6967ce",
//     }}
//     id="div1"
//   >
//     <div
//       id="accept"
//       title="Accept Assignment"
//       onClick={() => acceptHandler(p.id)}
//     >
//       <i class="fa fa-check"></i>
//     </div>
//     <div
//       id="reject"
//       title="Reject Assignment"
//       onClick={() => rejectHandler(p.id)}
//     >
//       <i class="fa fa-times"></i> 
//     </div>
//   </div>
// )}

// {display === "showA" && (
//   <div id="div2" class="text-center">
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-evenly",
//         color: "#6967ce",
//       }}
//     >
//       <Link to={`/teamleader/addassingment/${p.id}`}>
//         <i class="fa fa-tasks"></i>
//       </Link>

//       <Link to={`/teamleader/queryassing/${p.id}`}>
//         <i class="fa fa-share"></i>
//       </Link>
//     </div>
//   </div>
// )}
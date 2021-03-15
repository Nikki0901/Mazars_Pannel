import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { useAlert } from "react-alert";

function PaymentStatus() {
  const alert = useAlert();
  const userid = window.localStorage.getItem("tlkey");
  const cust_id = window.localStorage.getItem("userid");

  const [payment, setPayment] = useState([]);

  useEffect(() => {
    getPaymentStatus();
  }, []);

  const getPaymentStatus = () => {
    axios.get(`${baseUrl}/tl/getUploadedProposals`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPayment(res.data.result);
      }
    });
  };

  // accepted proposal
  const accepted = (key) => {
    console.log("acc", key);

    let formData = new FormData();
    formData.append("id", key);
    formData.append("status", 7);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/ProposalAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          getPaymentStatus();
          alert.success("accepted !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  // rejected proposal
  // const rejected = (key) => {
  //   console.log("rej", key);
  // };

  const makeAssignment = (key) => {
    console.log("makeAssignment", key);

    let formData = new FormData();
    formData.append("proposal_id", key.id);
    formData.append("q_id", key.assign_id);
    formData.append("tl_id", JSON.parse(userid));
    formData.append("customer_id", JSON.parse(cust_id));

    axios({
      method: "POST",
      url: `${baseUrl}/tl/MakeAssignment`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          getPaymentStatus();
          alert.success("accepted assignment!");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  function checkStatus(p, a) {
    console.log("paid -", p);
    console.log("acc -", a);

    if (p > 0 && p < a) {
      return "Partial Received ";
    } else     
    if (p === a && p > 0) {
      return "Full Received";
    } else {
      return "pending";
    }
  }


  return (
    <>
      <Layout TLDashboard="TLDashboard" TLuserId={userid}>
        <Card>
          <CardHeader>
            <Row>
              <Col md="7">
                <CardTitle tag="h4">Payment Status</CardTitle>
              </Col>
              <Col md="5"></Col>
            </Row>
          </CardHeader>
          <CardBody>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Query No</th>
                  <th>Customer Name</th>
                  <th>Negotiated Amount</th>
                  <th>Accepted Amount</th>
                  <th>Paid Amount</th>
                  <th>status</th>
                  <th style={{ textAlign: "center" }}>Accept Amount</th>
                  <th>Accept as Assignment</th>
                </tr>
              </thead>
              <tbody>
                {payment.length > 0 ? (
                  payment.map((p, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{p.assign_no}</td>
                      <td>{p.name}</td>
                      <td>{p.negotiated_amount}</td>
                      <td>{p.accepted_amount}</td>
                      <td>{p.paid_amount}</td>
                      <td>
                        {checkStatus(
                          Number(p.paid_amount),
                          Number(p.accepted_amount)
                        )}
                      </td>
                      <td>
                        {p.negotiated_amount === "0" &&
                        p.accepted_amount === "0" ? (
                          ""
                        ) : p.negotiated_amount && p.accepted_amount === "0" ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <div style={{ cursor: "pointer" }}>
                              <i
                                class="fa fa-check"
                                onClick={() => accepted(p.assign_id)}
                              ></i>
                            </div>
                            
                          </div>
                        ) : (
                          ""
                        )}
                      </td>

                      <td>
                        <div style={{ textAlign: "center" }}>
                          {p.paid_amount > 0 && (
                            <div>
                              <i
                                class="fa fa-check"
                                style={{ cursor: "pointer" }}
                                onClick={() => makeAssignment(p)}
                              ></i>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No Records</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
}

export default PaymentStatus;

/* <tbody>
              <tr>
                  <td>1</td>
                  <td>123</td>
                  <td>Net banking</td>
                  <td>
                  <div style={{display:"flex", justifyContent:"space-evenly"}}>
                     <div>A</div>
                     <div>B</div>
                  </div>  
                  </td>               
                </tr>
              </tbody> */

// {p.negotiated_amount === "0" ? (
// <div
//   style={{
//     display: "flex",
//     justifyContent: "space-evenly",
//   }}
// >
//   <div style={{ cursor: "pointer" }}>
//     <i
//       class="fa fa-check"
//       onClick={() => accepted(p.assign_id)}
//     ></i>
//   </div>
//   <div style={{ cursor: "pointer" }}>
//     <i
//       class="fa fa-times"
//       onClick={() => rejected(p.assign_id)}
//     ></i>
//   </div>
// </div>
// ) : null}

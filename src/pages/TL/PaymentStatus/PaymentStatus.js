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

function PaymentStatus() {
  const userid = window.localStorage.getItem("tlkey");

  const [payment, setPayment] = useState([]);

  useEffect(() => {
    const getPaymentStatus = () => {
      axios.get(`${baseUrl}/tl/getUploadedProposals`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setPayment(res.data.result);
        }
      });
    };
    getPaymentStatus();
  }, []);


    // accepted proposal
    const accepted = (key) => {
      console.log("acc", key);
     
    };
  
    // rejected proposal
    const rejected = (key) => {
      console.log("rej", key);
      
    };
  
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
                  <th style={{textAlign:"center"}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {payment.length > 0 ? (
                  payment.map((p, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{p.assign_no}</td>
                      <td>{p.name}</td>
                      <td>{p.amount}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div>
                            <i
                              class="fa fa-check"
                              onClick={() => accepted(p.id)}
                            ></i>
                          </div>
                          <div>
                            <i
                              class="fa fa-times"
                              onClick={() => rejected(p.id)}
                            ></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No Records</td>
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

{
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
}

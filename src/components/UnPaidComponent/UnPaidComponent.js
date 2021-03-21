import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Layout from "../../components/Layout/Layout";
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

function UnPaidComponent() {
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

  function checkStatus(p, a) {
    console.log("paid -", p);
    console.log("acc -", a);

    if (p > 0 && p < a) {
      return "Partial Received ";
    } else if (p === a && p > 0) {
      return "Paid";
    } else {
      return "pending";
    }
  }

  function checkOutstading(p, a) {
    console.log("paid -", p);
    console.log("acc -", a);
    if (p == 0) {
      return "0";
    } else return a - p;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CardTitle tag="h4">Payment status</CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        </CardHeader>
        <CardBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Proposal No</th>
                <th>Customer Name</th>
                <th>Negotiated Amount</th>
                <th style={{ color: "#21a3ce" }}>Accepted Amount</th>
                <th style={{ color: "#064606" }}>Paid Amount</th>
                <th style={{ color: "darkred" }}>Amount Outstanding</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payment.length > 0 ? (
                payment.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{p.proposal_number}</td>
                    <td>{p.name}</td>
                    <td>{p.negotiated_amount}</td>
                    <td style={{ color: "#21a3ce" }}>{p.accepted_amount}</td>
                    <td style={{ color: "#064606" }}>{p.paid_amount}</td>
                    <td style={{ color: "darkred" }}>
                      {checkOutstading(p.paid_amount, p.accepted_amount)}
                    </td>
                    <td>
                      {checkStatus(
                        Number(p.paid_amount),
                        Number(p.accepted_amount)
                      )}
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
    </div>
  );
}

export default UnPaidComponent;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";


function PendingForPayment({CountPendingForPayment}) {

  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    const getPendingForPayment = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?&status=5,7`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setPendingData(res.data.result);
            CountPendingForPayment(res.data.result.length)
          }
        });
    };
    getPendingForPayment();
  }, []);


  // function checkOutstading(p, a) {
  //   console.log("paid -", p);
  //   console.log("acc -", a);
  //   if (p == 0) {
  //     return "0";
  //   } else return a - p;
  // }


  return (
    <>
      <Card>
        <CardHeader>
          {/* <Row>
            <Col md="7">
              <CardTitle tag="h4">Assignment</CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row> */}
        </CardHeader>
        <CardBody>
          <Table responsive="sm" bordered>
          <thead>
              <tr>
              <th>Sr. No.</th>
                <th>Query No</th>
                <th>Proposal No</th>
                <th>Status</th>
                <th>Proposed Amount</th>
                <th>Amount Accepted</th>            
                {/* <th>Payments Received</th>
                <th>Outstanding payment</th> */}
              </tr>
            </thead>
            <tbody>
              {pendingData.length > 0 ? (
                pendingData.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{p.assign_no}</td>
                    <td>{p.proposal_number}</td>
                    <td>{p.status}</td>
                    <td>{p.ProposedAmount}</td>
                    <td>{p.accepted_amount}</td>
{/*   
                    <td>{p.paid_amount}</td>
                    <td>{checkOutstading(p.paid_amount, p.accepted_amount)}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No Records</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default PendingForPayment;


{/* <td>{p.accepted_amount - p.paid_amount}</td> */}
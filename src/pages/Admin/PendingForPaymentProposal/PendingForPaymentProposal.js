import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

function PendingForPaymentProposal() {
  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    const getPendingForPaymentProposal = () => {
      axios.get(`${baseUrl}/admin/getProposals?&status=5`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setPendingData(res.data.result);
        }
      });
    };
    getPendingForPaymentProposal();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Query No</th>
                <th>Amount Accepted</th>
                <th>Partial Pauyment</th>
                <th>Fully Payment</th>
              </tr>
            </thead>
            <tbody>
              {pendingData.length > 0 ? (
                pendingData.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{p.assign_no}</td>
                    <td>{p.ProposedAmount}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No Records</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default PendingForPaymentProposal;

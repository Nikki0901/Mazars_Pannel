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

function PendingForNonPayment() {
  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    const getPendingForNonPayment = () => {
      axios
        .get(`${baseUrl}/get/admin/showproposal`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setPendingData(res.data.result);
          }
        });
    };
    getPendingForNonPayment();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>Assignment No</th>
                <th>Amount Accepted</th>
                <th>Payment Terms</th>
                <th>Payments Received</th>
                <th>Outstanding payment</th>
              </tr>
            </thead>
            <tbody>
              {pendingData.length > 0 ? (
                pendingData.map((p, i) => (
                  <tr key={i}>
                    <td>{p.Assign}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No Records</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default PendingForNonPayment;

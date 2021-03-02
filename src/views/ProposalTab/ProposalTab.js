import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
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


function ProposalTab() {
  const userId = window.localStorage.getItem("userid");
  const [proposalDisplay, setProposalDisplay] = useState([]);

  useEffect(() => {
    const getProposalData = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?uid=${JSON.parse(userId)}`)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if (res.data.code === 1) {
            setProposalDisplay(res.data.result);
          }
        });
    };
    getProposalData();
  }, []);

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CardTitle tag="h4">Proposal</CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>Date</th>
                <th>Query No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Status of Proposal</th>
                <th>Date of Proposal</th>
                <th>Proposed Amount</th>
                <th>Amount Accepted</th>
                <th>Amount Paid</th>
                <th>Date of Payment</th>
                <th>Amount Outstanding</th>
                <th>Date of acceptance of Proposal</th>
                <th>Date of Completion</th>
              </tr>
            </thead>

            {proposalDisplay.length > 0 ? (
              proposalDisplay.map((p, i) => (
                <tbody>
                  <tr key={i}>
                    <td>{p.created}</td>
                    <td>{p.assign_no}</td>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td></td>                  
                    <td>{p.DateofProposal}</td>
                    <td>{p.ProposedAmount}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td colSpan="3">Accept</td>
                    <td colSpan="3">Reject</td>
                    <td colSpan="7"></td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tr>
                <td colSpan="13">No Records</td>
              </tr>
            )}
          </Table>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default ProposalTab;

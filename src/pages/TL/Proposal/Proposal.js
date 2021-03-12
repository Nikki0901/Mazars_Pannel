import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
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

function Proposal() {
  const userid = window.localStorage.getItem("tlkey");

  const [proposal, setProposal] = useState([]);

  useEffect(() => {
    const getProposalList = () => {
      axios.get(`${baseUrl}/admin/pendingProposal`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setProposal(res.data.result);
        }
      });
    };
    getProposalList();
  }, []);

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="9">
              <CardTitle tag="h4">List of Proposals</CardTitle>
            </Col>
            <Col md="3">
              {/* <div style={{display:"flex", justifyContent:"space-around"}}>
              <Link to="/customer/select-category" class="btn btn-primary">
                Fresh Assignment
              </Link>
              </div> */}
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Query No</th>
                <th>Customer Name </th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {proposal.length > 0 ? (
                proposal.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{p.assign_no}</td>
                    <td>{p.name}</td>
                    <td></td>
                    <td>{p.status}</td>
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
    </Layout>
  );
}

export default Proposal;

// import Layout from "../../../components/Layout/Layout";

{
  /* <ProposalComponent /> */
}

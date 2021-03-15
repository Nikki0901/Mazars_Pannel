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
import { useParams, useHistory } from "react-router-dom";

function ProposalReceived() {
  const [proposalDetails, setProposalDetails] = useState([]);

  const userId = window.localStorage.getItem("userid");

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getProposalDetails = () => {
      axios
        .get(
          `${baseUrl}/customers/getProposals?uid=${JSON.parse(
            userId
          )}&assign_id=${id}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setProposalDetails(res.data.result);
          }
        });
    };

    getProposalDetails();
  }, []);

  //outstanding amount
  function checkOutstading(p, a) {
    console.log("paid -", p);
    console.log("acc -", a);
    if (p == 0) {
      return "0";
    } else return a - p;
  }
  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button class="btn btn-success" onClick={() => history.goBack()}>
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </Col>
            <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "20px" }}>Proposal Details</p>
            </Col>
            <Col
              md="4"
              style={{ display: "flex", justifyContent: "flex-end" }}
            ></Col>
          </Row>
        </CardHeader>
        <CardBody>
          {proposalDetails.length > 0
            ? proposalDetails.map((p, i) => (
                <div class="card-body">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Titles</th>
                        <th scope="col">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Date</th>
                        <td>{p.created}</td>
                      </tr>
                      <tr>
                        <th scope="row">Query No</th>
                        <td>{p.assign_no}</td>
                      </tr>
                      <tr>
                        <th scope="row">Category</th>
                        <td>{p.parent_id}</td>
                      </tr>

                      <tr>
                        <th scope="row">Sub Category</th>
                        <td>{p.cat_name}</td>
                      </tr>

                      <tr>
                        <th scope="row">Status of Proposal</th>
                        <td>{p.status}</td>
                      </tr>

                      <tr>
                        <th scope="row">Date of Proposal</th>
                        <td>{p.DateofProposal}</td>
                      </tr>

                      <tr>
                        <th scope="row">Proposed Amount</th>
                        <td>{p.ProposedAmount}</td>
                      </tr>

                      <tr>
                        <th scope="row">Negotiated Amount</th>
                        <td>{p.negotiated_amount}</td>
                      </tr>

                      <tr>
                        <th scope="row">Amount Accepted</th>
                        <td>{p.accepted_amount}</td>
                      </tr>

                      <tr>
                        <th scope="row">Amount Paid</th>
                        <td>{p.paid_amount}</td>
                      </tr>

                      <tr>
                        <th scope="row">Date of Payment</th>
                        <td>{p.pay_date}</td>
                      </tr>

                      <tr>
                        <th scope="row">Amount Outstanding</th>
                        <td>
                          {checkOutstading(p.paid_amount, p.accepted_amount)}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Date of acceptance of Proposal</th>
                        <td>{p.acpt_reject_time}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
            : ""}
        </CardBody>
      </Card>
    </Layout>
  );
}

export default ProposalReceived;

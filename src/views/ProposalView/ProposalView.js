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
import { useParams, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import TermsConditions from "./TermsConditions";



function ProposalView(props) {
  const { handleSubmit, register, reset, errors } = useForm();
  const alert = useAlert();

  const userId = window.localStorage.getItem("userid");
  const [queryStatus, setQueryStatus] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  const [diaplayProposal, setDisplayProposal] = useState({
    amount: "",
    proposal_date: "",
    name: "",
    description: "",
  });

  const { amount, proposal_date,
     name, description } = diaplayProposal

  useEffect(() => {
    const getProposalDetails = () => {
      axios
        .get(
          `${baseUrl}/customers/getQueryDetails?id=${id}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            console.log(res.data.result[0].query_status);
            setQueryStatus(res.data.result[0].query_status);
            setDisplayProposal({
              accepted_amount: res.data.proposal_queries[0].accepted_amount,
              payment_received: res.data.proposal_queries[0].paid_amount,
              amount: res.data.proposal_queries[0].amount,
              proposal_date: res.data.proposal_queries[0].created,
              name: res.data.proposal_queries[0].name,
              description: res.data.proposal_queries[0].description,
            });
          }
        });
    };
    getProposalDetails();
  }, []);

  const [addPaymentModal, setPaymentModal] = useState(false);
  const readTerms = () => {
    console.log("key");
    setPaymentModal(!addPaymentModal);
  };

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("id", id);
    formData.append("status", 5);
    formData.append("terms_condition", Number(value.p_terms_condition));

    axios({
      method: "POST",
      url: `${baseUrl}/customers/ProposalAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        alert.success("proposal accepted !");
        props.history.push('/customer/proposal')
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

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
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Titles</th>
                <th scope="col">Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>{name}</td>
              </tr>
              <tr>
                <th scope="row">Date of Allocation</th>
                <td>{proposal_date}</td>
              </tr>
              <tr>
                <th scope="row">Proposed Amount</th>
                <td>{amount}</td>
              </tr>
              <tr>
                <th scope="row">Proposal Status</th>
                <td>
                  {queryStatus == "4" && "Inprogress"}
                  {queryStatus == "6" && "Declined"}
                  {(queryStatus == "5" || queryStatus > 6) && "Accepted"}
                </td>
              </tr>
              <tr>
                <th scope="row">Proposal Description</th>
                <td>{description}</td>
              </tr>
            </tbody>

          </table>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-6">
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="p_terms_condition"
                    ref={register}
                  />
                  <label className="form-check-label"
                    title="Read"
                    style={{ cursor: "pointer" }}
                    onClick={() => readTerms()}
                  >
                    General terms & condition
                  </label>
                </div>
                <br />
                <div className="form-check">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>

              </div>
            </div>

          </form>
        </CardBody>

        <TermsConditions
          readTerms={readTerms}
          addPaymentModal={addPaymentModal}
        // getProposalData={getProposalDetails}
        />
      </Card>
    </Layout>
  );
}

export default ProposalView;

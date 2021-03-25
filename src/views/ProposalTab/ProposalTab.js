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
import { Link } from "react-router-dom";
import AcceptModal from "./AcceptModal";
import PaymentModal from "./PaymentModal";
import "./index.css";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";

function ProposalTab() {
  const alert = useAlert();

  const userId = window.localStorage.getItem("userid");
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [proposalCount, setCountProposal] = useState("");

  const [id, setId] = useState(null);
  const [reject, setRejected] = useState(true);
  const [pay, setPay] = useState({
    pay: "",
    amount: "",
  });

  // accept modal
  const [acceptedModal, setAcceptedModal] = useState(false);
  const acceptedHandler = (id) => {
    setAcceptedModal(!acceptedModal);
    setId(id);
  };

  const [addPaymentModal, setPaymentModal] = useState(false);

  useEffect(() => {
    getProposalData();
  }, []);

  const getProposalData = () => {
    axios
      .get(`${baseUrl}/customers/getProposals?uid=${JSON.parse(userId)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setProposalDisplay(res.data.result);
          setCountProposal(res.data.result.length);
        }
      });
  };

  const paymentHandler = (key) => {
    console.log(key);
    setPaymentModal(!addPaymentModal);
    setPay({
      amount: key.accepted_amount,
      id: key.q_id,
    });
  };

  // accepted proposal
  const accepted = (key) => {
    console.log("acc", key);

    let formData = new FormData();
    formData.append("id", key);
    formData.append("status", 5);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/ProposalAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          getProposalData();
          alert.success("proposal accepted !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  // rejected proposal
  const rejected = (key) => {
    console.log("rej", key);

    let formData = new FormData();
    formData.append("id", key);
    formData.append("status", 6);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/ProposalAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setRejected(false);
          getProposalData();
          alert.success("proposal rejected !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  //change date format
  function ChangeFormateDate(oldDate) {
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

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
            <Col md="7">
              <CardTitle tag="h4">Proposal ({proposalCount})</CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <CustomerFilter
            setData={setProposalDisplay}
            getData={getProposalData}
            id={userId}
            proposal="proposal"
          />
        </CardHeader>
        <CardBody>
          <div>
            <table class="table table-bordered ">
              <thead class="table_head_Proposal">
                <tr>
                  <th>S.No</th>
                  <th>Date of Query</th>
                  <th>Query No</th>
                  <th>Assignment No</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Date of Proposal</th>
                  <th>Date of acceptance of Proposal</th>
                  <th>Status</th>
                  <th>Proposed Amout</th>
                  <th style={{ color: "#21a3ce" }}>Amount Accepted</th>
                  <th style={{ color: "#064606" }}>Amount Paid</th>
                  <th>Date of Payment</th>
                  <th style={{ color: "darkred" }}>Amount Outstanding</th>
                  <th>Date of Completion</th>
                  <th>Action</th>
                </tr>
              </thead>
              {proposalDisplay.length > 0 ? (
                proposalDisplay.map((p, i) => (
                  <tbody class="table_bdy_proposal">
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{ChangeFormateDate(p.created)}</td>
                      <th>
                        <Link to={`/customer/my-assingment/${p.id}`}>
                          {p.assign_no}
                        </Link>
                      </th>
                      <td>{p.assignment_number}</td>
                      <td>{p.parent_id}</td>
                      <td>{p.cat_name}</td>
                      <td>{ChangeFormateDate(p.DateofProposal)}</td>
                      <td>{ChangeFormateDate(p.cust_accept_date)}</td>
                      <td>{p.status}</td>
                      <td>{p.ProposedAmount}</td>
                      <td style={{ color: "#21a3ce" }}>{p.accepted_amount}</td>
                      <td style={{ color: "#064606" }}>{p.paid_amount}</td>
                      <td>{ChangeFormateDate(p.cust_paid_date)}</td>
                      <td style={{ color: "darkred" }}>
                        {checkOutstading(p.paid_amount, p.accepted_amount)}
                      </td>
                      <td></td>

                      <td>
                        {p.statuscode === "6" ? null : (
                          <div>
                            {p.negotiated_amount === "0" &&
                            p.accepted_amount === "0" ? (
                              <div>
                                <div style={{ cursor: "pointer" }}>
                                  <i
                                    class="fa fa-check"
                                    style={{
                                      color: "green",
                                      fontSize: "16px",
                                    }}
                                    onClick={() => accepted(p.q_id)}
                                  ></i>
                                </div>

                                <div style={{ cursor: "pointer" }}>
                                  <i
                                    class="fa fa-times"
                                    style={{ color: "red", fontSize: "16px" }}
                                    onClick={() => rejected(p.q_id)}
                                  ></i>
                                </div>
                                <div style={{ cursor: "pointer" }}>
                                  <i
                                    class="fa fa-file-text"
                                    style={{
                                      color: "orange",
                                      fontSize: "16px",
                                    }}
                                    onClick={() => acceptedHandler(p.up_id)}
                                  ></i>
                                </div>
                              </div>
                            ) : (
                              (p.negotiated_amount === "0" ||
                                p.accepted_amount) &&
                              ""
                            )}

                            {p.statuscode == 5 ||
                            p.statuscode == 7 ||
                            p.statuscode == 8 ? (
                              <div style={{ cursor: "pointer" }}>
                                <i
                                  class="fa fa-credit-card"
                                  style={{ color: "green", fontSize: "16px" }}
                                  onClick={() => paymentHandler(p)}
                                ></i>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tr>
                  <td colSpan="16">No Records</td>
                </tr>
              )}

              <AcceptModal
                acceptedModal={acceptedModal}
                acceptedHandler={acceptedHandler}
                id={id}
                getProposalData={getProposalData}
              />

              <PaymentModal
                paymentHandler={paymentHandler}
                addPaymentModal={addPaymentModal}
                pay={pay}
                getProposalData={getProposalData}
              />
            </table>
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default ProposalTab;

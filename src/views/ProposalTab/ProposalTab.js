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

import AcceptModal from "./AcceptModal";
import PaymentModal from "./PaymentModal";
import { useForm } from "react-hook-form";

function ProposalTab() {
  const alert = useAlert();

  const userId = window.localStorage.getItem("userid");
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [id, setId] = useState(null);

  // edit modal
  const [acceptedModal, setAcceptedModal] = useState(false);
  const acceptedHandler = (id) => {
    setAcceptedModal(!acceptedModal);
    setId(id);
  };

  const [addPaymentModal, setPaymentModal] = useState(false);
  const paymentHandler = () => setPaymentModal(!addPaymentModal);

  useEffect(() => {
    getProposalData();
  }, []);

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
          getProposalData();
          alert.success("proposal rejected !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  // change date format
  function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("-");
  }

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
                {/* <th>Sr. No.</th> */}
                <th>Date</th>
                <th>Query No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Status of Proposal</th>
                <th>Date of Proposal</th>
                <th>Proposed Amount</th>
                <th>Negotiated Amount</th>
                <th>Amount Accepted</th>
                <th>Amount Paid</th>
                <th>Date of Payment</th>
                <th>Amount Outstanding</th>
                <th>Date of acceptance of Proposal</th>
                <th>Date of Completion</th>
                <th>Action</th>
              </tr>
            </thead>

            {proposalDisplay.length > 0 ? (
              proposalDisplay.map((p, i) => (
                <tbody>
                  <tr key={i}>
                    {/* <td>{i + 1}</td> */}
                    <td>{ChangeFormateDate(p.created)}</td>
                    <td>{p.assign_no}</td>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td></td>
                    <td>{ChangeFormateDate(p.DateofProposal)}</td>
                    <td>{p.ProposedAmount}</td>
                    <td>{p.negotiated_amount}</td>
                    <td>{p.accepted_amount}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          cursor: "pointer",
                          justifyContent: "space-between",
                        }}
                      >
                        {p.negotiated_amount && p.accepted_amount
                          ? ""
                          : p.accepted_amount
                          ? ""
                          : p.negotiated_amount === "0" && (
                              <div>
                                <div>
                                  <i
                                    class="fa fa-check"
                                    onClick={() => accepted(p.q_id)}
                                  ></i>
                                </div>

                                <div>
                                  <i
                                    class="fa fa-times"
                                    onClick={() => rejected(p.q_id)}
                                  ></i>
                                </div>
                              </div>
                            )}

                        <div>
                          <i
                            class="fa fa-file-text"
                            onClick={() => acceptedHandler(p.up_id)}
                          ></i>
                        </div>
                        <div>
                          <i
                            class="fa fa-credit-card"
                            onClick={paymentHandler}
                          ></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tr>
                <td colSpan="14">No Records</td>
              </tr>
            )}

            <AcceptModal
              acceptedModal={acceptedModal}
              acceptedHandler={acceptedHandler}
              id={id}
            />

            <PaymentModal
              paymentHandler={paymentHandler}
              addPaymentModal={addPaymentModal}
            />
          </Table>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default ProposalTab;

// <td>
// <div class="text-center">

//     <i class="fa fa-credit-card"></i>

// </div>
// </td>

// <tr>
// <td colSpan="3">
//   <button
//     class="btn btn-success mb-2"
//     onClick={() => accepted(p.q_id)}
//   >
//     Accept
//   </button>
// </td>
// <td colSpan="3">
//   <button
//     class="btn btn-danger mb-2"
//     onClick={() => rejected(p.q_id)}
//   >
//     Reject
//   </button>
// </td>
// <td colSpan="8"></td>
// </tr>

{
  /*  */
}

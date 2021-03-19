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
  Tooltip,
} from "reactstrap";
import DraftReportModal from "./DraftReportUpload";
import FinalReportUpload from "./FinalReportUpload";
import { Link } from "react-router-dom";

function AssignmentTab() {
  const userid = window.localStorage.getItem("tlkey");

  const [assignment, setAssignment] = useState([]);
  const [id, setId] = useState("");
  const [finalId, setFinalId] = useState("");

  useEffect(() => {
    getAssignmentList();
  }, []);

  const getAssignmentList = () => {
    axios
      .get(`${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setAssignment(res.data.result);
        }
      });
  };

  // draft modal
  const [draftModal, setDraftModal] = useState(false);
  const uploadDraftReport = (id) => {
    console.log(id);
    setDraftModal(!draftModal);
    setId(id);
  };

  // final modal
  const [fianlModal, setFianlModal] = useState(false);
  
  const uploadFinalReport = (id) => {
    console.log(id)
    setFianlModal(!fianlModal);
    setFinalId(id);
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

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CardTitle tag="h4">Assignment</CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Assignment No</th>
                <th>Customer Name</th>
                <th>Negotiated Amount</th>
                <th>Accepted Amount</th>
                <th>Paid Amount</th>
                <th>status</th>
                <th style={{ textAlign: "center" }}>Draft Report</th>
                <th style={{ textAlign: "center" }}>Final Report</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignment.length > 0 ? (
                assignment.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{p.assignment_label_number}</td>
                    <td>{p.customer_name}</td>
                    <td>{p.negotiated_amount}</td>
                    <td>{p.accepted_amount}</td>
                    <td>{p.paid_amount}</td>
                    <td>
                      {checkStatus(
                        Number(p.paid_amount),
                        Number(p.accepted_amount)
                      )}
                    </td>

                    <td style={{ textAlign: "center" }}>
                      {p.assignement_draft_report === null ? (
                        ""
                      ) : (
                        <div title="show Draft Report">
                          <a
                            href={`http://13.232.121.233/mazarapi/assets/upload/report/${p.assignement_draft_report}`}
                          >
                            <i class="fa fa-file-text"></i>
                          </a>
                        </div>
                      )}
                    </td>

                    <td style={{ textAlign: "center" }}>
                      {p.final_report === null ? (
                        ""
                      ) : (
                        <div title="show Final Report">
                          <a
                            href={`http://13.232.121.233/mazarapi/assets/upload/report/${p.final_report}`}
                          >
                            <i class="fa fa-file-text"></i>
                          </a>
                        </div>
                      )}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div title="upload Pdf">
                          <p
                            style={{ cursor: "pointer", color: "green" }}
                            onClick={() => uploadDraftReport(p.id)}
                          >
                            <i class="fa fa-upload"></i>
                            upload draft
                          </p>
                        </div>
                        <div title="upload Pdf">
                          <p
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() => uploadFinalReport(p)}
                          >
                            {p.client_discussion == "completed" &&
                            p.delivery_report == "completed" &&
                            p.draft_report == "completed" &&
                            p.final_discussion == "completed" &&
                            p.other_stage == "completed" ? (
                              <div>
                                <i class="fa fa-upload"></i>
                                upload final
                              </div>
                            ) : (
                              ""
                            )}
                          </p>
                        </div>
                        <div
                          title="Add Assignment stages"
                          style={{ cursor: "pointer", textAlign: "center" }}
                        >
                          <Link to={`/teamleader/addassingment/${p.q_id}`}>
                            <i class="fa fa-tasks"></i>
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No Records</td>
                </tr>
              )}
            </tbody>
          </Table>

          <DraftReportModal
            draftModal={draftModal}
            uploadDraftReport={uploadDraftReport}
            getAssignmentList={getAssignmentList}
            id={id}
          />

          <FinalReportUpload
            fianlModal={fianlModal}
            uploadFinalReport={uploadFinalReport}
            getAssignmentList={getAssignmentList}
            id={finalId}
          />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default AssignmentTab;
// http://13.232.121.233/mazarapi/assets/upload/report/{dra}

// {Number(p.paid_amount) > 0 &&
//   Number(p.accepted_amount) > Number(p.paid_amount)
//     ? "Partial Received"
//     : Number(p.accepted_amount) == Number(p.paid_amount)
//     ? "Full Received"
//     : "pending"}

{
  /* <Link to={`http://13.232.121.233/mazarapi/assets/upload/report/${p.assignement_draft_report}`}>
                          <i class="fa fa-file-text"></i>
                      </Link> */
}

{
  /* <a
                            href={`http://13.232.121.233/mazarapi/assets/upload/report/draft_210311120314_6049c472265c6_csv`}
                          > */
}

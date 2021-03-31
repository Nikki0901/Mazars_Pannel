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
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";

function AssignmentTab() {
  const userid = window.localStorage.getItem("tlkey");
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [selectedData, setSelectedData] = useState([]);
  const [count, setCount] = useState("");
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
          setCount(res.data.result.length);
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
    console.log(id);
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

  //search filter
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
    getAssignmentList();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    getAssignmentList();
  };

  //reset category
  const resetCategory = () => {
    console.log("resetData ..");
    setSelectedData([]);
    getAssignmentList();
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(
          userid
        )}&cat_id=${selectedData}&from=${data.p_dateFrom}&to=${
          data.p_dateTo
        }&status=${data.p_status}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          if (res.data.result) {
            setAssignment(res.data.result);
          }
        }
      });
  };

  //change date format
  function ChangeFormateDate(oldDate) {
    console.log("date", oldDate);
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CardTitle tag="h4">Assignment ({count})</CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        </CardHeader>

        <CardHeader>
          <div className="row">
            <div class="col-sm-3 d-flex">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select Category"
                defaultValue={[]}
                onChange={handleChange}
                optionLabelProp="label"
                value={selectedData}
              >
                <OptGroup label="Direct Tax">
                  <Option value="3" label="Compilance">
                    <div className="demo-option-label-item">Compliance</div>
                  </Option>
                  <Option value="4" label="Assessment">
                    <div className="demo-option-label-item">Assessment</div>
                  </Option>
                  <Option value="5" label="Appeals">
                    <div className="demo-option-label-item">Appeals</div>
                  </Option>
                  <Option value="6" label="Advisory/opinion">
                    <div className="demo-option-label-item">
                      Advisory/opinion
                    </div>
                  </Option>
                  <Option value="7" label="Transfer Pricing">
                    <div className="demo-option-label-item">
                      Transfer Pricing
                    </div>
                  </Option>
                  <Option value="8" label="Others">
                    <div className="demo-option-label-item">Others</div>
                  </Option>
                </OptGroup>

                <OptGroup label="Indirect Tax">
                  <Option value="9" label="Compilance">
                    <div className="demo-option-label-item">Compliance</div>
                  </Option>
                  <Option value="10" label="Assessment">
                    <div className="demo-option-label-item">Assessment</div>
                  </Option>
                  <Option value="11" label="Appeals">
                    <div className="demo-option-label-item">Appeals</div>
                  </Option>
                  <Option value="12" label="Advisory/opinion">
                    <div className="demo-option-label-item">
                      Advisory/opinion
                    </div>
                  </Option>
                  <Option value="13" label="Others">
                    <div className="demo-option-label-item">Others</div>
                  </Option>
                </OptGroup>
              </Select>

              <div>
                <button
                  type="submit"
                  class="btn btn-primary mb-2 ml-3"
                  onClick={resetCategory}
                  style={{ padding: "4px 9px" }}
                >
                  X
                </button>
              </div>
            </div>

            <div className="col-sm-9 d-flex p-0">
              <div>
                <form class="form-inline" onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-group mb-2">
                    <label className="form-select form-control">From</label>
                  </div>
                  <div class="form-group mb-2 ml-2">
                    <input
                      type="date"
                      name="p_dateFrom"
                      className="form-select form-control"
                      ref={register}
                    />
                  </div>

                  <div class="form-group mb-2 ml-2">
                    <label className="form-select form-control">To</label>
                  </div>
                  <div class="form-group mb-2 ml-2">
                    <input
                      type="date"
                      name="p_dateTo"
                      className="form-select form-control"
                      ref={register}
                    />
                  </div>

                  <div class="form-group mb-2 ml-2">
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                    >
                      <option value="">--select--</option>
                      <option value="1">Incomplete</option>
                      <option value="2">Complete</option>
                    </select>
                  </div>

                  <button type="submit" class="btn btn-primary mb-2 ml-2">
                    <i class="fa fa-search"></i>
                  </button>
                </form>
              </div>

              <div>
                <button
                  type="submit"
                  class="btn btn-primary mb-2 ml-3"
                  onClick={resetData}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <Table responsive="sm" bordered>
            <thead class="table_head">
              <tr>
                <th>S.No</th>
                <th>Date of Query</th>
                <th>Query No</th>
                <th>Assignment No</th>
                <th>Assignment Date</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Proposed date of Completion</th>
                {/* <th>Assignment Stage</th> */}
                <th>Status</th>
                <th>Time taken for Completion</th>
                <th> Report</th>
                <th>Action</th>
              </tr>
            </thead>
            {assignment.map((p, i) => (
              <tbody class="table_bdy">
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{ChangeFormateDate(p.date_of_query)}</td>
                  <th>
                    <Link to={`/admin/queries/${p.q_id}`}>{p.assign_no}</Link>
                  </th>
                  <td>{p.assignment_number}</td>
                  <td>{p.assignment_date}</td>
                  <td>{p.parent_id}</td>
                  <td>{p.cat_name}</td>
                  <td></td>
                  {/* <td>
                    <span style={{ fontWeight: "bold" }}>
                      Client Discussion
                    </span>
                  </td> */}
                  <td>{p.status}</td>
                  <td></td>

                  <td style={{ textAlign: "center" }}>
                    {!p.final_report == "" ? (
                      <div>
                        <a
                          href={`http://13.232.121.233/mazarapi/assets/upload/report/${p.final_report}`}
                        >
                          <i
                            class="fa fa-file-text"
                            style={{ fontSize: "16px" }}
                          ></i>{" "}
                          final
                        </a>
                      </div>
                    ) : p.assignement_draft_report ? (
                      <div>
                        <a
                          href={`http://13.232.121.233/mazarapi/assets/upload/report/${p.assignment_draft_report}`}
                        >
                          <i
                            class="fa fa-file-text"
                            style={{ fontSize: "16px" }}
                          ></i>{" "}
                          draft
                        </a>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div title="upload Pdf">
                        <p
                          style={{ cursor: "pointer", color: "green" }}
                          onClick={() => uploadDraftReport(p.id)}
                        >
                          <i
                            class="fa fa-upload"
                            style={{ fontSize: "16px" }}
                          ></i>
                          draft
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
                          p.amount == p.paid_amount ? (
                            <div>
                              <i
                                class="fa fa-upload"
                                style={{ fontSize: "16px" }}
                              ></i>
                              final
                            </div>
                          ) : (
                            ""
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                {/* <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>Draft report</span>
                  </td>
                  <td> {p.draft_report}</td>

                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>Final Discussion</span>
                  </td>
                  <td> {p.final_discussion}</td>

                  <td></td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>
                      Delivery of report
                    </span>
                  </td>
                  <td> {p.delivery_report}</td>

                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>Complete</span>
                  </td>
                  <td> {p.other_stage}</td>

                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                */}
              </tbody>
            ))}
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

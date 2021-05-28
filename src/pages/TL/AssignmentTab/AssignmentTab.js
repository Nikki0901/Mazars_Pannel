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
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import * as Cookies from "js-cookie";

function AssignmentTab() {
  const history = useHistory();
  const userid = window.localStorage.getItem("tlkey");
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [count, setCount] = useState("");
  const [assignment, setAssignment] = useState([]);
  const [id, setId] = useState("");
  const [finalId, setFinalId] = useState("");

  const [selectedData, setSelectedData] = useState([]);
  const [status, setStatus] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);

  const [baseMode, SetbaseMode] = useState("avc");
  const [transcode, SetTranscode] = useState("interop");
  const [attendeeMode, SetAttendeeMode] = useState("video");
  const [videoProfile, SetVideoProfile] = useState("480p_4");

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

  //get category
  useEffect(() => {
    const getSubCategory = () => {
      axios
        .get(`${baseUrl}/customers/getCategory?pid=${selectedData}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setTax2(res.data.result);
          }
        });
    };
    getSubCategory();
  }, [selectedData]);

  //handleCategory
  const handleCategory = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
  };

  //handleSubCategory
  const handleSubCategory = (value) => {
    console.log(`selected ${value}`);
    setStore2(value);
  };

  //reset category
  const resetCategory = () => {
    console.log("resetCategory ..");
    setSelectedData([]);
    setStore2([]);
    getAssignmentList();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    setStatus([]);
    getAssignmentList();
  };

  //assingmentStatus
  const assingmentStatus = (value) => {
    console.log(`selected ${value}`);
    setStatus(value);
  };

  //columns
  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "50px" };
      },
    },
    {
      text: "Date",
      dataField: "date_of_query",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.date_of_query);
        var oldDate = row.date_of_query;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Query No",
      dataField: "assign_no",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            <Link to={`/teamleader/queries/${row.q_id}`}>{row.assign_no}</Link>
          </>
        );
      },
    },
    {
      text: "Category",
      dataField: "parent_id",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Sub Category",
      dataField: "cat_name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "200px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div>
              <p>
                <span style={{ fontWeight: "bold" }}>Client Discussion :</span>
                {row.client_discussion}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Draft report :</span>
                {row.draft_report}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Final Discussion :</span>
                {row.final_discussion}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Delivery of report :</span>
                {row.delivery_report}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Complete :</span>
                {row.other_stage}
              </p>
            </div>
          </>
        );
      },
    },
    {
      text: "Expected date of delivery",
      dataField: "Exp_Delivery_Date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.Exp_Delivery_Date);
        var oldDate = row.Exp_Delivery_Date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Actual date of delivery",
      dataField: "final_date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.final_date);
        var oldDate = row.final_date;
        if (oldDate == null || oldDate == "0000-00-00 00:00:00") {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Deliverable",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            {!row.final_report == "" ? (
              <div>
                <a
                  href={`http://65.0.220.156/mazarapi/assets/upload/report/${row.final_report}`}
                  target="_blank"
                >
                  <i class="fa fa-file-text" style={{ fontSize: "16px" }}></i>{" "}
                  final
                </a>
              </div>
            ) : row.assignement_draft_report ? (
              <div>
                <a
                  href={`http://65.0.220.156/mazarapi/assets/upload/report/${row.assignement_draft_report}`}
                  target="_blank"
                >
                  <i class="fa fa-file-text" style={{ fontSize: "16px" }}></i>{" "}
                  draft
                </a>
              </div>
            ) : null}
          </>
        );
      },
    },
    {
      text: "Assignment Stage",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div
              title="Add Assignment stages"
              style={{ cursor: "pointer", textAlign: "center" }}
            >
              <Link to={`/teamleader/addassingment/${row.q_id}`}>
                <i class="fa fa-tasks"></i>
              </Link>
            </div>
          </>
        );
      },
    },
    {
      text: "Action",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {row.accepted_amount == row.paid_amount &&
              !row.final_report &&
              !(
                row.client_discussion == "completed" &&
                row.delivery_report == "completed" &&
                row.draft_report == "completed" &&
                row.final_discussion == "completed"
              ) ? (
                <div title="upload Pdf">
                  <p
                    style={{ cursor: "pointer", color: "green" }}
                    onClick={() => uploadDraftReport(row.id)}
                  >
                    <i class="fa fa-upload" style={{ fontSize: "16px" }}></i>
                    draft
                  </p>
                </div>
              ) : null}

              {row.final_report ? null : (
                <div title="upload Pdf">
                  <p
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => uploadFinalReport(row)}
                  >
                    {row.client_discussion == "completed" &&
                    row.delivery_report == "completed" &&
                    row.draft_report == "completed" &&
                    row.final_discussion == "completed" &&
                    row.amount == row.paid_amount ? (
                      <div>
                        <i
                          class="fa fa-upload"
                          style={{ fontSize: "16px" }}
                        ></i>
                        final
                      </div>
                    ) : null}
                  </p>
                </div>
              )}
            </div>
          </>
        );
      },
    },
    {
      dataField: "",
      text: "Video Call",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div style={{ cursor: "pointer" }}>
              <i
                class="fa fa-video-camera"
                style={{ color: "red", fontSize: "16px" }}
                onClick={() => handleJoin(row.q_id)}
              ></i>
            </div>
          </>
        );
      },
    },
  ];

  //handleJoin
  const handleJoin = (id) => {
    console.log("id", id);

    Cookies.set("channel_2", id);
    Cookies.set("baseMode_2", baseMode);
    Cookies.set("transcode_2", transcode);
    Cookies.set("attendeeMode_2", attendeeMode);
    Cookies.set("videoProfile_2", videoProfile);
    history.push("/teamleader/meeting");
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

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(
          userid
        )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${
          data.p_dateTo
        }&assignment_status=${status}&stages_status=${data.p_status}`
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

  const Reset = () => {
    return (
      <>
        <button
          type="submit"
          class="btn btn-primary mx-sm-1 mb-2"
          onClick={() => resetData()}
        >
          Reset
        </button>
      </>
    );
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-inline">
              <div class="form-group mb-2">
                <Select
                  style={{ width: 130 }}
                  placeholder="Select Category"
                  defaultValue={[]}
                  onChange={handleCategory}
                  value={selectedData}
                >
                  <Option value="1" label="Compilance">
                    <div className="demo-option-label-item">Direct Tax</div>
                  </Option>
                  <Option value="2" label="Compilance">
                    <div className="demo-option-label-item">Indirect Tax</div>
                  </Option>
                </Select>
              </div>

              <div class="form-group mx-sm-1  mb-2">
                <Select
                  mode="multiple"
                  style={{ width: 250 }}
                  placeholder="Select Sub Category"
                  defaultValue={[]}
                  onChange={handleSubCategory}
                  value={store2}
                  allowClear
                >
                  {tax2.map((p, index) => (
                    <Option value={p.id} key={index}>
                      {p.details}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <button
                  type="submit"
                  class="btn btn-primary mb-2 ml-3"
                  onClick={resetCategory}
                >
                  X
                </button>
              </div>

              <div class="form-group mx-sm-1  mb-2">
                <label className="form-select form-control">From</label>
              </div>

              <div class="form-group mx-sm-1  mb-2">
                <input
                  type="date"
                  name="p_dateFrom"
                  className="form-select form-control"
                  ref={register}
                />
              </div>

              <div class="form-group mx-sm-1  mb-2">
                <label className="form-select form-control">To</label>
              </div>

              <div class="form-group mx-sm-1  mb-2">
                <input
                  type="date"
                  name="p_dateTo"
                  className="form-select form-control"
                  ref={register}
                />
              </div>

              <div class="form-group mx-sm-1  mb-2">
                <Select
                  mode="multiple"
                  style={{ width: 210 }}
                  placeholder="Select stages"
                  defaultValue={[]}
                  onChange={assingmentStatus}
                  value={status}
                  allowClear
                >
                  <Option value="Client_Discussion" label="Compilance">
                    <div className="demo-option-label-item">
                      Client Discussion
                    </div>
                  </Option>
                  <Option value="Draft_Report" label="Compilance">
                    <div className="demo-option-label-item">Draft report</div>
                  </Option>
                  <Option value="Final_Discussion" label="Compilance">
                    <div className="demo-option-label-item">
                      Final Discussion
                    </div>
                  </Option>
                  <Option value="Delivery_of_report" label="Compilance">
                    <div className="demo-option-label-item">
                      Delivery of report
                    </div>
                  </Option>
                  <Option value="Completed" label="Compilance">
                    <div className="demo-option-label-item">Completed</div>
                  </Option>
                </Select>
              </div>

              <div class="form-group mx-sm-1  mb-2">
                <select
                  className="form-select form-control"
                  name="p_status"
                  ref={register}
                  style={{ height: "33px" }}
                >
                  <option value="">--select--</option>
                  <option value="1">Pending</option>
                  <option value="2">Complete</option>
                </select>
              </div>

              <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
                Search
              </button>

              <Reset />
            </div>
          </form>
        </CardHeader>

        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={assignment}
            columns={columns}
            rowIndex
          />

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

// {row.assignement_draft_report || row.final_report ? null : (
//   <div title="upload Pdf">
//     <p
//       style={{ cursor: "pointer", color: "green" }}
//       onClick={() => uploadDraftReport(row.id)}
//     >
//       <i class="fa fa-upload" style={{ fontSize: "16px" }}></i>
//       draft
//     </p>
//   </div>
// )}
{
  /* {row.accepted_amount == row.paid_amount &&
               !row.final_report  row.assignement_draft_report ? (
                <p>draft report</p>
              ) : null} */
}

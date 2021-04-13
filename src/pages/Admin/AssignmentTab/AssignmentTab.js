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
import "./index.css";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import AdminFilter from "../../../components/Search-Filter/AdminFilter";

function AssignmentTab() {
  const userid = window.localStorage.getItem("adminkey");

  const [assignmentDisplay, setAssignmentDisplay] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [selectedData, setSelectedData] = useState([]);
  const [assignmentCount, setCountAssignment] = useState("");

  useEffect(() => {
    getAssignmentData();
  }, []);

  const getAssignmentData = () => {
    axios.get(`${baseUrl}/tl/getAssignments`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setAssignmentDisplay(res.data.result);
        setCountAssignment(res.data.result.length);
      }
    });
  };

  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);

  const [store, setStore] = useState("");
  const [store2, setStore2] = useState("");
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setTax(res.data.result);
      }
    });
  };

  useEffect(() => {
    const getSubCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax2(res.data.result);
        }
      });
    };
    getSubCategory();
  }, [store]);

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
            <Link to={`/admin/queries/${row.q_id}`}>{row.assign_no}</Link>
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
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "Exp_Delivery_Date",
      text: "Expected date of delivery",
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
      dataField: "date_of_delivery",
      text: "Actual date of delivery",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.created);
        var oldDate = row.created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Deliverable",
      dataField: "",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            {!row.final_report == "" ? (
              <div>
                <a
                  href={`http://13.232.121.233/mazarapi/assets/upload/report/${row.final_report}`}
                >
                  <i class="fa fa-file-text" style={{ fontSize: "16px" }}></i>{" "}
                  final
                </a>
              </div>
            ) : row.assignement_draft_report ? (
              <div>
                <a
                  href={`http://13.232.121.233/mazarapi/assets/upload/report/${row.assignement_draft_report}`}
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
      text: "TL name",
      dataField: "tl_name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
  ];

  //change date format
  function ChangeFormateDate(oldDate) {
    console.log("date", oldDate);
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    getAssignmentData();
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}/tl/getAssignments?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.p_status}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          if (res.data.result) {
            setAssignmentDisplay(res.data.result);
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
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CardTitle tag="h4">Assignment ({assignmentCount})</CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        </CardHeader>

        <CardHeader>
          <AdminFilter
            setData={setAssignmentDisplay}
            getData={getAssignmentData}
            assignment="assignment"
          />
          {/* <div className="row">
            <div className="col-sm-12 d-flex">
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-inline">
                    <div class="form-group mb-2">
                      <select
                        className="form-select form-control"
                        name="p_tax"
                        ref={register}
                        style={{ height: "35px" }}
                        onChange={(e) => setStore(e.target.value)}
                      >
                        <option value="">--Select Category--</option>
                        {tax.map((p, index) => (
                          <option key={index} value={p.id}>
                            {p.details}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div class="form-group mx-sm-1  mb-2">
                      <select
                        className="form-select form-control"
                        name="p_tax2"
                        ref={register}
                        style={{ height: "35px" }}
                        onChange={(e) => setStore2(e.target.value)}
                      >
                        <option value="">--Select Sub-Category--</option>
                        {tax2.map((p, index) => (
                          <option key={index} value={p.id}>
                            {p.details}
                          </option>
                        ))}
                      </select>
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
                      <select
                        className="form-select form-control"
                        name="p_status"
                        ref={register}
                        style={{ height: "33px" }}
                      >
                        <option value="">--select--</option>
                        <option value="1">InProgress</option>
                        <option value="2">Complete</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
                    Search
                  </button>

                  <Reset />
                </form>
              </div>
            </div>
          </div> */}
        </CardHeader>

        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={assignmentDisplay}
            columns={columns}
            rowIndex
          />

          {/* <table class="table table-bordered">
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
                <th>Assignment Stage</th>
                <th>Status</th>
                <th>Time taken for Completion</th>
                <th> Report</th>
                <th>TL name</th>
              </tr>
            </thead>
            {assignmentDisplay.map((p, i) => (
              <tbody class="table_bdy">
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{ChangeFormateDate(p.date_of_query)}</td>
                  <th>
                    <Link to={`/admin/queries/${p.q_id}`}>{p.assign_no}</Link>
                  </th>
                  <td>{p.assignment_label_number}</td>
                  <td>{p.assignment_date}</td>
                  <td>{p.parent_id}</td>
                  <td>{p.cat_name}</td>
                  <td>{ChangeFormateDate(p.Exp_Delivery_Date)}</td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>
                      Client Discussion
                    </span>
                  </td>
                  <td> {p.client_discussion}</td>
                  <td>{p.days_taken}</td>
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
                  <td>{p.tl_name}</td>
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
              </tbody>
            ))}
          </table> */}
        </CardBody>
      </Card>
    </Layout>
  );
}

export default AssignmentTab;

{
  /*            
            <p style={{ fontSize: "10px" }}>{row.draft_report}</p>
            <p style={{ fontSize: "10px" }}>{row.final_discussion}</p>
            <p style={{ fontSize: "10px" }}>{row.draft_report}</p>
            <p style={{ fontSize: "10px" }}>{row.other_stage}</p> */
}
{
  /* <div>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Client Discussion :
                        </span>
                        {p.client_discussion}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Draft report :</span>
                        {p.draft_report}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Final Discussion :
                        </span>
                        {p.final_discussion}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Delivery of report :
                        </span> 
                        {p.delivery_report}
                      </p>
                    </div> */
}

/* <div className="mb-3">                     
                      <select
                        className="form-select form-control"
                        name="p_purpose"                     
                      >                  
                        <option >status</option>                                         
                        <option >Client Discussion : {p.client_discussion}</option>                                         
                        <option >Draft report : {p.draft_report}</option>                                         
                        <option >Final Discussion : {p.final_discussion}</option>                                         
                        <option >Delivery of report : {p.delivery_report}</option>                                         
                      </select>
                    </div> */

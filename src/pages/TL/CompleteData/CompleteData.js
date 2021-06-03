import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";

function CompleteData({ CountComplete }) {
  const [completeData, setCompleteData] = useState([]);
  const userid = window.localStorage.getItem("tlkey");
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    getCompleteAssingment();
  }, []);

  const getCompleteAssingment = () => {
    axios
      .get(`${baseUrl}/tl/getCompleteQues?id=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          // CountComplete(res.data.result.length);
          setCompleteData(res.data.result);
        }
      });
  };


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
      dataField: "query_date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.query_date);
        var updatedate = row.query_date.split(" ")[0];
        console.log(updatedate);
        if (updatedate == null) {
          return null;
        }
        return updatedate.toString().split("-").reverse().join("-");
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
            <Link to={`/teamleader/queries/${row.id}`}>{row.assign_no}</Link>
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
      text: "Customer Name",
      dataField: "name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "	Exp. Delivery Date",
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
      text: "Status",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px", width: "160px" };
      },
      formatter: function AssignmentStage(cell, row) {
        console.log("status - ", row);
        return (
          <>
            <div style={{ fontSize: "9px" ,fontWeight:"bold" }}>
              <tr>
                <td>Client Discussion</td>
                <td>{row.client_discussion}</td>
              </tr>
              <tr>
                <td>Draft report</td>
                <td>{row.draft_report}</td>
              </tr>
              <tr>
                <td>Final Discussion</td>
                <td>{row.final_discussion}</td>
              </tr>
              <tr>
                <td> Delivery of report</td>
                <td>{row.delivery_report}</td>
              </tr>
              <tr>
                <td>Complete</td>
                <td>{row.other_stage}</td>
              </tr>
            </div>
          </>
        );
      },
    },
   
  ];

  // change date format
  function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("-");
  }

  //search filter
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
    getCompleteAssingment();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    getCompleteAssingment();
  };

  //reset category
  const resetCategory = () => {
    console.log("resetData ..");
    setSelectedData([]);
    getCompleteAssingment();
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}//tl/getCompleteQues?id=${JSON.parse(
          userid
        )}&cat_id=${selectedData}&from=${data.p_dateFrom}&to=${data.p_dateTo}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          if (res.data.result) {
            setCompleteData(res.data.result);
          }
        }
      });
  };

  return (
    <>
      <Card>
        <CardHeader>
        <TeamFilter
            setData={setCompleteData}
            getData={getCompleteAssingment}
            completeAssignment="completeAssignment"
          />
          {/* <div className="row">
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
                >
                  X
                </button>
              </div>
            </div>

            <div className="col-sm-9 d-flex">
              <div>
                <form class="form-inline" onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-group mx-sm-3 mb-2">
                    <label className="form-select form-control">From</label>
                  </div>
                  <div class="form-group mx-sm-3 mb-2">
                    <input
                      type="date"
                      name="p_dateFrom"
                      className="form-select form-control"
                      ref={register}
                    />
                  </div>

                  <div class="form-group mx-sm-3 mb-2">
                    <label className="form-select form-control">To</label>
                  </div>
                  <div class="form-group mx-sm-3 mb-2">
                    <input
                      type="date"
                      name="p_dateTo"
                      className="form-select form-control"
                      ref={register}
                    />
                  </div>
                  <button type="submit" class="btn btn-primary mb-2">
                    Search
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
          </div> */}
        </CardHeader>
        <CardBody>
        <BootstrapTable
            bootstrap4
            keyField="id"
            data={completeData}
            columns={columns}
            rowIndex
          />

          {/* <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Date</th>
                <th scope="col">Query No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th scope="col">Customer Name</th>

                <th scope="col">Delivery Date</th>
                <th scope="col">Assignment Stage</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            {completeData.map((p, i) => (
              <tbody>
                <tr>
                  <td>{i + 1}</td>
                  <td>{ChangeFormateDate(p.query_date)}</td>
                  <th>
                    <Link to={`/teamleader/queries/${p.id}`}>
                      {p.assign_no}
                    </Link>
                  </th>
                  <td>{p.parent_id}</td>
                  <td>{p.cat_name}</td>
                  <td>{p.name}</td>
                  <td>{ChangeFormateDate(p.Exp_Delivery_Date)}</td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>
                      Client Discussion
                    </span>
                  </td>
                  <td> {p.client_discussion}</td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td>
                    <span style={{ fontWeight: "bold" }}>Draft report </span>
                  </td>
                  <td> {p.draft_report}</td>
                </tr>

                <tr>
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
                </tr>

                <tr>
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
                    </span>{" "}
                  </td>
                  <td>{p.delivery_report}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td>
                    <span style={{ fontWeight: "bold" }}>Complete</span>{" "}
                  </td>
                  <td>{p.other_stage}</td>
                </tr>
              </tbody>
            ))}
          </table> */}
        </CardBody>
      </Card>
    </>
  );
}

export default CompleteData;

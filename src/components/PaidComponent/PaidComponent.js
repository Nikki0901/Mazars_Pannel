import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Layout from "../Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import BootstrapTable from "react-bootstrap-table-next";

function PaidComponent() {
  const [payment, setPayment] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [selectedData, setSelectedData] = useState([]);
  const [paymentcount, setPaymentCount] = useState("");

  useEffect(() => {
    getPaymentStatus();
  }, []);

  const getPaymentStatus = () => {
    axios.get(`${baseUrl}/tl/getUploadedProposals`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPayment(res.data.result);
        setPaymentCount(res.data.result.length);
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
      dataField: "created",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.created);
        var updatedate = row.created.split(" ")[0];
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
            <Link to={`/admin/queries/${row.id}`}>{row.assign_no}</Link>
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
      text: "Proposal No",
      dataField: "proposal_number",
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
      text: "Accepted Amount",
      dataField: "accepted_amount",
      sort: true,
      style: {
        color: "#21a3ce",
      },
      headerStyle: () => {
        return { fontSize: "12px", color: "#21a3ce" };
      },
    },
    {
      text: "Paid Amount",
      dataField: "paid_amount",
      sort: true,
      style: {
        color: "#064606",
      },
      headerStyle: () => {
        return { fontSize: "12px", color: "#064606" };
      },
    },
    {
      text: "Amount Outstanding",
      dataField: "",
      sort: true,
      style: {
        color: "darkred",
      },
      headerStyle: () => {
        return { fontSize: "12px", color: "darkred" };
      },
      formatter: function amountOutstading(cell, row) {
        console.log("dt", row.paid_amount);
        console.log("dt", row.accepted_amount);
        var p = row.paid_amount;
        var a = row.accepted_amount;
        if (p == 0) {
          return "0";
        } else return a - p;
      },
    },
    {
      text: "Status",
      dataField: "status",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
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

  //search filter
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
    getPaymentStatus();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    getPaymentStatus();
  };

  //reset category
  const resetCategory = () => {
    console.log("resetData ..");
    setSelectedData([]);
    getPaymentStatus();
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}/tl/getUploadedProposals?cat_id=${selectedData}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.p_status}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          if (res.data.result) {
            setPayment(res.data.result);
          }
        }
      });
  };

  function checkOutstading(p, a) {
    console.log("paid -", p);
    console.log("acc -", a);
    if (p == 0) {
      return "0";
    } else return a - p;
  }

  //change date format
  function ChangeFormateDate(oldDate) {
    // console.log("date",oldDate)
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CardTitle tag="h4">Payment status ({paymentcount})</CardTitle>
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
                      <option value="1">Unpaid</option>
                      <option value="2">Paid</option>
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
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={payment}
            columns={columns}
            rowIndex
          />

          {/* <table class="table table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Query No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Proposal No</th>
                <th>Customer Name</th>
                <th style={{ color: "#21a3ce" }}>Accepted Amount</th>
                <th style={{ color: "#064606" }}>Paid Amount</th>
                <th style={{ color: "darkred" }}>Amount Outstanding</th>
                <th>Status</th>
                <th>TL name</th>
              </tr>
            </thead>
            <tbody>
              {payment.length > 0 ? (
                payment.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <th>
                      <Link to={`/admin/queries/${p.id}`}>{p.assign_no}</Link>
                    </th>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>

                    <td>{p.proposal_number}</td>
                    <td>{p.name}</td>
                    <td style={{ color: "#21a3ce" }}>{p.accepted_amount}</td>
                    <td style={{ color: "#064606" }}>{p.paid_amount}</td>
                    <td style={{ color: "darkred" }}>
                      {checkOutstading(p.paid_amount, p.accepted_amount)}
                    </td>
                    <td>
                      {p.status}
                     
                    </td>
                    <td>{p.tl_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No Records</td>
                </tr>
              )}
            </tbody>
          </table> */}
        </CardBody>
      </Card>
    </div>
  );
}

export default PaidComponent;
// function checkStatus(p, a) {
//   console.log("paid -", p);
//   console.log("acc -", a);

//   if (p > 0 && p < a) {
//     return "Partial Received ";
//   } else if (p === a && p > 0) {
//     return "Paid";
//   } else {
//     return "pending";
//   }
// }
{
  /* {checkStatus(
                        Number(p.paid_amount),
                        Number(p.accepted_amount)
                      )} */
}

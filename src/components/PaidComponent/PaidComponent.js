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
import BootstrapTable from "react-bootstrap-table-next";
import AdminFilter from "../../components/Search-Filter/AdminFilter";

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
      dataField: "",
      text: "S.No",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "created",
      text: "Date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
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
      dataField: "assign_no",
      text: "Query No",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
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
      dataField: "parent_id",
      text: "Category",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "cat_name",
      text: "Sub Category",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Date of Proposal",
      dataField: "DateofProposal",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.DateofProposal);
        var oldDate = row.DateofProposal;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Date of acceptance of Proposal",
      dataField: "cust_accept_date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.cust_accept_date);
        var oldDate = row.cust_accept_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Status",
      dataField: "status",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "ProposedAmount",
      text: "Proposed Amount",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "accepted_amount",
      text: "Accepted Amount ",
      sort: true,
      style: {
        fontSize: "11px",
        color: "#21a3ce",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "#21a3ce" };
      },
    },
    {
      text: "Amount Paid",
      dataField: "paid_amount",
      sort: true,
      style: {
        fontSize: "11px",
        color: "#064606",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "#064606" };
      },
    },

    {
      text: "Amount Outstanding",
      dataField: "",
      sort: true,
      style: {
        fontSize: "11px",
        color: "darkred",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "darkred" };
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
      text: "Date of Payment",
      dataField: "cust_paid_date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.cust_paid_date);
        var oldDate = row.cust_paid_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Date of Completion",
      dataField: "",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "tl_name",
      text: "TL name",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
  ];

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    getPaymentStatus();
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}/tl/getUploadedProposals?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.p_status}`
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
        <AdminFilter
            setData={setPayment}
            getData={getPaymentStatus}
            paymentStatus="paymentStatus"
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
                        <option value="1">UnPaid</option>
                        <option value="2">Piad</option>
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
            data={payment}
            columns={columns}
            classes="table-responsive"
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

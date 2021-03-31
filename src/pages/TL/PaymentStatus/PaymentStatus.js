import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";

function PaymentStatus() {
  const alert = useAlert();
  const userid = window.localStorage.getItem("tlkey");
  const cust_id = window.localStorage.getItem("userid");

  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [selectedData, setSelectedData] = useState([]);
  const [count, setCount] = useState("");
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    getPaymentStatus();
  }, []);

  const getPaymentStatus = () => {
    axios.get(`${baseUrl}/tl/getUploadedProposals`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPayment(res.data.result);
        setCount(res.data.result.length);
      }
    });
  };

  // accepted proposal
  const accepted = (key) => {
    console.log("acc", key);

    let formData = new FormData();
    formData.append("id", key);
    formData.append("status", 7);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/ProposalAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          getPaymentStatus();
          alert.success("accepted !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  // rejected proposal
  // const rejected = (key) => {
  //   console.log("rej", key);
  // };

  const makeAssignment = (key) => {
    console.log("makeAssignment", key);

    let formData = new FormData();
    formData.append("proposal_id", key.id);
    formData.append("q_id", key.assign_id);
    formData.append("tl_id", JSON.parse(userid));
    formData.append("customer_id", JSON.parse(cust_id));

    axios({
      method: "POST",
      url: `${baseUrl}/tl/MakeAssignment`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          getPaymentStatus();
          alert.success("accepted assignment!");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
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

  return (
    <>
      <Layout TLDashboard="TLDashboard" TLuserId={userid}>
        <Card>
          <CardHeader>
            <Row>
              <Col md="7">
                <CardTitle tag="h4">Payment Status ({count})</CardTitle>
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
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Query No</th>
                  <th>Proposal No</th>
                  <th>Customer Name</th>
                  <th>Proposed Amount</th>
                  <th style={{ color: "#21a3ce" }}>Accepted Amount</th>
                  <th style={{ color: "#064606" }}>Paid Amount</th>
                  <th style={{ color: "darkred" }}>Amount Outstanding</th>
                  <th>status</th>
                  {/* <th style={{ textAlign: "center" }}>Accept Amount</th> */}
                  <th style={{ textAlign: "center" }}>Accept as Assignment</th>
                </tr>
              </thead>
              <tbody>
                {payment.length > 0 ? (
                  payment.map((p, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{p.assign_no}</td>
                      <td>{p.proposal_number}</td>
                      <td>{p.name}</td>
                      <td>{p.amount}</td>
                      <td style={{ color: "#21a3ce" }}>{p.accepted_amount}</td>
                      <td style={{ color: "#064606" }}>{p.paid_amount}</td>
                      <td style={{ color: "darkred" }}>
                        {checkOutstading(p.paid_amount, p.accepted_amount)}
                      </td>
                      <td>{p.status}</td>

                      <td>
                        <div
                          title="Accept Assignment"
                          style={{
                            cursor: "pointer",
                            color: "green",
                            textAlign: "center",
                          }}
                        >
                          {p.paid_amount > 0 && p.sid < 9 && (
                            <div>
                              <i
                                class="fa fa-check"
                                style={{ cursor: "pointer" }}
                                onClick={() => makeAssignment(p)}
                              ></i>
                            </div>
                          )}
                        </div>

                        <div
                          title="Add Assignment stages"
                          style={{ cursor: "pointer", textAlign: "center" }}
                        >
                          {p.sid > 8 && (
                            <Link to={`/teamleader/addassingment/${p.id}`}>
                              <i class="fa fa-tasks"></i>
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">No Records</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
}

export default PaymentStatus;

/* <tbody>
              <tr>
                  <td>1</td>
                  <td>123</td>
                  <td>Net banking</td>
                  <td>
                  <div style={{display:"flex", justifyContent:"space-evenly"}}>
                     <div>A</div>
                     <div>B</div>
                  </div>  
                  </td>               
                </tr>
              </tbody> */

// {p.negotiated_amount === "0" ? (
// <div
//   style={{
//     display: "flex",
//     justifyContent: "space-evenly",
//   }}
// >
//   <div style={{ cursor: "pointer" }}>
//     <i
//       class="fa fa-check"
//       onClick={() => accepted(p.assign_id)}
//     ></i>
//   </div>
//   <div style={{ cursor: "pointer" }}>
//     <i
//       class="fa fa-times"
//       onClick={() => rejected(p.assign_id)}
//     ></i>
//   </div>
// </div>
// ) : null}

{
  /* <td>
                        {p.negotiated_amount === "0" &&
                        p.accepted_amount === "0" ? (
                          ""
                        ) : p.negotiated_amount && p.accepted_amount === "0" ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <div
                              title="amount Accepted"
                              style={{ cursor: "pointer", color: "orange" }}
                            >
                              <i
                                class="fa fa-check"
                                onClick={() => accepted(p.assign_id)}
                              ></i>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </td> */
}

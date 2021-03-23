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

function PaidComponent() {
  const [payment, setPayment] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    getPaymentStatus();
  }, []);

  const getPaymentStatus = () => {
    axios.get(`${baseUrl}/tl/getUploadedProposals`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPayment(res.data.result);
      }
    });
  };

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
        `${baseUrl}/tl/getUploadedProposals?cat_id=${selectedData}&from=${data.p_dateFrom}&to=${data.p_dateTo}`
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
              <CardTitle tag="h4">Payment status</CardTitle>
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
          </div>
        </CardHeader>
        <CardBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Query No</th>
                <th>Proposal No</th>
                <th>Customer Name</th>
                <th style={{ color: "#21a3ce" }}>Accepted Amount</th>
                <th style={{ color: "#064606" }}>Paid Amount</th>
                <th style={{ color: "darkred" }}>Amount Outstanding</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payment.length > 0 ? (
                payment.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <th>
                      <Link to={`/admin/queries/${p.id}`}>{p.assign_no}</Link>
                    </th>
                    <td>{p.proposal_number}</td>
                    <td>{p.name}</td>
                    <td style={{ color: "#21a3ce" }}>{p.accepted_amount}</td>
                    <td style={{ color: "#064606" }}>{p.paid_amount}</td>
                    <td style={{ color: "darkred" }}>
                      {checkOutstading(p.paid_amount, p.accepted_amount)}
                    </td>
                    <td>
                      {checkStatus(
                        Number(p.paid_amount),
                        Number(p.accepted_amount)
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No Records</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default PaidComponent;

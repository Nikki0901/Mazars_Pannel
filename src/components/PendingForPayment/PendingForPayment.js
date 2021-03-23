import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";

function PendingForPayment({ CountPendingForPayment }) {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [pendingData, setPendingData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    getPendingForPayment();
  }, []);

  const getPendingForPayment = () => {
    axios.get(`${baseUrl}/admin/getProposals?&status=5,7`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPendingData(res.data.result);
        CountPendingForPayment(res.data.result.length);
      }
    });
  };

  //search filter
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
    getPendingForPayment();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    getPendingForPayment();
  };

  //reset category
  const resetCategory = () => {
    console.log("resetData ..");
    setSelectedData([]);
    getPendingForPayment();
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}/admin/getProposals?&status=5,7&cat_id=${selectedData}&from=${data.p_dateFrom}&to=${data.p_dateTo}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          if (res.data.result) {
            setPendingData(res.data.result);
          }
        }
      });
  };

  // function checkOutstading(p, a) {
  //   console.log("paid -", p);
  //   console.log("acc -", a);
  //   if (p == 0) {
  //     return "0";
  //   } else return a - p;
  // }

  return (
    <>
      <Card>
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
          <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Assignment No</th>
                <th>Amount Accepted</th>
                <th>Payment Terms</th>
                <th>Payments Received</th>
                <th>Outstanding payment</th>
              </tr>
            </thead>
            <tbody>
              {pendingData.length > 0 ? (
                pendingData.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                    {/*   
                    <td>{p.paid_amount}</td>
                    <td>{checkOutstading(p.paid_amount, p.accepted_amount)}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No Records</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default PendingForPayment;

{
  /* <td>{p.accepted_amount - p.paid_amount}</td> */
}

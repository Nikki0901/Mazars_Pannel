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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";

function PendingAllocation({ CountPendingAllocation }) {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  const [pendingData, setPendingData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    getPendingForAllocation();
  }, []);

  const getPendingForAllocation = () => {
    axios.get(`${baseUrl}/admin/pendingAllocation`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPendingData(res.data.result);
        localStorage.setItem(
          "count_PFA",
          JSON.stringify(res.data.result.length)
        );
        // CountPendingAllocation(res.data.result.length)
      }
    });
  };

  //search filter
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
    getPendingForAllocation();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    // setSelectedData([])
    getPendingForAllocation();
  };

  //reset category
  const resetCategory = () => {
    console.log("resetData ..");
    setSelectedData([]);
    getPendingForAllocation();
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}/admin/pendingAllocation?category=${selectedData}&date1=${data.p_dateFrom}&date2=${data.p_dateTo}`
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

  //change date format
  function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("-");
  }

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
          <div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Date</th>
                  <th scope="col">Category</th>
                  <th scope="col">Sub Category</th>
                  <th>Customer Name</th>
                  <th scope="col">Query No .</th>
                  <th scope="col">Query Allocation</th>
                </tr>
              </thead>
              {pendingData.map((p, i) => (
                <tbody key={i}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td>{p.name}</td>
                    <th scope="row">
                      <Link to={`/admin/queries/${p.id}`}>{p.assign_no}</Link>
                    </th>
                    <td class="text-center">
                      {p.is_assigned === "1" ? (
                        ""
                      ) : (
                        //    <Link to={`/admin/queryassing/${p.id}`}>
                        //  <i class="fa fa-share" style={{color:"green"}}></i>
                        //  </Link>
                        <Link to={`/admin/queryassing/${p.id}`}>
                          <i class="fa fa-share"></i>
                        </Link>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{ textAlign: "center" }}>
                      {p.is_assigned === "1" && (
                        <p style={{ color: "green" }}>Assigned to {p.tname}</p>
                      )}

                      {p.reject === "3" && (
                        <p style={{ color: "red" }}>
                          Query Rejected By {p.tname}
                        </p>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default PendingAllocation;

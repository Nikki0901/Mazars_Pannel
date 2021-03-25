import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import "antd/dist/antd.css";
import { Select } from "antd";
import { useForm } from "react-hook-form";

function CustomerFilter(props) {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [selectedData, setSelectedData] = useState([]);

  const { setData, getData, id, query, proposal, assignment } = props;

  //search filter
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
    getData();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    getData();
  };

  // //reset category
  // const resetCategory = () => {
  //   console.log("resetData ..");
  //   setSelectedData([]);
  //   getData();
  // };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    console.log("proposal :", data.p_status);

    if (query == "query") {
      axios
        .get(
          `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
            id
          )}&cat_id=${selectedData}&from=${data.p_dateFrom}&to=${
            data.p_dateTo
          }&status=${data.p_status}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
            }
          }
        });
    }

    if (proposal == "proposal") {
      axios
        .get(
          `${baseUrl}/customers/getProposals?uid=${JSON.parse(
            id
          )}&cat_id=${selectedData}&from=${data.p_dateFrom}&to=${
            data.p_dateTo
          }&status=${data.p_status}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
            }
          }
        });
    }

    if (assignment == "assignment") {
      axios
        .get(
          `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
            id
          )}&cat_id=${selectedData}&from=${data.p_dateFrom}&to=${
            data.p_dateTo
          }&status=${data.p_status}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
            }
          }
        });
    }
  };

  return (
    <>
      <div className="row">
        <div class="col-sm-4 d-flex">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select Category"
            defaultValue={[]}
            onChange={handleChange}
            optionLabelProp="label"
            value={selectedData}
            allowClear
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
                <div className="demo-option-label-item">Advisory/opinion</div>
              </Option>
              <Option value="7" label="Transfer Pricing">
                <div className="demo-option-label-item">Transfer Pricing</div>
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
                <div className="demo-option-label-item">Advisory/opinion</div>
              </Option>
              <Option value="13" label="Others">
                <div className="demo-option-label-item">Others</div>
              </Option>
            </OptGroup>
          </Select>

          {/* <div>
            <button
              type="submit"
              class="btn btn-primary mb-2 ml-3"
              onClick={resetCategory}
              style={{ padding: "4px 9px" }}
            >
              X
            </button>
          </div> */}
        </div>

        <div className="col-sm-8 d-flex p-0">
          <div>
            <form class="form-inline" onSubmit={handleSubmit(onSubmit)}>
              <div class="form-group mb-2">
                <label className="form-select form-control">From</label>
              </div>
              <div class="form-group mb-2 ml-1">
                <input
                  type="date"
                  name="p_dateFrom"
                  className="form-select form-control"
                  ref={register}
                  style={{width:"90%"}}
                />
              </div>

              <div class="form-group mb-2 ml-1">
                <label className="form-select form-control">To</label>
              </div>
              <div class="form-group mb-2 ml-1">
                <input
                  type="date"
                  name="p_dateTo"
                  className="form-select form-control"
                  ref={register}
                  style={{width:"90%"}}

                />
              </div>

              <div class="form-group mb-2 ml-1">
              {query == "query" && (
                  <select
                    className="form-select form-control"
                    name="p_status"
                    ref={register}
                    style={{ height: "33px" }}
                  >
                    <option value="">--select--</option>
                    <option value="1">Inprogress</option>
                    <option value="2">Progress</option>
                    <option value="3">Complete</option>
                  </select>
                )}

                {assignment == "assignment" && (
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
                )}
                {proposal == "proposal" && (
                  <select
                    className="form-select form-control"
                    name="p_status"
                    ref={register}
                    style={{ height: "33px" }}
                  >
                    <option value="">--select--</option>
                    <option value="1">Pending</option>
                    <option value="2">Accepted</option>
                    <option value="3">Declined</option>
                  </select>
                )}
              </div>

              <button type="submit" class="btn btn-primary mb-2 ml-1">
                <i class="fa fa-search"></i>
              </button>
            </form>
          </div>

          <div>
            <button
              type="submit"
              class="btn btn-primary mb-2 ml-2"
              onClick={resetData}
            >
            <i class="fa fa-refresh"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerFilter;

// http://13.232.121.233/mazarapi/v1/customers/incompleteAssignments?user=93&cat_id=&from=2021-03-20&to=2021-03-20

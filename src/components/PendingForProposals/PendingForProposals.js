import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link } from "react-router-dom";
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


function PendingForProposals({ CountPendingProposal }) {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  const [nonpendingData, setNonPendingData] = useState([]);
 const [selectedData, setSelectedData] = useState([]);



  useEffect(() => {
    getPendingForProposals();
  }, []);

  const getPendingForProposals = () => {
    axios.get(`${baseUrl}/admin/pendingProposal`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setNonPendingData(res.data.result);
        CountPendingProposal(res.data.result.length);
      }
    });
  };


   //search filter
   const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
    getPendingForProposals();
  }


  // `${baseUrl}/get/filter/admin/date1/${data.p_dateFrom}/date2/${data.p_dateTo}/category/${selectedData}`
  // admin/pendingAllocation?category=4&date1=&date2
  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}/admin/pendingProposal?category=${selectedData}&date1=${data.p_dateFrom}&date2=${data.p_dateTo}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          if (res.data.result) {
            setNonPendingData(res.data.result);
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
            <div class="col-sm-4">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select Category"
                defaultValue={[]}
                onChange={handleChange}
                optionLabelProp="label"
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
            </div>

            <div className="col-sm-8">
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
          </div>
        </CardHeader>

        <CardBody>
          <div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Query No .</th>
                  <th scope="col">Category</th>
                  <th scope="col">Sub Category</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Facts of the Case</th>
                  <th scope="col">Pending for Allocation</th>
                </tr>
              </thead>
              {nonpendingData.map((p, i) => (
                <tbody>
                  <tr>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <th scope="row">
                      <Link to={`/admin/queries/${p.id}`}>{p.assign_no}</Link>
                    </th>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td>{p.name}</td>
                    <td>{p.fact_case}</td>
                    <td class="text-center">
                      <p style={{ color: "green" }}>
                        Query accepted by {p.tname}
                      </p>
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

export default PendingForProposals;

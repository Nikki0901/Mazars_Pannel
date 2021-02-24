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
import { Multiselect } from "multiselect-react-dropdown";
import "antd/dist/antd.css";
import { Select } from "antd";

// import MultiSelect from './MultiSelect'

function QueriesTab() {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  const [pendingData, setPendingData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);


  useEffect(() => {
    getPendingForAllocation();
  }, []);

  const getPendingForAllocation = () => {
    axios.get(`${baseUrl}/get/filter/admin/date`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPendingData(res.data.result);
      }
    });
  };

  

  //search filter

  function handleChange(value) {
    console.log(`selected ${value}`);
    setSelectedData(value);
  }

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);

    axios
      .get(
        `${baseUrl}/get/filter/admin/date1/${data.p_dateFrom}/date2/${data.p_dateTo}/category/${selectedData}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setPendingData(res.data.result);
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
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Date</th>
                  <th scope="col">Category</th>
                  <th scope="col">Sub Category</th>
                  <th scope="col">Query No .</th>
                  <th scope="col">Query Allocation</th>
                </tr>
              </thead>
              {pendingData.map((p, i) => (
                <tbody key={i}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <td>{p.parent_id} </td>
                    <td>{p.cat_name}</td>
                    <th scope="row">
                      <Link to={`/admin/queries/${p.id}`}>{p.AssignNo}</Link>
                    </th>
                    <td class="text-center">
                      {p.assignto === "1" ? (
                        <p style={{ color: "green" }}>
                          Assigned to {p.teamleadername}
                        </p>
                      ) : (
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
                    <td style={{ textAlign: "center" }}>
                      {p.reject === "3" && (
                        <p style={{ color: "red" }}>
                          Query Rejected By {p.teamleadername}
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

export default QueriesTab;

const taxx = [
  {
    id: 1,
    name: "direct Tax",
  },
  {
    id: 2,
    name: "Compilance",
  },
  {
    id: 3,
    name: "Assessment",
  },
  {
    id: 4,
    name: "Appeals",
  },
  {
    id: 5,
    name: "others",
  },
  {
    id: 6,
    name: "Indirect tax",
  },
  {
    id: 7,
    name: "Compilance",
  },
  {
    id: 8,
    name: "Assessment",
  },
  {
    id: 9,
    name: "Advisory/opinion",
  },
];

{
  /* <div class="form-group mb-2 ml-2">
          <select
            className="form-select form-control"
            name="p_tax2"
            ref={register}
            onChange={(e) => setStore2(e.target.value)}
          >
            <option value="">--Select Sub-Category--</option>
            {tax2.map((p, index) => (
              <option key={index} value={p.id}>
                {p.details}
              </option>
            ))}
          </select>
        </div> */
}

//   <div class="form-group mb-2">
//   <select
//     className="form-select form-control"
//     name="p_tax"
//     ref={register}
//     onChange={(e) => setStore(e.target.value)}
//   >
//     <option value="">--Select Category--</option>
//     {tax.map((p, index) => (
//       <option key={index} value={p.id}>
//         {p.details}
//       </option>
//     ))}
//   </select>
// </div>

{
  /* <select
            className="form-select form-control"
            name="p_tax"
            ref={register}
            onChange={(e) => setStore(e.target.value)}
          >     
           <option value="">--Select Category--</option>              
          </select> */
}

{
  /* <div class="dropdown">
            <button class="btn btn-primary
             dropdown-toggle" type="button"
              id="dropdownMenuButton" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Select Category
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Direct Tax</a>
              <div className="d-flex">
              <input
                    class="dropdown-item"
                    type="checkbox"
                    name="p_check1"
                    ref={register}
                    value="1"
                  />
              <label className="form-check-label">Compilance</label>
              </div>
              <div className="d-flex">
              <input
                    class="dropdown-item"
                    type="checkbox"
                    name="p_check2"
                    ref={register}
                    value="2"
                  />
              <label className="form-check-label">Assessment</label>
              </div>
              
              
            </div>
          </div> */
}

// const options = [
//   {name:"Compilance" , id:1, cat: "direct"},
//   {name:"Assessment" , id:2, cat: "direct"},
//   {name:"Compilance" , id:4 ,cat: "indirect"},
//   {name:"Assessment" , id:5 ,cat: "indirect"},
//   {name:"others" , id:6 ,cat: "indirect"},
// ]

//   const [data, setData] = useState(options);
// const  onSelect = (data) => {
//     console.log(data)
// }

{
  /* <Multiselect
              options={data}
              displayValue="name"
              groupBy="cat"
              showCheckbox={true}
              onSelect={onSelect}
            /> */
}

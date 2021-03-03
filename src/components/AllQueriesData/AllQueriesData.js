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


function AllQueriesData({CountAllQuery}) {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  const [allQueriesData, setAllQueriesData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);


  useEffect(() => {
    getAllQueriesData();
  }, []);

  const getAllQueriesData = () => {
    axios.get(`${baseUrl}/admin/getAllQueries`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setAllQueriesData(res.data.result);
        CountAllQuery(res.data.result.length)
      }
    });
  };


    //search filter
    const handleChange = (value) => {
      console.log(`selected ${value}`);
      setSelectedData(value);
      getAllQueriesData();
    }


    const onSubmit = (data) => {
      console.log("data :", data);
      console.log("selectedData :", selectedData);
      axios
        .get(
          `${baseUrl}/admin/getAllQueries?cat_id=${selectedData}&from=${data.p_dateFrom}&to=${data.p_dateTo}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result) {
              setAllQueriesData(res.data.result);
            }
          }
        });
    };

  // change date format
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
        <Table responsive="sm" bordered>
          <thead>
            <tr>
              <th scope="col">Sr. No.</th>
              <th scope="col">Date</th>
              <th scope="col">Category</th>
              <th scope="col">Sub Category</th>
              <th scope="col">Query No .</th>
            </tr>
          </thead>
          <tbody>
            {allQueriesData.length > 0 ? (
              allQueriesData.map((p, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{ChangeFormateDate(p.created)}</td>
                  <td>{p.parent_id} </td>
                  <td>{p.cat_name}</td>
                  <th scope="row">
                    <Link to={`/admin/queries/${p.id}`}>{p.assign_no}</Link>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Records</td>
              </tr>
            )}
          </tbody>
        </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default AllQueriesData;

// {allQueriesData.map((p, i) => (
//   <div>
//     <table class="table table-bordered" key={i}>
//       <thead>
//         <tr>
//           <th scope="col">Sr. No.</th>
//           <th scope="col">Date</th>
//           <th scope="col">Category</th>
//           <th scope="col">Sub Category</th>
//           <th scope="col">Query No .</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>{i + 1}</td>
//           <td>{p.created}</td>
//           <td>{p.parent_id} </td>
//           <td>{p.cat_name}</td>
//           <th scope="row">
//             <Link to={`/admin/queries/${p.id}`}>{p.AssignNo}</Link>
//           </th>
//         </tr>
//         <tr>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// ))}

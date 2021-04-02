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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
// import Filter from "../Search-Filter/SearchFilter";
import BootstrapTable from "react-bootstrap-table-next";

function PendingAllocation({ CountPendingForAllocation }) {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  const [pendingData, setPendingData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [history, setHistory] = useState([]);

  const [modal, setModal] = useState(false);

  const toggle = (key) => {
    console.log("key", key);
    setModal(!modal);

    fetch(`${baseUrl}/customers/getQueryHistory?q_id=${key}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/vnd.github.cloak-preview",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setHistory(response.result);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPendingForAllocation();
  }, []);

  const getPendingForAllocation = () => {
    axios.get(`${baseUrl}/admin/pendingAllocation`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        CountPendingForAllocation(res.data.result.length);
        setPendingData(res.data.result);
        // localStorage.setItem(
        //   "count_PFA",
        //   JSON.stringify(res.data.result.length)
        // );
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
        var oldDate = row.created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
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
      text: "Customer Name",
      dataField: "name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Query Allocation",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            {row.is_assigned === "1" ? (
              <p style={{ color: "green", fontSize: "10px" }}>
                Assign to {row.tname} on
                {row.allocation_time}
              </p>
            ) : (
              <Link to={`/admin/queryassing/${row.id}`}>
                <i class="fa fa-share"></i>
              </Link>
            )}
          </>
        );
      },
    },
    {
      text: "View",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <button
              type="button"
              class="btn btn-info btn-sm"
              onClick={() => toggle(row.id)}
            >
              View
            </button>
          </>
        );
      },
    },
  ];
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
    // console.log("date", oldDate);
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

  return (
    <>
      <Card>
        <CardHeader>
          {/* <Filter
            setData={setPendingData}
            getData={getPendingForAllocation}
            pendingAllocation="pendingAllocation"
          /> */}

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
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={pendingData}
            columns={columns}
            rowIndex
          />

          {/* <div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Date</th>
                  <th scope="col">Query No</th>
                  <th scope="col">Category</th>
                  <th scope="col">Sub Category</th>
                  <th>Customer Name</th>
                  <th scope="col">Query Allocation</th>
                  <th scope="col">History</th>
                </tr>
              </thead>
              {pendingData.map((p, i) => (
                <tbody key={i}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <th scope="row">
                      <Link to={`/admin/pending/${p.id}`}>{p.assign_no}</Link>
                    </th>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td>{p.name}</td>
                    <td class="text-center">
                      {p.is_assigned === "1" ? (
                        <p style={{ color: "green", fontSize: "10px" }}>
                          Assign to {p.tname} on
                          {p.allocation_time}
                        </p>
                      ) : (
                        <Link to={`/admin/queryassing/${p.id}`}>
                          <i class="fa fa-share"></i>
                        </Link>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-info btn-sm"
                        onClick={() => toggle(p.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div> */}

          <Modal isOpen={modal} fade={false} toggle={toggle}>
            <ModalHeader toggle={toggle}>History</ModalHeader>
            <ModalBody>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="row">S.No</th>
                    <th scope="row">Name</th>
                    <th scope="row">Query No</th>
                    <th scope="row">Status</th>
                    <th scope="row">Date of Allocation</th>
                  </tr>
                </thead>

                {history.length > 0
                  ? history.map((p, i) => (
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{p.name}</td>
                          <td>{p.assign_no}</td>
                          <td>{p.status}</td>
                          <td>{ChangeFormateDate(p.date_of_allocation)}</td>
                        </tr>
                      </tbody>
                    ))
                  : null}
              </table>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    </>
  );
}

export default PendingAllocation;

/* <td style={{ textAlign: "center" }}>
                      {p.is_assigned === "1" && (
                        <p style={{ color: "green" }}>
                          <i class="fa fa-circle" 
                          style={{fontSize:"10px" ,marginRight:"4px"}}>
                            </i>
                            {p.allocation_time}
                          </p>
                      )}

                      {p.reject === "3" && (
                        <p style={{ color: "red" }}>
                          Query Rejected By {p.tname}
                        </p>
                      )}
                    </td> */

//   <Modal isOpen={addModal} toggle={addHandler} size="md">
//   <ModalHeader toggle={addHandler}>Show history</ModalHeader>
//   <ModalBody>
// <table class="table table-bordered">
//   <thead>
//     <tr>
//       <th scope="col">Titles</th>
//       <th scope="col">Data</th>
//     </tr>
//   </thead>

//   {history.length > 0
//     ? history.map((p, i) => (
//         <tbody>
//           <tr>
//             <th scope="row">Name</th>
//             <td>{p.name}</td>
//           </tr>

//           <tr>
//             <th scope="row">Date of Allocation</th>
//             <td>{ChangeFormateDate(p.date_of_allocation)}</td>
//           </tr>
//           <tr>
//             <th scope="row">Query No</th>
//             <td>{p.assign_no}</td>
//           </tr>
//           <tr>
//             <th scope="row">Status</th>
//             <td>{p.status}</td>
//           </tr>
//         </tbody>
//       ))
//     : null}
// </table>
//   </ModalBody>
// </Modal>

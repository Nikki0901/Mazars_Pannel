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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import BootstrapTable from "react-bootstrap-table-next";
import AdminFilter from "../../components/Search-Filter/AdminFilter";

function PendingForProposals({ CountPendingProposal }) {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  const [nonpendingData, setNonPendingData] = useState([]);
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
    getPendingForProposals();
  }, []);

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
    },
    {
      dataField: "created",
      text: "Date",
      sort: true,

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
    },
    {
      dataField: "cat_name",
      text: "Sub Category",
      sort: true,
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
      text: "Status",
      dataField: "status",
      sort: true,
    },

    {
      dataField: "tname",
      text: "TL name",
      sort: true,
    },
    {
      text: "History",
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
              History
            </button>
          </>
        );
      },
    },
  ];

  const getPendingForProposals = () => {
    axios.get(`${baseUrl}/admin/pendingProposal`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setNonPendingData(res.data.result);
        // CountPendingProposal(res.data.result.length);
      }
    });
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    // setSelectedData([]);
    getPendingForProposals();
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}/admin/pendingProposal?category=${store2}&date1=${data.p_dateFrom}&date2=${data.p_dateTo}`
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
    console.log("date", oldDate);
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
    <>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setNonPendingData}
            getData={getPendingForProposals}
            pendingForProposal="pendingForProposal"
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
                        <option value="1">Pending</option>
                        <option value="2">Accepted</option>
                        <option value="3">Declined</option>
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
            data={nonpendingData}
            columns={columns}
            wrapperClasses="table-responsive"
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
                  <th scope="col">History</th>
                </tr>
              </thead>
              {nonpendingData.map((p, i) => (
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <th scope="row">
                      <Link to={`/admin/queries/${p.id}`}>{p.assign_no}</Link>
                    </th>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td>{p.name}</td>
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

export default PendingForProposals;
{
  /* <td class="text-center">
                      <p style={{ color: "green" }}>
                        Query accepted by {p.tname}
                      </p>
                    </td> */
}

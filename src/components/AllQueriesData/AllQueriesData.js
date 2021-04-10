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
// import Filter from "../Search-Filter/SearchFilter";
import BootstrapTable from "react-bootstrap-table-next";

function AllQueriesData({ CountAllQuery }) {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [selectedData, setSelectedData] = useState([]);

  const [allQueriesData, setAllQueriesData] = useState([]);
  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);

  const [store, setStore] = useState("");
  const [store2, setStore2] = useState(null);

  useEffect(() => {
    getAllQueriesData();
  }, []);

  const getAllQueriesData = () => {
    axios.get(`${baseUrl}/admin/getAllQueries`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setAllQueriesData(res.data.result);
        CountAllQuery(res.data.result.length);
      }
    });
  };

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
      text: "S.No",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px", width: "50px" };
      },
      // dataFormat: function (cell, row, enumObject, index) {
      //   return <div>{index + 1}</div>;
      // },
      formatter: (cellContent, row, rowIndex, index) => {
        console.log("rowIndex : ", index);
        return <div>{rowIndex + 1}</div>;
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
      text: "Status",
      dataField: "status",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
  ];


  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    getAllQueriesData();
  };


  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("store2 :", store2);

    axios
      .get(
        `${baseUrl}/admin/getAllQueries?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}`
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
            <div className="col-sm-12 d-flex">
              <form class="form-inline" onSubmit={handleSubmit(onSubmit)}>
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

                <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
                  <i class="fa fa-search"></i>
                </button>

                <button
                  type="submit"
                  class="btn btn-primary mx-sm-1 mb-2"
                  onClick={resetData}
                >
                  <i class="fa fa-refresh"></i>
                </button>
              </form>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={allQueriesData}
            columns={columns}
            rowIndex
            wrapperClasses="table-responsive"
            // classes="table-responsive"
            // headerClasses="header-class"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default AllQueriesData;

{
  /* <Select
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
</Select> */
}

{
  /* <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Date</th>
                <th scope="col">Query No</th>
                <th scope="col">Category</th>
                <th scope="col">Sub Category</th>
                <th>Customer Name</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {allQueriesData.length > 0 ? (
                allQueriesData.map((p, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <th>
                      <Link to={`/admin/queries/${p.id}`}>{p.assign_no}</Link>
                    </th>
                    <td>{p.parent_id} </td>
                    <td>{p.cat_name}</td>
                    <td>{p.name}</td>
                    <td>{p.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Records</td>
                </tr>
              )}
            </tbody>
          </Table> */
}

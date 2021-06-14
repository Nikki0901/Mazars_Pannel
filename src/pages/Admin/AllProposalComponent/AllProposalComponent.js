import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
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
import { Link, NavLink } from "react-router-dom";
import AdminFilter from "../../../components/Search-Filter/AdminFilter";
import BootstrapTable from "react-bootstrap-table-next";

function AllProposalComponent({ allProposal }) {
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  useEffect(() => {
    getProposalData();
  }, []);

  const getProposalData = () => {
    axios.get(`${baseUrl}/admin/getProposals`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setProposalDisplay(res.data.result);
        // allProposal(res.data.result.length);
      }
    });
  };

  const [selectedData, setSelectedData] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);

  useEffect(() => {
    const getSubCategory = () => {
      axios
        .get(`${baseUrl}/customers/getCategory?pid=${selectedData}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setTax2(res.data.result);
          }
        });
    };
    getSubCategory();
  }, [selectedData]);

  const columns = [
    {
      dataField: "",
      text: "S.No",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "created",
      text: "Date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
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
      dataField: "assign_no",
      text: "Query No",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            <Link
              to={{
                pathname: `/admin/queries/${row.q_id}`,
                index: 0,
                routes: "proposal",
              }}
            >
              {row.assign_no}
            </Link>
          </>
        );
      },
    },
    {
      dataField: "parent_id",
      text: "Category",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "cat_name",
      text: "Sub Category",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Date of Proposal",
      dataField: "DateofProposal",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.DateofProposal);
        var oldDate = row.DateofProposal;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Date of acceptance of Proposal",
      dataField: "cust_accept_date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.cust_accept_date);
        var oldDate = row.cust_accept_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Status",
      dataField: "status",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "ProposedAmount",
      text: "Proposed Amount",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "accepted_amount",
      text: "Accepted Amount ",
      sort: true,
      style: {
        fontSize: "11px",
        color: "#21a3ce",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "#21a3ce" };
      },
    },
    {
      text: "Amount Paid",
      dataField: "paid_amount",
      sort: true,
      style: {
        fontSize: "11px",
        color: "#064606",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "#064606" };
      },
    },

    {
      text: "Amount Outstanding",
      dataField: "",
      sort: true,
      style: {
        fontSize: "11px",
        color: "darkred",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "darkred" };
      },
      formatter: function amountOutstading(cell, row) {
        var a = row.accepted_amount;
        var p = row.paid_amount;
        return a - p;
      },
    },
    {
      text: "Date of Payment",
      dataField: "cust_paid_date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.cust_paid_date);
        var oldDate = row.cust_paid_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Date of Completion",
      dataField: "",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "tl_name",
      text: "TL name",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
  ];

  //handleCategory
  const handleCategory = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
    setStore2([]);
  };

  //handleSubCategory
  const handleSubCategory = (value) => {
    console.log(`selected ${value}`);
    setStore2(value);
  };

  //reset category
  const resetCategory = () => {
    console.log("resetCategory ..");
    setSelectedData([]);
    setStore2([]);
    getProposalData();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    // setStatus([]);
    setSelectedData([]);
    setStore2([]);
    getProposalData();
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    axios
      .get(
        `${baseUrl}/admin/getProposals?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status1=${data.p_status}&pcat_id=${selectedData}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          if (res.data.result) {
            setProposalDisplay(res.data.result);
          }
        }
      });
  };

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
          <div className="row">
            <div className="col-sm-12 d-flex">
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-inline">
                    <div class="form-group mb-2">
                      <Select
                        style={{ width: 130 }}
                        placeholder="Select Category"
                        defaultValue={[]}
                        onChange={handleCategory}
                        value={selectedData}
                      >
                        <Option value="1" label="Compilance">
                          <div className="demo-option-label-item">
                            Direct Tax
                          </div>
                        </Option>
                        <Option value="2" label="Compilance">
                          <div className="demo-option-label-item">
                            Indirect Tax
                          </div>
                        </Option>
                      </Select>
                    </div>

                    <div class="form-group mx-sm-1  mb-2">
                      <Select
                        mode="multiple"
                        style={{ width: 250 }}
                        placeholder="Select Sub Category"
                        defaultValue={[]}
                        onChange={handleSubCategory}
                        value={store2}
                        allowClear
                      >
                        {tax2.map((p, index) => (
                          <Option value={p.id} key={index}>
                            {p.details}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <button
                        type="submit"
                        class="btn btn-primary mb-2 ml-3"
                        onClick={resetCategory}
                      >
                        X
                      </button>
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
                    <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
                      Search
                    </button>

                    <Reset />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={proposalDisplay}
            columns={columns}
            classes="table-responsive"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default AllProposalComponent;

// headerStyle: () => {
//   return { width: "100px", textAlign: "center" };
// },

// events: {
//   onClick: (e, column, columnIndex, row, rowIndex) => {
//     console.log("cellContent", row);
//     console.log("cellContent", row.q_id);
//     return (
//       <div>
//         <Link to={`/admin/queries/${row.q_id}`}>{row.q_id}</Link>
//       </div>
//     );
//   },
// },

// const defaultSorted = [
//   {
//     dataField: "assign_no",
//     order: "desc",
//   },
// ];

// const rowEvents = {
//   onClick: (e, row, rowIndex) => {
//     console.log(`clicked on row with index: ${rowIndex}`);
//     console.log(`clicked on row with index: ${e}`);
//     console.log(`clicked on row with index: ${row}`);
//   },
// };

{
  /* <CardHeader>
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
        </CardHeader> */
}

{
  /* <Table responsive="sm" bordered>
            <thead class="table_head">
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Query No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Proposal No.</th>
                <th>Proposal Sent date</th>
                <th>Proposed Amount</th>
                <th>Proposal Status</th>
                <th>Amount Accepted</th>
                <th>Assignment Number</th>
                <th>TL name</th>
              </tr>
            </thead>
            <tbody class="table_bdy">
              {proposalDisplay.length > 0 ? (
                proposalDisplay.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <th>
                      <Link to={`/admin/queries/${p.q_id}`}>{p.assign_no}</Link>
                    </th>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>

                    <td>{p.proposal_number}</td>
                    <td>{ChangeFormateDate(p.DateofProposal)}</td>
                    <td>{p.ProposedAmount}</td>
                    <td>{p.status}</td>
                    <td>{p.accepted_amount}</td>
                    <td></td>
                    <td>{p.tl_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No Records</td>
                </tr>
              )}
            </tbody>
          </Table> */
}

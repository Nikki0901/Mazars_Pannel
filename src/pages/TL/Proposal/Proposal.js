import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
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
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";

function Proposal() {
  const userid = window.localStorage.getItem("tlkey");

  const [proposal, setProposal] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [selectedData, setSelectedData] = useState([]);
  const [count, setCount] = useState("");

  useEffect(() => {
    getProposalList();
  }, []);

  const getProposalList = () => {
    axios
      .get(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setProposal(res.data.result);
          setCount(res.data.result.length);
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
      dataField: "query_date",
      text: "Date",
      sort: true,
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.query_date);
        var oldDate = row.query_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
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
            <Link to={`/teamleader/queries/${row.id}`}>{row.assign_no}</Link>
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
    {
      text: "Edit",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            {row.status == "Accepted" || row.status == "Pending" ? (
              <Link to={`/teamleader/edit-proposal/${row.id}`}>
                <i
                  className="fa fa-edit"
                  style={{
                    fontSize: 18,
                    cursor: "pointer",
                    marginLeft: "8px",
                    color: "green",
                  }}
                ></i>
              </Link>
            ) : null}
          </>
        );
      },
    },
    {
      text: "Prepare",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            {row.status == "TL Accepted" ? (
              <Link to={`/teamleader/sendproposal/${row.id}`}>
                <i class="fa fa-mail-forward"></i>
              </Link>
            ) : null}
          </>
        );
      },
    },
  ];

  //search filter
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
    getProposalList();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    getProposalList();
  };

  //reset category
  const resetCategory = () => {
    console.log("resetData ..");
    setSelectedData([]);
    getProposalList();
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(
          userid
        )}&cat_id=${selectedData}&from=${data.p_dateFrom}&to=${
          data.p_dateTo
        }&status=${data.p_status}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          if (res.data.result) {
            setProposal(res.data.result);
          }
        }
      });
  };

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="9">
              <CardTitle tag="h4">List of Proposals ({count})</CardTitle>
            </Col>
            <Col md="3">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                {/* <Link
                  to={`/teamleader/sendproposal/${id}`}                
                >
                  Send Proposal
                </Link> */}
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <TeamFilter
            setData={setProposal}
            getData={getProposalList}
            proposal="proposal"
          />
          {/* <div className="row">
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
                  style={{ padding: "4px 9px" }}
                >
                  X
                </button>
              </div>
            </div>

            <div className="col-sm-9 d-flex p-0">
              <div>
                <form class="form-inline" onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-group mb-2">
                    <label className="form-select form-control">From</label>
                  </div>
                  <div class="form-group mb-2 ml-2">
                    <input
                      type="date"
                      name="p_dateFrom"
                      className="form-select form-control"
                      ref={register}
                    />
                  </div>

                  <div class="form-group mb-2 ml-2">
                    <label className="form-select form-control">To</label>
                  </div>
                  <div class="form-group mb-2 ml-2">
                    <input
                      type="date"
                      name="p_dateTo"
                      className="form-select form-control"
                      ref={register}
                    />
                  </div>

                  <div class="form-group mb-2 ml-2">
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                    >
                      <option value="">--select--</option>
                      <option value="1">Accepted</option>
                      <option value="2">Pending</option>
                      <option value="3">Cust Accepted</option>
                      <option value="4">Declined</option>
                    </select>
                  </div>

                  <button type="submit" class="btn btn-primary mb-2 ml-2">
                    <i class="fa fa-search"></i>
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
          </div> */}
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={proposal}
            columns={columns}
            rowIndex
          />

          {/* <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Query No.</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Proposal No</th>
                <th>Customer Name </th>
                <th>Amount</th>
                <th>misc1</th>
                <th>misc2</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Edit</th>
                <th style={{ textAlign: "center" }}>Prepare</th>
              </tr>
            </thead>
            <tbody>
              {proposal.length > 0 ? (
                proposal.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <th>
                      <Link to={`/teamleader/queries/${p.id}`}>
                        {p.assign_no}
                      </Link>
                    </th>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td>{p.proposal_number}</td>
                    <td>{p.name}</td>
                    <td>{p.amount}</td>
                    <td>{p.misc1}</td>
                    <td>{p.misc2}</td>
                    <td>{p.status}</td>
                    <td style={{ textAlign: "center" }}>
                      {(p.status == "Accepted" || p.status == "Pending" ) ? (
                        <Link to={`/teamleader/edit-proposal/${p.id}`}>
                          <i
                            className="fa fa-edit"
                            style={{
                              fontSize: 18,
                              cursor: "pointer",
                              marginLeft: "8px",
                              color: "green",
                            }}
                          ></i>
                        </Link>
                      ) : null}
                    </td>

                    <td style={{ textAlign: "center" }}>
                      {p.status == "TL Accepted" ? (
                        <Link to={`/teamleader/sendproposal/${p.id}`}>
                          <i class="fa fa-mail-forward"></i>
                        </Link>
                      ) : null}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No Records</td>
                </tr>
              )}
            </tbody>
          </Table> */}
        </CardBody>
      </Card>
    </Layout>
  );
}

export default Proposal;

// import Layout from "../../../components/Layout/Layout";

{
  /* <ProposalComponent /> */
}

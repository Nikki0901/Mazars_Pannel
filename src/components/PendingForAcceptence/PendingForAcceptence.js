import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";

function PendingForAcceptence({ pendingProposal }) {
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [selectedData, setSelectedData] = useState([]);
  useEffect(() => {
    getPendingAcceptedProposal();
  }, []);

  const getPendingAcceptedProposal = () => {
    axios.get(`${baseUrl}/admin/getProposals?&status=4`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setProposalDisplay(res.data.result);
        pendingProposal(res.data.result.length);
      }
    });
  };

  const columns = [
    {
      dataField: "",
      text: "S.No",
      // sort: true,
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { fontSize: '12px' };
      },
    },
    {
      dataField: ChangeFormateDate("created"),
      text: "Date",
      sort: true,
      headerStyle: () => {
        return { fontSize: '12px' };
      },
    },
    {
      dataField: "assign_no",
      text: "Query No",
      sort: true,
      headerStyle: () => {
        return { fontSize: '12px' };
      },
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
      headerStyle: () => {
        return { fontSize: '12px' };
      },
    },
    {
      dataField: "cat_name",
      text: "Sub Category",
      sort: true,
      headerStyle: () => {
        return { fontSize: '12px' };
      },
    },
    {
      dataField: "proposal_number",
      text: "Proposal number",
      sort: true,
      headerStyle: () => {
        return { fontSize: '12px' };
      },
    },
    {
      dataField: "DateofProposal",
      text: "Proposal Sent date",
      sort: true,
      headerStyle: () => {
        return { fontSize: '12px' };
      },
    },
    {
      dataField: "proposal_number",
      text: "Proposed Amount",
      sort: true,
      headerStyle: () => {
        return { fontSize: '12px' };
      },
    },
    {
      dataField: "status",
      text: "Proposal Status",
      sort: true,
      headerStyle: () => {
        return { fontSize: '12px' };
      },
    },
    {
      dataField: "accepted_amount",
      text: "Amount Accepted",
      sort: true,
      headerStyle: () => {
        return { fontSize: '12px' };
      },
    },
    {
      dataField: "DateofProposal",
      text: "Assignment Number",
      sort: true,
      style: {
        fontSize: '13px'
      },
      headerStyle: () => {
        return { fontSize: '12px' };
      },
    },
    {
      dataField: "tl_name",                                        
      text: "TL name",
      sort: true,
    },
  ];

  //search filter
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
    getPendingAcceptedProposal();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    getPendingAcceptedProposal();
  };

  //reset category
  const resetCategory = () => {
    console.log("resetData ..");
    setSelectedData([]);
    getPendingAcceptedProposal();
  };

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}/admin/getProposals?&status=4&cat_id=${selectedData}&from=${data.p_dateFrom}&to=${data.p_dateTo}`
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

  // change date format
  function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("-");
  }

  return (
    <div>
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
        <BootstrapTable
            bootstrap4
            keyField="id"
            data={proposalDisplay}
            columns={columns}
            rowIndex
          />

          {/* <Table responsive="sm" bordered>
          <thead class="table_head">
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Query No</th>
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
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <th>
                      <Link to={`/admin/queries/${p.q_id}`}>{p.assign_no}</Link>
                    </th>
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
                  <td colSpan="12">No Records</td>
                </tr>
              )}
            </tbody>
          </Table> */}
        </CardBody>
      </Card>
    </div>
  );
}

export default PendingForAcceptence;

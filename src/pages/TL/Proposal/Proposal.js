import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import ChatHistory from "./ChatHistory";

function Proposal() {
  const userid = window.localStorage.getItem("tlkey");

  const [proposal, setProposal] = useState([]);
  const [count, setCount] = useState("");
  const [id, setId] = useState(null);

  const [addPaymentModal, setPaymentModal] = useState(false);
  const chatHandler = (key) => {
    console.log(key);
    setPaymentModal(!addPaymentModal);
    setId(key.assign_no);
  };

  useEffect(() => {
    getProposalList();
  }, []);

  const getProposalList = () => {
    axios
      .get(`${baseUrl}/tl/getProposalTl?id=${JSON.parse(userid)}`)
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
      text: "History",
      // dataField: "revised_text",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            {row.revised_text && (
              <div style={{ cursor: "pointer" }} title="View History">
                {myFunction(row.revised_text)}

                <div>
                  <button
                    type="button"
                    class="btn btn-info btn-sm"
                    onClick={() => chatHandler(row)}
                  >
                    view
                  </button>
                </div>
              </div>
            )}
          </>
        );
      },
    },
    {
      text: "Action",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            {row.status == "Cust Accepted" || row.status == "Pending" ? (
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
            ) : row.status == "Progress" ? (
              <Link to={`/teamleader/sendproposal/${row.id}`}>
                <i
                  class="fa fa-mail-forward"
                  style={{
                    fontSize: 14,
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                ></i>
              </Link>
            ) : null}
          </>
        );
      },
    },
  ];

  const myFunction = (str) => {
    var str2 = "...";
    var res = str.slice(0, 5).concat(str2);
    return res;
  };

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="9">
              <CardTitle tag="h4">List of Proposals ({count})</CardTitle>
            </Col>
            <Col md="3"></Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <TeamFilter
            setData={setProposal}
            getData={getProposalList}
            proposal="proposal"
          />
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={proposal}
            columns={columns}
            rowIndex
          />

          <ChatHistory
            chatHandler={chatHandler}
            addPaymentModal={addPaymentModal}
            qno={id}
            // getProposalData={getProposalList}
          />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default Proposal;

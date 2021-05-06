import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Tpfilter from "../../../components/Search-Filter/tpfilter";

function Proposal() {
  const userid = window.localStorage.getItem("tpkey");

  const [proposal, setProposal] = useState([]);
  const [count, setCount] = useState("");

  useEffect(() => {
    getProposalList();
  }, []);

  const getProposalList = () => {
    axios
      .get(`${baseUrl}/tp/getProposalTp?id=${JSON.parse(userid)}`)
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
            <Link to={`/taxprofessional/queries/${row.id}`}>
              {row.assign_no}
            </Link>
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
      text: "Action",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            {row.status == "Cust Accepted" || row.status == "Pending" ? (
              <Link to={`/taxprofessional/edit-proposal/${row.id}`}>
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
            ) : row.status == "Accepted" ? (
              <Link to={`/taxprofessional/sendproposal/${row.id}`}>
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

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
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
          <Tpfilter
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
        </CardBody>
      </Card>
    </Layout>
  );
}

export default Proposal;

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

import { Link, NavLink } from "react-router-dom";
import AdminFilter from "../../../components/Search-Filter/AdminFilter";
import BootstrapTable from "react-bootstrap-table-next";
import Records from "../../../components/Records/Records";


function AllProposalComponent({ allProposal }) {
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getProposalData();
  }, []);

  const getProposalData = () => {
    axios.get(`${baseUrl}/admin/getProposals`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setProposalDisplay(res.data.result);
        setRecords(res.data.result.length);

        // allProposal(res.data.result.length);
      }
    });
  };


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
      text: "Date of acceptance / decline of Proposal",
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
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>

              {
                row.status == "Inprogress" ?
                  <div>
                    {row.status}/
                    <p style={{ color: "green" }}>
                      {row.statusdescription}
                    </p>
                  </div>
                  :
                  row.status == "Customer Declined; Proposal" ?
                    <div>
                      {row.status}
                      <p style={{ color: "red" }}>
                        {row.statusdescription}
                      </p>
                    </div> :
                    row.status == "Accepted; Proposal" ?
                      <div>
                        {row.status}
                        <p style={{ color: "blue" }}>
                          {row.statusdescription}
                        </p>
                      </div> :
                      null
              }
            </div>
          </>
        );
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
    {
      text: "Action",
      headerStyle: () => {
        return { fontSize: "11px", width: "65px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div title="Send Message">
              <Link
                to={{
                  pathname: `/admin/chatting/${row.q_id}`,
                  obj: {
                    message_type: "2",
                    query_No: row.assign_no,
                    query_id: row.q_id,
                    routes: `/admin/proposal`
                  }
                }}
              >
                <i
                  class="fa fa-comments-o"
                  style={{
                    fontSize: 16,
                    cursor: "pointer",
                    marginLeft: "8px",
                    color: "blue"
                  }}
                ></i>
              </Link>
            </div>
          </>
        );
      },
    },
  ];


  return (
    <>
      <Card>
        <CardHeader>

          <AdminFilter
            setData={setProposalDisplay}
            getData={getProposalData}
            allProposal="allProposal"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>

        <CardBody>
          <Records records={records} />
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


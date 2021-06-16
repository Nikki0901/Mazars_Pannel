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
import { baseUrl } from "../../../config/config";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";

function CompleteData({ CountComplete }) {
  const userid = window.localStorage.getItem("tlkey");
  const [completeData, setCompleteData] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getCompleteAssingment();
  }, []);

  const getCompleteAssingment = () => {
    axios
      .get(`${baseUrl}/tl/getCompleteQues?id=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          // CountComplete(res.data.result.length);
          setCompleteData(res.data.result);
          setRecords(res.data.result.length);

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
      dataField: "query_date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.query_date);
        var updatedate = row.query_date.split(" ")[0];
        console.log(updatedate);
        if (updatedate == null) {
          return null;
        }
        return updatedate.toString().split("-").reverse().join("-");
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
            {/* <Link to={`/teamleader/queries/${row.id}`}>{row.assign_no}</Link> */}
            <Link
              to={{
                pathname: `/teamleader/queries/${row.id}`,
                index: 2,
                routes: "queriestab",
              }}
            >
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
      text: "	Exp. Delivery Date",
      dataField: "Exp_Delivery_Date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.Exp_Delivery_Date);
        var oldDate = row.Exp_Delivery_Date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Status",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px", width: "160px" };
      },
      formatter: function AssignmentStage(cell, row) {
        console.log("status - ", row);
        return (
          <>
            <div style={{ fontSize: "9px", fontWeight: "bold" }}>
              <tr>
                <td>Client Discussion</td>
                <td>{row.client_discussion}</td>
              </tr>
              <tr>
                <td>Draft report</td>
                <td>{row.draft_report}</td>
              </tr>
              <tr>
                <td>Final Discussion</td>
                <td>{row.final_discussion}</td>
              </tr>
              <tr>
                <td> Delivery of report</td>
                <td>{row.delivery_report}</td>
              </tr>
              <tr>
                <td>Complete</td>
                <td>{row.other_stage}</td>
              </tr>
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
          <TeamFilter
            setData={setCompleteData}
            getData={getCompleteAssingment}
            completeAssignment="completeAssignment"
            setRecords={setRecords}
            records={records}
          />

        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={completeData}
            columns={columns}
            rowIndex
          />

        </CardBody>
      </Card>
    </>
  );
}

export default CompleteData;

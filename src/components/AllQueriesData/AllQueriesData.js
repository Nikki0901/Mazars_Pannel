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

import BootstrapTable from "react-bootstrap-table-next";
import AdminFilter from "../../components/Search-Filter/AdminFilter";



function AllQueriesData() {

  const [allQueriesData, setAllQueriesData] = useState([])
  const [records, setRecords] = useState([]);


  useEffect(() => {
    getAllQueriesData();
  }, []);

  const getAllQueriesData = () => {
    axios.get(`${baseUrl}/admin/getAllQueries`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setAllQueriesData(res.data.result);
        setRecords(res.data.result.length);
      }
    });
  };



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
            <Link
              to={{
                pathname: `/admin/queries/${row.id}`,
                index: 0,
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
      text: "Status",
      dataField: "status",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setAllQueriesData}
            getData={getAllQueriesData}
            allQueries="allQueries"
            setRecords={setRecords}
            records={records}
          />

        </CardHeader>
        <CardBody>
          {/* <div class="row">
            <div className="col-9">
            </div>
            <div className="col-3">
              <div class="form-group">
                <label className="form-select form-control"
                >Total Records : 12</label>
              </div>
            </div>
          </div> */}
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={allQueriesData}
            columns={columns}
            rowIndex
            wrapperClasses="table-responsive"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default AllQueriesData;




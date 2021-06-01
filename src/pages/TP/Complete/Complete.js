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
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Tpfilter from "../../../components/Search-Filter/tpfilter";
import Loader from "react-loader-spinner";

function Complete() {
  const [completeData, setCompleteData] = useState([]);
  const userid = window.localStorage.getItem("tpkey");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComplete();
  }, []);

  const getComplete = () => {
    axios
      .get(`${baseUrl}/tp/GetCompleteQues?id=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          //   CountIncomplete(res.data.result.length);
          setCompleteData(res.data.result);
        }
        setLoading(false);
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
            <Link to={`/taxprofessional/queries/${row.id}`}>{row.assign_no}</Link>
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
    },
  ];

  return (
    <>
      <Card>
      <CardHeader>
          <Tpfilter
            setData={setCompleteData}
            getData={getComplete}
            completeAssignment="completeAssignment"
          />
        </CardHeader>
        {loading ? (
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Loader type="ThreeDots" color="#00BFFF" height={80} width={80}/>
            </div>
        ) : (
          <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={completeData}
            columns={columns}
            rowIndex
          />
        </CardBody>
        )}
      </Card>
    </>
  );
}

export default Complete;

import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import TableHeader from "../../components/DataTable/Header/index";


function QueriesTab() {
  // const [queriesData, setQueriesData] = useState([]);
  const [queriesCount, setCountQueries] = useState("");
  const [query, setQuery] = useState([]);
  const userId = window.localStorage.getItem("userid");

  const [sorting, setSorting] = useState({ field: "", order: "" });
  const headers = [
    { name: "S.no", sortable: true },
    { name: "Date", field: "created", sortable: true },
    { name: "Query No", field: "assign_no", sortable: true },
    { name: "Category", field: "parent_id", sortable: true },
    { name: "Sub Category", field: "cat_name", sortable: true },
    { name: "Status", field: "status", sortable: true },
    {
      name: "Expected Delivery Date",
      field: "exp_delivery_date",
    },
  ];

  useEffect(() => {
    getQueriesData();
  }, []);

  const getQueriesData = () => {
    axios
      .get(
        `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setQuery(res.data.result);
          setCountQueries(res.data.result.length);
        }
      });
  };

  const queryData = useMemo(() => {
    let computedData = query;

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData = computedData.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }
    return computedData;
  }, [query, sorting]);


  //change date format
  function ChangeFormateDate(oldDate) {
    console.log("date", oldDate);
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

  //show status by spinner
  function showStatus(status) {
    console.log("status", status);
    if (status == null) {
      return null;
    }
  }

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="9">
              <CardTitle tag="h4">Queries ({queriesCount})</CardTitle>
            </Col>
            <Col md="3">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Link to="/customer/select-category" class="btn btn-primary">
                  Fresh Query
                </Link>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <CustomerFilter
            setData={setQuery}
            getData={getQueriesData}
            id={userId}
            query="query"
          />
        </CardHeader>
        <CardBody>
        <Table responsive="sm" bordered>
            <TableHeader
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {queryData.map((p, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{ChangeFormateDate(p.created)}</td>
                  <th>
                    <Link to={`/customer/my-assingment/${p.id}`}>
                      {p.assign_no}
                    </Link>
                  </th>
                  <td>{p.parent_id}</td>
                  <td>{p.cat_name}</td>
                  <td>{p.status}</td>
                  <td>{ChangeFormateDate(p.exp_delivery_date)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default QueriesTab;

// function ChangeFormateDate2(date) {
//   var month = (1 + date.getMonth()).toString();
//   month = month.length > 1 ? month : '0' + month;

//   var day = date.getDate().toString();
//   day = day.length > 1 ? day : '0' + day;

//   return month + '/' + day + '/' + year;
// }

{
  /* <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Query No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Status</th>
                <th>Expected Delivery Date</th>
              </tr>
            </thead>
            <tbody style={{ height: "400px", overflowY: "scroll" }}>
              {queriesData.length > 0 ? (
                queriesData.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <th>
                      <Link to={`/customer/my-assingment/${p.id}`}>
                        {p.assign_no}
                      </Link>
                    </th>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td>{p.status}</td>
                    <td>{ChangeFormateDate(p.exp_delivery_date)}</td>               
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No Records</td>
                </tr>
              )}
            </tbody>
          </Table> */
}

//   <MaterialTable
//   title={false}
//   columns={columns}
//   data={queriesData}
//   options={{
//     sorting: true,
//     search: false,
//   }}

// />

// const columns = [
//   { title: "S.No", field: "s_no" },
//   { title: "Date", field: "created" },
//   { title: "Query No", field: "assign_no" },
//   { title: "Category", field: "parent_id" },
//   { title: "Sub Category", field: "cat_name" },
//   { title: "Status", field: "status" },
//   { title: "Expected Delivery Date", field: "exp_delivery_date" },
// ];

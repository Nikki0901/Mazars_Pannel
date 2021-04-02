import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import { Link } from "react-router-dom";
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
import { useAlert } from "react-alert";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

function AddTeamProf() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [count, setCount] = useState("");
  const userid = window.localStorage.getItem("tlkey");

  useEffect(() => {
    getTaxProf();
  }, []);

  const getTaxProf = () => {
    axios
      .get(`${baseUrl}/tp/getTaxProfessional?tl_id=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setData(res.data.result);
          setCount(res.data.result.length);
        }
      });
  };

  var hashValueGetter = function (params) {
    return params.node.rowIndex + 1;
  };

  const column = [
    {
      headerName: "S.No",
      field: "",
      valueGetter: hashValueGetter,
      sortable: true,
      width: 130,
    },
    { headerName: "Name", field: "name", sortable: true, width: 250 },
    { headerName: "Email", field: "email", sortable: true, width: 250 },
    { headerName: "Phone", field: "phone", sortable: true, width: 250 },
  ];

  // delete data
  const del = (id) => {
    console.log("del", id);

    axios
      .get(`${baseUrl}/delete/TaxLead/${id}`)
      .then(function (response) {
        console.log("delete-", response);
        alert.success("successfully deleted ");
        getTaxProf();
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="10">
              <CardTitle tag="h4">Tax Professionals ({count})</CardTitle>
            </Col>
            <Col md="2"></Col>
          </Row>
        </CardHeader>
        <CardBody>
        <div className="ag-theme-alpine" style={{ height: 400, width: 950 }}>
            <AgGridReact rowData={data} columnDefs={column} />
          </div>
          {/* <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone No.</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table> */}
        </CardBody>
      </Card>
    </Layout>
  );
}

export default AddTeamProf;

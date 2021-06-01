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
import BootstrapTable from "react-bootstrap-table-next";
import Loader from "react-loader-spinner";

function AddTeamProf() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [count, setCount] = useState("");
  const userid = window.localStorage.getItem("tlkey");
  const [loading, setLoading] = useState(true);

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
      text: "Name",
      dataField: "name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Email",
      dataField: "email",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Phone",
      dataField: "phone",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
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
        {loading ? (
          <div style={{display: 'flex', justifyContent: 'center'}}><Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /></div>
        ) : (
          <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={data}
            columns={columns}
            rowIndex
          />

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
        )}
      </Card>
    </Layout>
  );
}

export default AddTeamProf;

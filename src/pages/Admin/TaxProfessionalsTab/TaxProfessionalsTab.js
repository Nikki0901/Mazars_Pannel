import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
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
import { useAlert } from "react-alert";

function TaxProfessionalsTab() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const userid = window.localStorage.getItem("adminkey");

  useEffect(() => {
    getTaxProf();
  }, []);


  const getTaxProf = () => {
    axios.get(`${baseUrl}/tp/getTaxProfessional`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setData(res.data.result);
      }
    });
  };


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
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="10">
              <CardTitle tag="h4">Tax Professionals</CardTitle>
            </Col>
            <Col md="2">
              <Link to={"/admin/addnewtp"} class="btn btn-primary">
              Add New
            </Link>
              </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone No.</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>
                    <Link to={`/admin/edittp/${p.id}`}>
                      <i
                        className="fa fa-edit"
                        style={{
                          fontSize: 18,
                          cursor: "pointer",
                          marginLeft: "8px",
                        }}
                      ></i>
                    </Link>
                  </td>
                  <td
                  onClick={() => del(p.id)}
                  >
                    <i
                      className="fa fa-trash"
                      style={{
                        fontSize: 22,
                        cursor: "pointer",
                        marginLeft: "8px",
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default TaxProfessionalsTab;

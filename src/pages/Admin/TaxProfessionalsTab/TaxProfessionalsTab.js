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
import { AgGridReact } from "ag-grid-react";


function TaxProfessionalsTab() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [tpCount, setTpCount] = useState("");
  const userid = window.localStorage.getItem("adminkey");

  useEffect(() => {
    getTaxProf();
  }, []);

  const getTaxProf = () => {
    axios.get(`${baseUrl}/tp/getTaxProfessional`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setData(res.data.result);
        setTpCount(res.data.result.length);
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
      width: 90,
    },
    { headerName: "Name", field: "name", sortable: true, width: 170 },
    { headerName: "Email", field: "email", sortable: true, width: 190 },
    { headerName: "Phone", field: "phone", sortable: true, width: 190 },
    {
      headerName: "Edit",
      field: "id",
      width: 150,
      cellRendererFramework: (params) => {
        return (
          <div>
            <Link to={`/admin/edittp/${params.data.id}`}>
              <i
                className="fa fa-edit"
                style={{
                  fontSize: 18,
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              ></i>
            </Link>
          </div>
        );
      },
    },
    {
      headerName: "Edit",
      field: "id",
      width: 150,
      cellRendererFramework: (params) => (
        <div>
          <i
            className="fa fa-trash"
            style={{ fontSize: 22, cursor: "pointer", marginLeft: "8px" }}
            onClick={() => del(params.data.id)}
          ></i>
        </div>
      ),
    },
  ];

  // delete data
  const del = (id) => {
    console.log("del", id);
    axios
      .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
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
              <CardTitle tag="h4">Tax Professionals ({tpCount})</CardTitle>
            </Col>
            <Col md="2">
              <Link to={"/admin/addnewtp"} class="btn btn-primary">
                Add New
              </Link>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div className="ag-theme-alpine" style={{ height: 400, width: 950 }}>
            <AgGridReact rowData={data} columnDefs={column} />
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default TaxProfessionalsTab;

{
  /* <Table responsive="sm" bordered>
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
          </Table> */
}

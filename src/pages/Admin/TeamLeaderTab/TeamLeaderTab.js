import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../config/config";
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
import { AgGridColumn, AgGridReact } from "ag-grid-react";


function TeamLeaderTab() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [tlCount, setTlCount] = useState("");
  const userid = window.localStorage.getItem("adminkey");

  // const actionButton = () =>{}


  var hashValueGetter = function (params) {
    return params.node.rowIndex + 1;
  };

  const column = [
    {
      headerName: "S.No",
      field: "",
      valueGetter: hashValueGetter,
      sortable: true,
      width: 70,
    },
    { headerName: "Name", field: "name", sortable: true, width: 140 },
    { headerName: "Category", field: "parent_id", sortable: true, width: 140 },
    {
      headerName: "Sub Category",
      field: "cat_name",
      sortable: true,
      width: 160,
    },
    { headerName: "Email", field: "email", sortable: true, width: 160 },
    { headerName: "Phone", field: "phone", sortable: true, width: 130 },
    {
      headerName: "Edit",
      field: "id",
      width: 70,
      cellRendererFramework: (params) => {
        return (
          <div>
            <Link to={`/admin/edittl/${params.data.id}`}>
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
      width: 70,
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

  // const onGridReady = (params) => {
  //   setGridApi(params.api);
  //   setGridColumnApi(params.columnApi);
  // };

  useEffect(() => {
    getTeamLeader();
  }, []);

  const getTeamLeader = () => {
    axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setData(res.data.result);
        setTlCount(res.data.result.length);
      }
    });
  };


  // delete data
  const del = (id) => {
    console.log("del", id);

    axios
      .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
      .then(function (response) {
        console.log("delete-", response);
        alert.success("successfully deleted ");
        getTeamLeader();
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
              <CardTitle tag="h4">Team Leaders ({tlCount})</CardTitle>
            </Col>
            <Col md="2">
              <Link to={"/admin/addnewtl"} class="btn btn-primary">
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

export default TeamLeaderTab;

{
  /* <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Name</th>
                <th>Category</th>
                <th>Sub Category</th>
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
                  <td>{p.parent_id}</td>
                  <td>{p.cat_name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>
                    <Link to={`/admin/edittl/${p.id}`}>
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
                  <td onClick={() => del(p.id)}>
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

// <div class="row mt-3">
//         <div class="col-md-12">
//           <div class="schedule">
//             <h3>Team Leaders</h3>
// <Link to={"/admin/addnew"} class="btn btn-primary">
//   Add New
// </Link>
//           </div>
//         </div>
//         <br />
//         <br />
//         <br />
//         <br />
//         <div class="col-md-12">
//           <table class="table">
// <thead>
//   <tr>
//     <th scope="col">No.</th>
//     <th scope="col">Name</th>
//     <th scope="col">Email</th>
//     <th scope="col">Phone No.</th>
//     <th scope="col">Edit</th>
//     <th scope="col">Delete</th>
//   </tr>
// </thead>
// {data.map((p, i) => (
//   <tr>
//     <th scope="row">{i + 1}</th>
//     <td>{p.name}</td>
//     <td>{p.email}</td>
//     <td>{p.Phone}</td>
//     <td>
//       <Link to={`/admin/edit/${p.id}`}>
//         <i
//           className="fa fa-edit"
//           style={{ fontSize: 18, cursor: "pointer", marginLeft:"8px" }}
//         ></i>
//       </Link>
//     </td>
//     <td
//     onClick={() => del(p.id)}>
// <i className="fa fa-trash" style={{ fontSize: 22, cursor: "pointer" ,marginLeft:"8px" }}>
// </i>
//     </td>
//   </tr>
// ))}
//           </table>
//         </div>
//       </div>

// cellRenderer:  (params)=> {
//   return <Link to={`/?info=${params.data.Id}`}>"+{params.value}+"</Link>,

// const [gridApi, setGridApi] = useState(null);
// const [gridColumnApi, setGridColumnApi] = useState(null);

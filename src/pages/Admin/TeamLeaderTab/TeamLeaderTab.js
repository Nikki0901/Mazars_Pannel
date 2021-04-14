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
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
function TeamLeaderTab() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const [tlCount, setTlCount] = useState("");
  const userid = window.localStorage.getItem("adminkey");

  const columns = [
    {
      dataField: "",
      text: "S.No",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { fontSize: "12px" ,width:"50px"};
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "parent_id",
      text: "Category",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "cat_name",
      text: "Sub Category",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "",
      text: "Edit",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <Link to={`/admin/edittl/${row.id}`}>
              <i
                className="fa fa-edit"
                style={{
                  fontSize: 18,
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              ></i>
            </Link>
          </>
        );
      },
    },
    {
      dataField: "phone",
      text: "Delete",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <i
              className="fa fa-trash"
              style={{ fontSize: 20, cursor: "pointer", marginLeft: "8px" }}
              onClick={() => del(row.id)}
            ></i>
          </>
        );
      },
    },
  ];

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


//check
  const del = (id) => {
    console.log("del", id);

    Swal.fire({
      title: "Are you sure?",
      text: "It will permanently deleted !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteCliente(id);
      }
    });
  };

  // delete data
  const deleteCliente = (id) => {
    axios
      .get(`${baseUrl}/tl/deleteTeamLeader?id=${id}`)
      .then(function (response) {
        console.log("delete-", response);
        if (response.data.code === 1) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          getTeamLeader();
        } else {
          Swal.fire("Oops...", "Errorr ", "error");
        }
        
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
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={data}
            columns={columns}
            rowIndex
          />
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

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

function TeamLeaderTab() {
  const alert = useAlert();
  const [data, setData] = useState([]);
  const userid = window.localStorage.getItem("adminkey");

  useEffect(() => {
    getTeamLeader();
  }, []);

  const getTeamLeader = () => {
    axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
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
                <CardTitle tag="h4">Team Leaders</CardTitle>
              </Col>
              <Col md="2">
              <Link to={"/admin/addnewtl"} class="btn btn-primary">
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
                  <Link to={`/admin/edittl/${p.id}`}>
                    <i
                      className="fa fa-edit"
                      style={{ fontSize: 18, cursor: "pointer", marginLeft:"8px" }}
                    ></i>
                  </Link>
                </td>
                <td             
                onClick={() => del(p.id)}>
                  <i className="fa fa-trash" style={{ fontSize: 22, cursor: "pointer" ,marginLeft:"8px" }}>
                  </i>
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

export default TeamLeaderTab;



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
            //       <i className="fa fa-trash" style={{ fontSize: 22, cursor: "pointer" ,marginLeft:"8px" }}>
            //       </i>
            //     </td>
            //   </tr>
            // ))}
//           </table>
//         </div>
//       </div>
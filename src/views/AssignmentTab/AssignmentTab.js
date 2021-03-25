import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import { Link } from "react-router-dom";

function AssignmentTab() {
  const userId = window.localStorage.getItem("userid");
  const [assignmentDisplay, setAssignmentDisplay] = useState([]);
  const [assignmentCount, setAssignmentQueries] = useState("");

  useEffect(() => {
    getAssignmentData();
  }, []);

  const getAssignmentData = () => {
    axios
      .get(
        `${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setAssignmentDisplay(res.data.result);
          setAssignmentQueries(res.data.result.length);
        }
      });
  };

  //change date format
  function ChangeFormateDate(oldDate) {
    console.log("date", oldDate);
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CardTitle tag="h4">Assignment ({assignmentCount})</CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        </CardHeader>

        <CardHeader>
          <CustomerFilter
            setData={setAssignmentDisplay}
            getData={getAssignmentData}
            id={userId}
            assignment="assignment"
          />
        </CardHeader>

        <CardBody>
          <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date of Assignment</th>
                <th>Query No</th>
                <th>Assignment No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Status</th>
                <th>Expected date of delivery</th>
                <th>Actual date of delivery</th>
                <th>Deliverable</th>
                <th>Team Leader name and contact number, email</th>
              </tr>
            </thead>
            {assignmentDisplay.length > 0 ? (
              assignmentDisplay.map((p, i) => (
                <tbody>
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.assignment_date)}</td>
                    <th>
                      <Link to={`/customer/my-assingment/${p.id}`}>
                        {p.assign_no}
                      </Link>
                    </th>
                    <td>{p.assign_no}</td>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td>{p.status}</td>
                    {/* <td>{p.status <= 9 ? "In Process" : "Complete"} </td> */}
                    <td>{ChangeFormateDate(p.Exp_Delivery_Date)}</td>
                    <td>{ChangeFormateDate(p.date_of_delivery)}</td>

                    <td style={{ textAlign: "center" }}>
                      {!p.final_report == "" ? (
                        <div>
                          <a
                            href={`http://13.232.121.233/mazarapi/assets/upload/report/${p.final_report}`}
                          >
                            <i
                              class="fa fa-file-text"
                              style={{ fontSize: "16px" }}
                            ></i>{" "}
                            final
                          </a>
                        </div>
                      ) : p.assignment_draft_report ? (
                        <div>
                          <a
                            href={`http://13.232.121.233/mazarapi/assets/upload/report/${p.assignment_draft_report}`}
                          >
                            <i
                              class="fa fa-file-text"
                              style={{ fontSize: "16px" }}
                            ></i>{" "}
                            draft
                          </a>
                        </div>
                      ) : null}
                    </td>

                    <td>
                      <p style={{ fontSize: "10px" }}>{p.tname} </p>
                      <p style={{ fontSize: "10px" }}>{p.phone}</p>
                      <p style={{ fontSize: "10px" }}>{p.email}</p>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tr>
                <td colSpan="11">No Records</td>
              </tr>
            )}
          </Table>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default AssignmentTab;

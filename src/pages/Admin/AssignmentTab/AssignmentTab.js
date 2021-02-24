import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
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

function AssignmentTab() {
  const userid = window.localStorage.getItem("adminkey");

  const [assignmentDisplay, setAssignmentDisplay] = useState([]);

  useEffect(() => {
    const getAssignmentData = () => {
      axios.get(`${baseUrl}/get/all/assignment`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setAssignmentDisplay(res.data.result);
        }
      });
    };
    getAssignmentData();
  }, []);

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CardTitle tag="h4">Assignment</CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        </CardHeader>
        <CardBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Query No</th>
                <th>Date of Query</th>
                <th>Assignment No</th>
                <th>Assignment Date</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Proposed date of Completion</th>
                <th>Status</th>
                <th>Time taken for Completion</th>
              </tr>
            </thead>
            {assignmentDisplay.map((p, i) => (
              <tbody>
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.assignno}</td>
                  <td>{p.date}</td>
                  <td></td>
                  <td>{p.AllocationDate}</td>
                  <td>{p.subcategory}</td>
                  <td>{p.Category}</td>
                  <td></td>
                  <td>
                    <div>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Client Discussion :
                        </span>{" "}
                        {p.client_discussion}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Draft report :</span>{" "}
                        {p.draft_report}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Final Discussion :
                        </span>{" "}
                        {p.final_discussion}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Delivery of report :
                        </span>{" "} 
                        {p.delivery_report}
                      </p>
                    </div>
                  </td>
                  <td></td>
                </tr>
                {/* <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr> */}
              </tbody>
            ))}
          </table>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default AssignmentTab;

{
  /* <div className="mb-3">                     
                      <select
                        className="form-select form-control"
                        name="p_purpose"                     
                      >                  
                        <option >status</option>                                         
                        <option >Client Discussion : {p.client_discussion}</option>                                         
                        <option >Draft report : {p.draft_report}</option>                                         
                        <option >Final Discussion : {p.final_discussion}</option>                                         
                        <option >Delivery of report : {p.delivery_report}</option>                                         
                      </select>
                    </div> */
}

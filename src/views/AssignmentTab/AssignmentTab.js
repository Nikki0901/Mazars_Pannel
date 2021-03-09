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

function AssignmentTab() {
  const userId = window.localStorage.getItem("userid");
  const [assignmentDisplay, setAssignmentDisplay] = useState([]);

  useEffect(() => {
    const getAssignmentData = () => {
      axios
        .get(
          `${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setAssignmentDisplay(res.data.result);
          }
        });
    };
    getAssignmentData();
  }, []);

  // change date format
  function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("-");
  }

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
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
          <Table responsive="sm" bordered>
            <thead>
              <tr>
              <th>S.No</th>
                <th>Date of Query</th>
                <th>Query No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Assignment Stage</th>
                <th>Status</th>
                <th>Expected date of delivery</th>
                <th>Actual date of delivery</th>
                <th>Deliverable</th>
                <th>Team Leader, name and contact number, email</th>
              </tr>
            </thead>
            {assignmentDisplay.length > 0 ? (
              assignmentDisplay.map((p, i) => (
                <tbody>
                  <tr key={i}>
                  <td>{i+1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <td>{p.assign_no}</td>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    
                    <td>
                      <span style={{ fontWeight: "bold" }}>
                        Client Discussion
                      </span>
                    </td>
                    <td> {p.client_discussion}</td>
                    <td>{ChangeFormateDate(p.Exp_Delivery_Date)}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <span style={{ fontWeight: "bold" }}>Draft report</span>
                    </td>
                    <td> {p.draft_report}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                   
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <span style={{ fontWeight: "bold" }}>
                        Final Discussion
                      </span>
                    </td>
                    <td> {p.final_discussion}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <span style={{ fontWeight: "bold" }}>
                        Delivery of report
                      </span>
                    </td>
                    <td>{p.delivery_report}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  
                
                  </tr>
                </tbody>
              ))
            ) : (
              <tr>
                <td colSpan="10">No Records</td>
              </tr>
            )}
          </Table>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default AssignmentTab;


{
  /* <p>
                        <span style={{ fontWeight: "bold" }}>
                          Client Discussion :
                        </span>
                        {p.client_discussion}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Draft report :</span>
                        {p.draft_report}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Final Discussion :
                        </span>
                        {p.final_discussion}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Delivery of report :
                        </span> 
                        {p.delivery_report}
                      </p> */
}

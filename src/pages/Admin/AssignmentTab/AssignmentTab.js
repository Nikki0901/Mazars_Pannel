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
import "./index.css";


function AssignmentTab() {
  const userid = window.localStorage.getItem("adminkey");

  const [assignmentDisplay, setAssignmentDisplay] = useState([]);

  useEffect(() => {
    const getAssignmentData = () => {
      axios.get(`${baseUrl}/tl/getAssignments`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setAssignmentDisplay(res.data.result);
        }
      });
    };
    getAssignmentData();
  }, []);

    //change date format
    function ChangeFormateDate(oldDate) {
      console.log("date",oldDate)
      if(oldDate == null){
        return null
      }
      return oldDate.toString().split("-").reverse().join("-");
    }

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
            <thead class="table_head">
              <tr>
                <th>Sr. No.</th>
                <th>Query No</th>
                <th>Date of Query</th>
                <th>Assignment No</th>
                <th>Assignment Date</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Proposed date of Completion</th>
                <th>Assignment Stage</th>
                <th>Status</th>
                {/* <th>Time taken for Completion</th> */}
                <th>Draft Report</th>
                <th>Final Report</th>
              </tr>
            </thead>
            {assignmentDisplay.map((p, i) => (
             <tbody class="table_bdy">
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.assign_no}</td>
                  <td>{ChangeFormateDate(p.date_of_query)}</td>
                  <td>{p.assignment_label_number}</td>
                  <td>{p.assignment_date}</td>
                  <td>{p.parent_id}</td>
                  <td>{p.cat_name}</td>
                  <td>{ChangeFormateDate(p.Exp_Delivery_Date)}</td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>
                      Client Discussion
                    </span>
                  </td>
                  <td> {p.client_discussion}</td>
                  {/* <td></td> */}
                  <td style={{ textAlign: "center" }}>
                      {p.assignement_draft_report == null ? (
                        ""
                      ) : (
                        <div>
                          <a
                            href={`http://13.232.121.233/mazarapi/assets/upload/report/${p.assignement_draft_report}`}
                          >
                            <i class="fa fa-file-text"></i>
                          </a>
                        </div>
                      )}
                    </td>

                    <td style={{ textAlign: "center" }}>
                      {p.final_report == null ? (
                        ""
                      ) : (
                        <div>
                          <a
                            href={`http://13.232.121.233/mazarapi/assets/upload/report/${p.final_report}`}
                          >
                            <i class="fa fa-file-text"></i>
                          </a>
                        </div>
                      )}
                    </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    {" "}
                    <span style={{ fontWeight: "bold" }}>Draft report</span>
                  </td>
                  <td> {p.draft_report}</td>
                  {/* <td></td> */}
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    {" "}
                    <span style={{ fontWeight: "bold" }}>Final Discussion</span>
                  </td>
                  <td> {p.final_discussion}</td>
                  {/* <td></td> */}
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    {" "}
                    <span style={{ fontWeight: "bold" }}>
                      Delivery of report
                    </span>
                  </td>
                  <td> {p.delivery_report}</td>
                  {/* <td></td> */}
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    {" "}
                    <span style={{ fontWeight: "bold" }}>
                    Others
                    </span>
                  </td>
                  <td> {p.other_stage}</td>
                  {/* <td></td> */}
                  <td></td>
                  <td></td>
                </tr>
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
  /* <div>
                      <p>
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
                      </p>
                    </div> */
}

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

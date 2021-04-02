import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
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
import { AgGridColumn, AgGridReact } from "ag-grid-react";

function FeedbackTab() {
  const userid = window.localStorage.getItem("tlkey");

  const [feedbackData, setFeedBackData] = useState([]);

  useEffect(() => {
    const getFeedback = () => {
      axios
        .get(`${baseUrl}/customers/getFeedback?tl_id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setFeedBackData(res.data.result);
          }
        });
    };
    getFeedback();
  }, []);

  var hashValueGetter = function (params) {
    return params.node.rowIndex + 1;
  };

  const column = [
    {
      headerName: "S.No",
      field: "",
      valueGetter: hashValueGetter,
      sortable: true,
      width: 120,
    },
    { headerName: "Query No", field: "assign_no", sortable: true, width: 230 },
    { headerName: "Customer Name", field: "name", sortable: true, width: 230 },
    {
      headerName: "Details of feedback",
      field: "feedback",
      sortable: true,
      width: 360,
    },
  ];
  return (
    <>
      <Layout TLDashboard="TLDashboard" TLuserId={userid}>
        <Card>
          <CardHeader>
            <Row>
              <Col md="7">
                <CardTitle tag="h4">Feedback Recieved</CardTitle>
              </Col>
              <Col md="5"></Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div
              className="ag-theme-alpine"
              style={{ height: 400, width: 950 }}
            >
              <AgGridReact rowData={feedbackData} columnDefs={column} />
            </div>

            {/* <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Query No</th>
                  <th>Customer Name</th>
                  <th>Details of feedback</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.length > 0 ? (
                  feedbackData.map((p, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{p.assign_no}</td>
                      <td>{p.name}</td>
                      <td>{p.feedback}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No Records</td>
                  </tr>
                )}
              </tbody>
            </table> */}
          </CardBody>
        </Card>
      </Layout>
    </>
  );
}

export default FeedbackTab;

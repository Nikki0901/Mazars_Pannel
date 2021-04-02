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

import BootstrapTable from "react-bootstrap-table-next";

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

  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "50px" };
      },
    },
    {
      text: "Query No",
      dataField: "assign_no",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },

    {
      text: "Customer Name",
      dataField: "name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Details of feedback",
      dataField: "feedback",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
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
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={feedbackData}
              columns={columns}
              rowIndex
            />
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

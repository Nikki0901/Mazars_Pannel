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
import FeedbackService from "../../../config/services/QueryDetails";

function FeedbackTab() {
  const userid = window.localStorage.getItem("adminkey");

  const [feedbackData, setFeedBackData] = useState([]);

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = () => {
    FeedbackService.getAll()
      .then((response) => {
        setFeedBackData(response.data.result);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return <>{row.assign_no}</>;
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
      <Layout adminDashboard="adminDashboard" adminUserId={userid}>
        <Card>
          <CardHeader>
            <Row>
              <Col md="7">
                <CardTitle tag="h4">List of Feedback</CardTitle>
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
          </CardBody>
        </Card>
      </Layout>
    </>
  );
}

export default FeedbackTab;
// const getFeedback = () => {
//   axios.get(`${baseUrl}/customers/getFeedback`).then((res) => {
//     console.log(res);
//     if (res.data.code === 1) {
//       setFeedBackData(res.data.result);
//     }
//   });
// };

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

function PendingForPayment() {
  return (
    <>
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
                <th>Sr. No.</th>
                <th>Date</th>
                <th>Category</th>
                <th>Sub Category</th> 
                <th>Query No</th>
                <th>Query Allocation</th>         
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default PendingForPayment;

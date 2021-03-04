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

function PendingProposal() {
  return (
    <>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Date of Query</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Query No.</th>
              </tr>
            </thead>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default PendingProposal;

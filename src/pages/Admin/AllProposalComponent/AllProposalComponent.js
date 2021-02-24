import React, { useState, useEffect } from "react";
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

function AllProposalComponent() {
  const [proposalDisplay, setProposalDisplay] = useState([]);

  useEffect(() => {
    const getProposalData = () => {
      axios.get(`${baseUrl}/get/admin/showproposal`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setProposalDisplay(res.data.result);
        }
      });
    };
    getProposalData();
  }, []);

  // change date format
  function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("-");
  }

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
                <th>Proposal Sent date</th>
                <th>Proposed Amount</th>
                <th>Proposal Status</th>
                <th>Amount Accepted</th>
                <th>Assignment Number</th>
              </tr>
            </thead>
            <tbody>
              {proposalDisplay.length > 0 ? (
                proposalDisplay.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.Created)}</td>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td>{p.Assign}</td>
                    <td>{p.DateofProposal}</td>
                    <td>{p.ProposedAmount}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No Records</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default AllProposalComponent;

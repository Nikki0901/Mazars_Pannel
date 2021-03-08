import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";


function DeclinedProposal({declinedProposal}) {

  const [proposalDisplay, setProposalDisplay] = useState([]);

  useEffect(() => {
    
    const getAcceptedProposal = () => {
      axios.get(`${baseUrl}/admin/getProposals?&status=6`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setProposalDisplay(res.data.result);
          declinedProposal(res.data.result.length)
        }
      });
    };
    getAcceptedProposal();
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
                <th>Proposed Amount</th>
              </tr>
            </thead>
            <tbody>
              {proposalDisplay.length > 0 ? (
                proposalDisplay.map((p, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td>{p.assign_no}</td>  
                    <td>{p.ProposedAmount}</td>                                     
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

export default DeclinedProposal;

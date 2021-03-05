import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

function ProposalTab() {
  const alert = useAlert();
  const userId = window.localStorage.getItem("userid");
  const [proposalDisplay, setProposalDisplay] = useState([]);

  useEffect(() => {
    const getProposalData = () => {
      axios
        .get(`${baseUrl}/admin/getProposals?uid=${JSON.parse(userId)}`)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if (res.data.code === 1) {
            setProposalDisplay(res.data.result);
          }
        });
    };
    getProposalData();
  }, []);


// accepted proposal
const accepted = (key) => {
  console.log("acc", key);

  let formData = new FormData();
    formData.append("id", key);
    formData.append("status", 5);
   
    axios({
      method: "POST",
      url: `${baseUrl}/customers/ProposalAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response)
        if (response.data.code === 1) {
          alert.success("proposal accepted !");
        } ;      
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
};


// rejected proposal
const rejected = (key) => {
  console.log("rej", key);

  let formData = new FormData();
  formData.append("id", key);
  formData.append("status", 6);
 
  axios({
    method: "POST",
    url: `${baseUrl}/customers/ProposalAccept`,
    data: formData,
  })
    .then(function (response) {
      console.log("res-", response);   
      if (response.data.code === 1) {
        alert.success("proposal rejected !");
      }   
    })
    .catch((error) => {
      console.log("erroror - ", error);
    });
};


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
              <CardTitle tag="h4">Proposal</CardTitle>
            </Col>
            <Col md="5"></Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table responsive="sm" bordered>
            <thead>
              <tr>
                <th>Date</th>
                <th>Query No</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Status of Proposal</th>
                <th>Date of Proposal</th>
                <th>Proposed Amount</th>
                <th>Amount Accepted</th>
                <th>Amount Paid</th>
                <th>Date of Payment</th>
                <th>Amount Outstanding</th>
                <th>Date of acceptance of Proposal</th>
                <th>Date of Completion</th>
              </tr>
            </thead>

            {proposalDisplay.length > 0 ? (
              proposalDisplay.map((p, i) => (
                <tbody>
                  <tr key={i}>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <td>{p.assign_no}</td>
                    <td>{p.parent_id}</td>
                    <td>{p.cat_name}</td>
                    <td></td>
                    <td>{ChangeFormateDate(p.DateofProposal)}</td>
                    <td>{p.ProposedAmount}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <button class="btn btn-success mb-2"  onClick={() => accepted(p.q_id)} >Accept</button>

                      {/* <button class="btn btn-success mb-2" disabled>Accepted</button> */}
                    </td>
                    <td colSpan="3">
                      <button class="btn btn-danger mb-2" 
                      onClick={() => rejected(p.q_id)}>
                        Reject
                        </button>
                      {/* <button class="btn btn-success mb-2"  disabled>Rejected</button> */}
                    </td>
                    <td colSpan="7"></td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tr>
                <td colSpan="13">No Records</td>
              </tr>
            )}
          </Table>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default ProposalTab;

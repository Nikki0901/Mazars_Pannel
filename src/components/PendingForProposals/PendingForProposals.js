import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

function PendingForProposals({ CountPendingProposal }) {
  const [nonpendingData, setNonPendingData] = useState([]);

  useEffect(() => {
    getPendingForProposals();
  }, []);

  const getPendingForProposals = () => {
    axios.get(`${baseUrl}/admin/pendingProposal`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setNonPendingData(res.data.result);
        CountPendingProposal(res.data.result.length);
      }
    });
  };

  //change date format
  function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("-");
  }

  return (
    <>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Query No .</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Facts of the Case</th>
                  <th scope="col">Pending for Allocation</th>
                </tr>
              </thead>
              {nonpendingData.map((p, i) => (
                <tbody>
                  <tr>
                    <td>{ChangeFormateDate(p.created)}</td>
                    <th scope="row">
                      <Link to={`/admin/queries/${p.id}`}>{p.assign_no}</Link>
                    </th>
                    <td>{p.name}</td>
                    <td>{p.fact_case}</td>
                    <td class="text-center">
                      <p style={{ color: "green" }}>
                        Query accepted by {p.tname}
                      </p>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default PendingForProposals;

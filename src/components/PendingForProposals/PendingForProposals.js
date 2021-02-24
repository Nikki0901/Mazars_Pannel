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

function PendingForProposals() {
  const [nonpendingData, setNonPendingData] = useState([]);

  useEffect(() => {
    const getPendingForProposals = () => {
      axios.get(`${baseUrl}/get/filter/adminIn/date`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setNonPendingData(res.data.result);
        }
      });
    };

    getPendingForProposals();
  }, []);

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
                      <Link to={`/admin/queries/${p.id}`}>{p.AssignNo}</Link>
                    </th>
                    <td>{p.name}</td>
                    <td>{p.Fact}</td>
                    <td class="text-center">
                      <p style={{ color: "green" }}>
                        Query accepted by {p.teamleadername}
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

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

function InCompleteData() {
  const [incompleteData, setInCompleteData] = useState([]);
  const userid = window.localStorage.getItem("tlkey");

  useEffect(() => {
    const getInCompleteAssingment = () => {
      axios
        .get(`${baseUrl}/get/tp/tl/incomplete/id/${JSON.parse(userid)}/type/tl`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setInCompleteData(res.data.result);
          }
        });
    };

    getInCompleteAssingment();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
        </CardHeader>
        <CardBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Query No .</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Facts of the Case</th>
                <th scope="col">Exp. Delivery Date</th>
                <th scope="col">Assignment Stage</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {incompleteData.map((p, i) => (
                <tr>
                  <th scope="row">{p.AssignNo}</th>
                  <td>{p.name}</td>
                  <td>{p.Fact}</td>
                  <td>{p.Expect}</td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default InCompleteData;

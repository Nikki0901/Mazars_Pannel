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

function CompleteData() {
  const [completeData, setCompleteData] = useState([]);
  const userid = window.localStorage.getItem("tlkey");

  useEffect(() => {
    const getCompleteAssingment = () => {
      axios
        .get(`${baseUrl}/get/tp/tl/complete/id/${JSON.parse(userid)}/type/tl`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setCompleteData(res.data.result);
          }
        });
    };

    getCompleteAssingment();
  }, []);

  return (
    <>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Query No .</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Delivery Date</th>
                <th scope="col">Assignment Stage</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* {completeData.map((p, i) => (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default CompleteData;

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

function CompleteData({ CountComplete }) {
  const [completeData, setCompleteData] = useState([]);
  const userid = window.localStorage.getItem("tlkey");

  useEffect(() => {
    const getCompleteAssingment = () => {
      axios
        .get(`${baseUrl}/tl/getCompleteQues?id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            CountComplete(res.data.result.length);
            setCompleteData(res.data.result);
          }
        });
    };

    getCompleteAssingment();
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
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Query No .</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Delivery Date</th>
                <th scope="col">Assignment Stage</th>
                <th scope="col">Status</th>
              </tr>
            </thead>

            {completeData.map((p, i) => (
              <tbody>
                <tr>
                  <td>{i + 1}</td>
                  <th>{p.assign_no}</th>
                  <td>{p.name}</td>
                  <td>{ChangeFormateDate(p.Exp_Delivery_Date)}</td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>
                      Client Discussion
                    </span>
                  </td>
                  <td> {p.client_discussion}</td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>

                  <td></td>
                  <td></td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>Draft report </span>
                  </td>
                  <td> {p.draft_report}</td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>

                  <td></td>
                  <td></td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>Final Discussion</span>
                  </td>
                  <td> {p.final_discussion}</td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>

                  <td></td>
                  <td></td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>
                      Delivery of report
                    </span>{" "}
                  </td>
                  <td>{p.delivery_report}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>

                  <td></td>
                  <td></td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>Others</span>{" "}
                  </td>
                  <td>{p.other_stage}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default CompleteData;

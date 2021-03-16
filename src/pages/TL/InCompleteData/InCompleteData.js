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
import { Link } from "react-router-dom";

function InCompleteData({CountIncomplete}) {
  const [incompleteData, setInCompleteData] = useState([]);
  const userid = window.localStorage.getItem("tlkey");

  useEffect(() => {
    const getInCompleteAssingment = () => {
      axios
        .get(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            CountIncomplete(res.data.result.length);
            setInCompleteData(res.data.result);
          }
        });
    };

    getInCompleteAssingment();
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
                <th scope="col">Facts of the Case</th>
                <th scope="col">Exp. Delivery Date</th>
                <th scope="col">Assignment Stage</th>
                <th scope="col">Status</th>
                <th>Query Allocation</th>
              </tr>
            </thead>

            {incompleteData.map((p, i) => (
              <tbody>
                <tr>
                  <td>{i + 1}</td>
                  <th>
                    <Link to={`/teamleader/queries/${p.id}`}>
                      {p.assign_no}
                    </Link>
                  </th>
                  <td>{p.name}</td>
                  <td>{p.fact_case}</td>
                  <td>{ChangeFormateDate(p.Exp_Delivery_Date)}</td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>
                      Client Discussion
                    </span>
                  </td>
                  <td> {p.client_discussion}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        color: "green",
                      }}
                    >
                      <Link to={`/teamleader/queryassing/${p.id}`}>
                        <i class="fa fa-share"></i>
                      </Link>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>Draft report </span>
                  </td>
                  <td> {p.draft_report}</td>
                  <td></td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>Final Discussion</span>
                  </td>
                  <td> {p.final_discussion}</td>
                  <td></td>
                </tr>

                <tr>
                  <td></td>
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
                  <td></td>
                </tr>
              </tbody>
            ))}
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default InCompleteData;

{
  /* <p>
                        <span style={{ fontWeight: "bold" }}>
                          Client Discussion :
                        </span>
                        {p.client_discussion}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Draft report :</span>
                        {p.draft_report}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Final Discussion :
                        </span>
                        {p.final_discussion}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Delivery of report :
                        </span> 
                        {p.delivery_report}
                      </p> */
}

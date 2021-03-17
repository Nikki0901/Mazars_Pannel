import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link , useHistory} from "react-router-dom";
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

function PendingForAcceptence({CountPendingForAcceptence}) {
  const alert = useAlert();
  const userid = window.localStorage.getItem("tlkey");

  const [pendingData, setPendingData] = useState([]);
  const history = useHistory();


  useEffect(() => {
    getPendingforAcceptance();
  }, []);

  const getPendingforAcceptance = () => {
    axios
      .get(`${baseUrl}/tl/pendingQues?id=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          CountPendingForAcceptence(res.data.result.length);
          setPendingData(res.data.result);
        }
      });
  };



  
  const acceptHandler = (key) => {
    console.log("acceptHandler", key);

    let formData = new FormData();
    formData.append("set", 1);
    formData.append("tlid", JSON.parse(userid));
    formData.append("assignment_id", key);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/AcceptRejectQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("response-", response);
        if (response.data.code === 1) {
          alert.success("Query accepted !");
          getPendingforAcceptance();          
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const rejectHandler = (key) => {
    console.log("rejectHandler", key);

    let formData = new FormData();
    formData.append("set", 0);
    formData.append("tlid", JSON.parse(userid));
    formData.append("assignment_id", key);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/AcceptRejectQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("Query rejected !");
          getPendingforAcceptance();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  //change date format
  function ChangeFormateDate(oldDate) {
    console.log("date", oldDate);
    if (oldDate == null) {
      return null;
    }
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
                <th scope="col">Date.</th>
                <th scope="col">Query No .</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Facts of the Case</th>
                <th scope="col">Exp. Delivery Date</th>
                <th scope="col">Accept / Reject</th>
              </tr>
            </thead>

            <tbody>
              {pendingData.length > 0 ? (
                pendingData.map((p, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{ChangeFormateDate(p.query_created)}</td>
                    <th scope="row">
                      <Link to={`/teamleader/pending/${p.id}`}>
                        {p.assign_no}
                      </Link>
                    </th>
                    <td>{p.name}</td>
                    <td>{p.fact_case}</td>
                    <td>{ChangeFormateDate(p.Exp_Delivery_Date)}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          color: "#6967ce",
                          cursor: "pointer",
                        }}
                        id="div1"
                      >
                        <div
                          id="accept"
                          title="Accept Assignment"
                          onClick={() => acceptHandler(p.id)}
                        >
                          <i class="fa fa-check" style={{ color: "green" }}></i>
                        </div>
                        <div
                          id="reject"
                          title="Reject Assignment"
                          onClick={() => rejectHandler(p.id)}
                        >
                          <i class="fa fa-times" style={{ color: "red" }}></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Records</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default PendingForAcceptence;

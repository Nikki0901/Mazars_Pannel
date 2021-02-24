import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

function PendingForAcceptence({ p, getPendingforAcceptance }) {
  const alert = useAlert();

  const [display, setDisplay] = useState("1");
  const [accept, setAccept] = useState("0");

  const userid = window.localStorage.getItem("tlkey");
  const acceptHandler = (key) => {
    console.log("acceptHandler", key);

    let formData = new FormData();
    formData.append("set", 1);
    formData.append("tlid", JSON.parse(userid));
    formData.append("ano", key);

    axios({
      method: "POST",
      url: `${baseUrl}/post/AcceptReject/assignno`,
      data: formData,
    })
      .then(function (response) {
        console.log("response-", response);
        if (response.data.code === 1) {
          console.log(response.data.result);
          setDisplay("showA");
          setAccept("1");
          alert.success("Query successfully accepted !");
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
    formData.append("ano", key);
    axios({
      method: "POST",
      url: `${baseUrl}/post/AcceptReject/assignno`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          console.log(response.data.result);
          setDisplay("showR");
          setAccept("3");
          getPendingforAcceptance();
          alert.success("Query successfully rejected !");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <>
      <div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Date.</th>
              <th scope="col">Query No .</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Facts of the Case</th>
              <th scope="col">Exp. Delivery Date</th>
              <th scope="col">Accept / Reject</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{p.assigndate}</td>
              <th scope="row">
                <Link to={`/teamleader/queries/${p.assignid}`}>
                  {p.assignno}
                </Link>
              </th>
              <td>{p.name}</td>
              <td>{p.factcase}</td>
              <td></td>
              <td>
                {display === p.accept && (
                  <div id="div2" class="text-center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        color: "#6967ce",
                      }}
                    >
                      <Link to={`/teamleader/addassingment/${p.assignid}`}>
                        <i class="fa fa-tasks"></i>
                      </Link>

                      <Link to={`/teamleader/queryassing/${p.assignid}`}>
                        <i class="fa fa-share"></i>
                      </Link>
                    </div>
                  </div>
                )}

                {p.accept === accept && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      color: "#6967ce",
                    }}
                    id="div1"
                  >
                    <div
                      id="accept"
                      title="Accept Assignment"
                      onClick={() => acceptHandler(p.assignid)}
                    >
                      <i class="fa fa-check"></i>
                    </div>
                    <div
                      id="reject"
                      title="Reject Assignment"
                      onClick={() => rejectHandler(p.assignid)}
                    >
                      <i class="fa fa-times"></i>
                    </div>
                  </div>
                )}

                {display === "showA" && (
                  <div id="div2" class="text-center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        color: "#6967ce",
                      }}
                    >
                      <Link to={`/teamleader/addassingment/${p.assignid}`}>
                        <i class="fa fa-tasks"></i>
                      </Link>

                      <Link to={`/teamleader/queryassing/${p.assignid}`}>
                        <i class="fa fa-share"></i>
                      </Link>
                    </div>
                  </div>
                )}

                {/* {display === "showR" && (
                  <div
                    id="reject"
                    title="Reject Assignment"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      color: "#6967ce",
                    }}
                  >
                    <div>
                      <i class="fa fa-times"></i>
                    </div>
                  </div>
                )} */}
              </td>
            </tr>
            <tr>
              <td></td>
              <th scope="row"></th>
              <td></td>
              <td>{p.Fact}</td>
              <td></td>
              <td class="bg-danger text-white">
                Query not rejected within 24 hours will be deemed accepted.
              </td>
            </tr>
            <tr>
              <td></td>
              <th scope="row"></th>
              <td></td>
              <td>{p.Fact}</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <th scope="row"></th>
              <td></td>
              <td>{p.Fact}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PendingForAcceptence;

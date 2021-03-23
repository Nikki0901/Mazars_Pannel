import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";

function Dashboard() {
  const userid = window.localStorage.getItem("tlkey");

  const [pendindForAccepttence, setPendingForAcceptence] = useState("");
  const [incomplete, setIncomplete] = useState("");
  const [complete, setcomplete] = useState("");

  useEffect(() => {
    const getPendindForAccepttence = () => {
      axios
        .get(`${baseUrl}/tl/pendingQues?id=${JSON.parse(userid)}`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setPendingForAcceptence(response.data.result.length);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getIncomplete = () => {
      axios
        .get(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setIncomplete(res.data.result.length);
          }
        });
    };

    const getComplete = () => {
      axios
        .get(`${baseUrl}/tl/getCompleteQues?id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setcomplete(res.data.result.length);
          }
        });
    };


    getPendindForAccepttence();
    getIncomplete();
    getComplete();

  }, []);

  var todaysDate = new Date();
  console.log(todaysDate);

 

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <div class="row mt-3">
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-150">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    Pending for Acceptance
                  </h5>
                </div>
                <div>
                <Link to={`/teamleader/queriestab`}>
                    <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "50px",
                }}
              >
                <h4>{pendindForAccepttence}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-150">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    Incomplete
                  </h5>
                </div>
                <div>
                <Link to={`/teamleader/queriestab`}>
                    <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "50px",
                }}
              >
                <h4>{incomplete}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-150">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    Complete
                  </h5>
                </div>
                <div>
                <Link to={`/teamleader/queriestab`}>
                    <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
                  </Link>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "50px",
                }}
              >
                <h4>{complete}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

// var todaysDate = new Date();
//   console.log(todaysDate);
// function convertDate(date) {
//   var yyyy = date.getFullYear().toString();
//   var mm = (date.getMonth() + 1).toString();
//   var dd = date.getDate().toString();

//   var mmChars = mm.split("");
//   var ddChars = dd.split("");

//   return (
//     yyyy +
//     "-" +
//     (mmChars[1] ? mm : "0" + mmChars[0]) +
//     "-" +
//     (ddChars[1] ? dd : "0" + ddChars[0])
//   );
// }

// console.log(convertDate(todaysDate));
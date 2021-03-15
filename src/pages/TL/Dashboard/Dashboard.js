import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";

function Dashboard() {
  const userid = window.localStorage.getItem("tlkey");

  const [pendindForAccepttence, setPendingForAcceptence] = useState("");

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

    getPendindForAccepttence();
  }, []);
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
                  <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
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
                  <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
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
                <h4></h4>
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
                  <i class="fa fa-tasks info font-large-1 float-right p-1"></i>
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
                <h4></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "../../../../node_modules/react-tabs/style/react-tabs.css";

import Layout from "../../../components/Layout/Layout";

function Dashboard() {
  const userid = window.localStorage.getItem("tpkey");
  const [incomplete, setIncomplete] = useState("");
  const [complete, setcomplete] = useState("");

  useEffect(() => {
    const getIncomplete = () => {
      axios
        .get(`${baseUrl}/tp/GetIncompleteQues?id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setIncomplete(res.data.result.length);
          }
        });
    };

    const getComplete = () => {
      axios
        .get(`${baseUrl}/tp/GetCompleteQues?id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setcomplete(res.data.result.length);
          }
        });
    };

    getIncomplete();
    getComplete();
  }, []);

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
      <div class="row mt-3">
        <div class="col-xl-4 col-lg-6 col-md-12">
          <div class="card pull-up ecom-card-1 bg-white">
            <div class="card-body height-150">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h5 class="text-muted info position-absolute p-1">
                    Inprogress
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
{
  /* <div>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList
            style={{
              listStyleType: "none",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Tab style={tabIndex == 0 ? myStyle2 : myStyle1}>
              Pending for Acceptance
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>Inprogress</Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>Complete</Tab>
          </TabList>

          <TabPanel>
            <p> Pending for Acceptance</p>
            <button onClick={() => setTabIndex(1)}>go to 1st tab</button>
          </TabPanel>
          <TabPanel>
            <p>Inprogress tab</p>
          </TabPanel>
          <TabPanel>
            <p>Complete tab</p>
          </TabPanel>
        </Tabs>
      </div> */
}

// const myStyle1 = {
//   backgroundColor: "grey",
//  padding: "12px",
//   borderRadius: "50px",
//   width: "200px",
//   textAlign: "center",
//   color: "white",
//   cursor: "pointer",
// };
// const myStyle2 = {
//  padding: "12px",
//   borderRadius: "50px",
//   width: "200px",
//   textAlign: "center",
//   backgroundColor: "blue",
//   color: "white",
//   cursor: "pointer",
// };

// const [tabIndex, setTabIndex] = useState(0);

import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import PendingForAcceptence from "../PendingForAcceptence/PendingForAcceptence";
import InCompleteData from "../InCompleteData/InCompleteData";
import CompleteData from "../CompleteData/CompleteData";

function QueriesTab(props) {
  const userid = window.localStorage.getItem("tlkey");
  const [tabIndex, setTabIndex] = useState(0);

  const [pendindForAccepttence, setPendingForAcceptence] = useState("");
  const [incomplete, setIncomplete] = useState("");
  const [complete, setcomplete] = useState("");


  // const CountPendingForAcceptence = (data) => {
  //   setPendingForAcceptence(data);
  // };

  // const CountIncomplete = (data) => {
  //   setIncomplete(data);
  // };

  // const CountComplete = (data) => {
  //   setComplete(data);
  // };

  const myStyle1 = {
    backgroundColor: "grey",
    padding: "12px",
    borderRadius: "50px",
    width: "200px",
    textAlign: "center",
    color: "white",
    cursor: "pointer",
  };
  const myStyle2 = {
    padding: "12px",
    borderRadius: "50px",
    width: "200px",
    textAlign: "center",
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
  };

  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);



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

  const updateTab = (key) => {
    setTabIndex(key)
  }

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <div>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList
            style={{
              listStyleType: "none",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Tab style={tabIndex == 0 ? myStyle2 : myStyle1}>
              Pending for Acceptance ({pendindForAccepttence})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
              InProgress ({incomplete})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
              Complete ({complete})
            </Tab>
          </TabList>

          <TabPanel>
            <PendingForAcceptence
              // CountPendingForAcceptence={CountPendingForAcceptence}
              updateTab={updateTab}
            />
          </TabPanel>
          <TabPanel>
            <InCompleteData
              // CountIncomplete={CountIncomplete}
            />
          </TabPanel>
          <TabPanel>
            <CompleteData
            // CountComplete={CountComplete}
            />
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default QueriesTab;

// <div class="row mt-3">
//   <div class="col-md-12">
//     <ul
//       class="nav nav-pills mb-3"
//       style={{ justifyContent: "space-around" }}
//       id="pills-tab"
//       role="tablist"
//     >
//       <li class="nav-item" role="presentation">
//         <a
//           class="nav-link text-white active"
//           id="pills-pending-tab"
//           data-toggle="pill"
//           href="#pending"
//           role="tab"
//           aria-controls="pills-pending"
//           aria-selected="false"
//         >
//           Pending for Acceptance ({pendingAcceptence})
//         </a>
//       </li>
//       <li class="nav-item" role="presentation">
//         <a
//           class="nav-link text-white"
//           id="pills-incomplete-tab"
//           data-toggle="pill"
//           href="#incomplete"
//           role="tab"
//           aria-controls="pills-incomplete"
//           aria-selected="false"
//         >
//           Inprogress ({incomplete})
//         </a>
//       </li>
//       <li class="nav-item" role="presentation">
//         <a
//           class="nav-link text-white"
//           id="pills-complete-tab"
//           data-toggle="pill"
//           href="#complete"
//           role="tab"
//           aria-controls="pills-complete"
//           aria-selected="false"
//         >
//           Complete ({complete})
//         </a>
//       </li>
//     </ul>
//     <div class="tab-content" id="pills-tabContent">
//       <div
//         class="tab-pane fade show active"
//         id="pending"
//         role="tabpanel"
//         aria-labelledby="pills-pending-tab"
//       >
//         <PendingForAcceptence
//           CountPendingForAcceptence={CountPendingForAcceptence}
//         />
//       </div>

//       <div
//         class="tab-pane fade"
//         id="incomplete"
//         role="tabpanel"
//         aria-labelledby="pills-incomplete-tab"
//       >
//         <InCompleteData CountIncomplete={CountIncomplete} />
//       </div>

//       <div
//         class="tab-pane fade"
//         id="complete"
//         role="tabpanel"
//         aria-labelledby="pills-complete-tab"
//       >
//         <CompleteData CountComplete={CountComplete} />
//       </div>
//     </div>
//   </div>
// </div>;
{
  /* <button onClick={() => setTabIndex(1)}>go to 1st tab</button> */
}

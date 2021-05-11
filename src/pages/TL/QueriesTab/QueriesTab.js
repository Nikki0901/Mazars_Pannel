import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";

import PendingForAcceptence from "../PendingForAcceptence/PendingForAcceptence";
import InCompleteData from "../InCompleteData/InCompleteData";
import CompleteData from "../CompleteData/CompleteData";

function QueriesTab() {
  const userid = window.localStorage.getItem("tlkey");
  const [tabIndex, setTabIndex] = useState(0);

  const [pendingAcceptence, setPendingAcceptence] = useState("");
  const [incomplete, setIncomplete] = useState("");
  const [complete, setComplete] = useState("");

  const CountPendingForAcceptence = (data) => {
    setPendingAcceptence(data);
  };

  const CountIncomplete = (data) => {
    setIncomplete(data);
  };

  const CountComplete = (data) => {
    setComplete(data);
  };

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

  const updateTab = (key) => {
    setTabIndex(key);
  };

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
              Pending for Acceptance ({pendingAcceptence})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
              Inprogress ({incomplete})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
              Complete ({complete})
            </Tab>
          </TabList>

          <TabPanel>
            <PendingForAcceptence
              CountPendingForAcceptence={CountPendingForAcceptence}
              updateTab={updateTab}
            />
          </TabPanel>
          <TabPanel>
            <InCompleteData CountIncomplete={CountIncomplete} />
          </TabPanel>
          <TabPanel>
            <CompleteData CountComplete={CountComplete} />
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


// 9837505200

// prashant kaushik


// pwd

// noddle oofficer covid 19 rmg

// 7302556474
// 9411515029
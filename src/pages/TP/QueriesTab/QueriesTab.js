// import React, { useState, useEffect } from "react";
// import Layout from "../../../components/Layout/Layout";
// import "./index.css";
// import axios from "axios";
// import { baseUrl } from "../../../config/config";
// import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";

// import InComplete from "../InComplete/InComplete";
// import Complete from "../Complete/Complete";

// function QueriesTab() {
//   const userid = window.localStorage.getItem("tpkey");


//   return (
//     <Layout TPDashboard="TPDashboard" TPuserId={userid}>
//       <div class="row mt-3">
//         <div class="col-md-12">
//           <ul
//             class="nav nav-pills mb-3"
//             style={{ justifyContent: "space-around" }}
//             id="pills-tab"
//             role="tablist"
//           >
//             <li class="nav-item" role="presentation">
//               <a
//                 class="nav-link text-white active"
//                 id="pills-incomplete-tab"
//                 data-toggle="pill"
//                 href="#incomplete"
//                 role="tab"
//                 aria-controls="pills-incomplete"
//                 aria-selected="false"
//               >
//                 Inprogress
//               </a>
//             </li>
//             <li class="nav-item" role="presentation">
//               <a
//                 class="nav-link text-white"
//                 id="pills-complete-tab"
//                 data-toggle="pill"
//                 href="#complete"
//                 role="tab"
//                 aria-controls="pills-complete"
//                 aria-selected="false"
//               >
//                 Complete
//               </a>
//             </li>
//           </ul>
//           <div class="tab-content" id="pills-tabContent">
//             <div
//               class="tab-pane fade show active"
//               id="incomplete"
//               role="tabpanel"
//               aria-labelledby="pills-incomplete-tab"
//             >
//               <InComplete />
//             </div>

//             <div
//               class="tab-pane fade"
//               id="complete"
//               role="tabpanel"
//               aria-labelledby="pills-complete-tab"
//             >
//               <Complete />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default QueriesTab;
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";

import PendingForAcceptence from "../PendingForAcceptence/PendingForAcceptence";
import InCompleteData from "../InComplete/InComplete";
import CompleteData from "../InComplete/InComplete";
import DeclinedQuery from "../DeclinedQuery/DeclinedQuery";
import AllQuery from "./AllQuery";



function QueriesTab(props) {
  const userid = window.localStorage.getItem("tpkey");
  const [tabIndex, setTabIndex] = useState(0);

  const [pendindForAccepttence, setPendingForAcceptence] = useState("");
  const [incomplete, setIncomplete] = useState("");
  const [complete, setcomplete] = useState("");

  const [allQuery, setAllQuery] = useState("");
  const [declined, setDeclined] = useState("");



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
    const AllQuery = () => {
      axios
        .get(`${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setAllQuery(res.data.result.length);
          }
        });
    };

    const getPendindForAccepttence = () => {
      axios
        .get(`${baseUrl}/tl/pendingQues?id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setPendingForAcceptence(res.data.result.length);
          }
        });
    };

    const getIncomplete = () => {
      axios
        .get(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=1`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setIncomplete(res.data.result.length);
          }
        });
    };

    const getComplete = () => {
      axios
        .get(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=2`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setcomplete(res.data.result.length);
          }
        });
    };

    const Declined = () => {
      axios
        .get(`${baseUrl}/tl/declinedQueries?id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setDeclined(res.data.result.length);
          }
        });
    };

    getPendindForAccepttence();
    getIncomplete();
    getComplete();
    AllQuery();
    Declined()
  }, []);

  const updateTab = (key) => {
    setTabIndex(key)
  }

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
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
              All Query ({allQuery})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
              Pending For Acceptence ({pendindForAccepttence})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
              Inprogress; Queries ({incomplete})
            </Tab>
            <Tab style={tabIndex == 3 ? myStyle2 : myStyle1}>
              Completed; Queries ({complete})
            </Tab>
            <Tab style={tabIndex == 4 ? myStyle2 : myStyle1}>
              Declined; Queries ({declined})
            </Tab>
          </TabList>


          <TabPanel>
            <AllQuery
            />
          </TabPanel>
          <TabPanel>
            <PendingForAcceptence
              updateTab={updateTab}
            />
          </TabPanel>
          <TabPanel>
            <InCompleteData
            />
          </TabPanel>
          <TabPanel>
            <CompleteData
            />
          </TabPanel>
          <TabPanel>
            <DeclinedQuery
            />
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default QueriesTab;


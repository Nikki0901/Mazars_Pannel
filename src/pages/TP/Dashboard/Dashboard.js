import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "../../../../node_modules/react-tabs/style/react-tabs.css";

import Layout from "../../../components/Layout/Layout";

function Dashboard() {
  const [tabIndex, setTabIndex] = useState(0);

  const userid = window.localStorage.getItem("tpkey");

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
      </div>
    </Layout>
  );
}

export default Dashboard;

{
  /* <Tab style={tabIndex == 0 ? myStyle2 : myStyle1}>
              Pending for acceptance
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>Inprogress</Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>Complete</Tab> */
}

// <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
// <TabList
//   style={{
//     listStyleType: "none",
//     display: "flex",
//     justifyContent: "space-between",
//   }}
// >
//   <Tab
//     style={{
//       border: "1px solid black",
//       padding: "12px 24px",
//       borderRadius: "18px",
//       width: "200px",
//       textAlign: "center",
//     }}
//   >
//     Pending for Acceptance
//   </Tab>
//   <Tab
//     style={{
//       border: "1px solid black",
//       padding: "12px 24px",
//       borderRadius: "18px",
//       width: "200px",
//       textAlign: "center",
//     }}
//   >
//     Inprogress
//   </Tab>
//   <Tab
//     style={{
//       border: "1px solid black",
//       padding: "12px 24px",
//       borderRadius: "18px",
//       width: "200px",
//       textAlign: "center",
//     }}
//   >
//     Complete
//   </Tab>
// </TabList>

//         <TabPanel>
//           <p>Pending tab</p>
//         </TabPanel>
//         <TabPanel>
//           <p>Inprogress tab</p>
//           <button onClick={() => setTabIndex(0)}>go to 1st tab</button>
//           <button onClick={() => setTabIndex(2)}>go to 3rd tab</button>
//         </TabPanel>
//         <TabPanel>
//           <p>Complete tab</p>
//         </TabPanel>
//       </Tabs>

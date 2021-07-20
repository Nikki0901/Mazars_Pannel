import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";


import AllAssignment from "./AllAssignment";
import DraftReportTab from "./DraftReportTab";
import DeliveryFinalTab from "./DeliveryFinalTab";



function QueriesTab(props) {
  const userid = window.localStorage.getItem("tlkey");
  const [tabIndex, setTabIndex] = useState(0);

  const [pendindForAccepttence, setPendingForAcceptence] = useState("");
  const [incomplete, setIncomplete] = useState("");
  const [complete, setcomplete] = useState("");


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
              All Assignments
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
              Inprogress; Draft Reports
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
              Inprogress; Delivery of Final
            </Tab>
          </TabList>

          <TabPanel>
            <AllAssignment />
          </TabPanel>

          <TabPanel>
            <DraftReportTab />
          </TabPanel>

          <TabPanel>
            <DeliveryFinalTab />
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default QueriesTab;


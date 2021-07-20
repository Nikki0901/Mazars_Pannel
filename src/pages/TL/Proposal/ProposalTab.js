import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";

import AllProposal from "./AllProposal";
import InprogressProposal from "./InprogressProposal";
import AcceptedProposal from "./AcceptedProposal";
import DeclinedProposal from "./DeclinedProposal";




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


    // const updateTab = (key) => {
    //     setTabIndex(key)
    // }

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
                            All Proposals
                        </Tab>
                        <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
                            Inprogress; Proposals
                        </Tab>
                        <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
                            Accepted; Proposals
                        </Tab>
                        <Tab style={tabIndex == 3 ? myStyle2 : myStyle1}>
                            Declined; Proposals
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <AllProposal />
                    </TabPanel>
                    <TabPanel>
                        <InprogressProposal />
                    </TabPanel>
                    <TabPanel>
                        <AcceptedProposal />
                    </TabPanel>
                    <TabPanel>
                        <DeclinedProposal />
                    </TabPanel>
                </Tabs>
            </div>
        </Layout>
    );
}

export default QueriesTab;



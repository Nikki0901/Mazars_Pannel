import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import PendingForAllocation from "../../../components/PendingForAllocation/PendingForAllocation";
import PendingForProposals from "../../../components/PendingForProposals/PendingForProposals";
import PendingForPayment from "../../../components/PendingForPayment/PendingForPayment";
import AllQueriesData from "../../../components/AllQueriesData/AllQueriesData";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";

function QueriesTab(props) {
  console.log("queries tab: ", props);
  const userid = window.localStorage.getItem("adminkey");
  const count_PFA = window.localStorage.getItem("count_PFA");

  // const CountAllQuery = (data) => {
  //   setAllQueriesCount(data);
  // };

  // const CountPendingProposal = (data) => {
  //   setPendingProposalCount(data);
  // };

  // const CountPendingForPayment = (data) => {
  //   setPendingforPayment(data);
  // };

  // const CountPendingForAllocation = (data) => {
  //   setPendingforAllocation(data);
  // };

  const [allQueriesCount, setAllQueriesCount] = useState("");
  const [pendingProposalCount, setPendingProposalCount] = useState("");
  const [pendingForPayment, setPendingforPayment] = useState("");
  const [pendingForAllocation, setPendingforAllocation] = useState();

  useEffect(() => {
    CountAllQuery();
    CountPendingForAllocation();
    CountPendingProposal();
    CountPendingForPayment();
  }, []);

  const CountAllQuery = (data) => {
    axios.get(`${baseUrl}/admin/getAllQueries`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setAllQueriesCount(res.data.result.length);
      }
    });
  };

  const CountPendingProposal = () => {
    axios.get(`${baseUrl}/admin/pendingProposal`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPendingProposalCount(res.data.result.length);
      }
    });
  };

  const CountPendingForPayment = () => {
    axios.get(`${baseUrl}/admin/pendingPaymentProposals`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPendingforPayment(res.data.result.length);
      }
    });
  };

  const CountPendingForAllocation = () => {
    axios.get(`${baseUrl}/admin/pendingAllocation`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPendingforAllocation(res.data.result.length);
      }
    });
  };

  const [tabIndex, setTabIndex] = useState(0);
  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);

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
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
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
              All Queries ({allQueriesCount})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
              Pending for Allocation ({pendingForAllocation})
            </Tab>
            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
              Pending for Proposal ({pendingProposalCount})
            </Tab>

            <Tab style={tabIndex == 3 ? myStyle2 : myStyle1}>
              Pending for Payment ({pendingForPayment})
            </Tab>
          </TabList>

          <TabPanel>
            <AllQueriesData />
          </TabPanel>

          <TabPanel>
            <PendingForAllocation />
          </TabPanel>

          <TabPanel>
            <PendingForProposals />
          </TabPanel>

          <TabPanel>
            <PendingForPayment />
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default QueriesTab;

{
  /* <div class="row mt-3">
        <div class="col-md-12" style={{ top: "-12px" }}>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <div
              className="tabs"
              style={{
                fontSize: "14px",
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Tab style={tabIndex === 0 ? myStyle2 : myStyle1}>
                All Queries ({allQueriesCount})
              </Tab>
              <Tab style={tabIndex === 1 ? myStyle2 : myStyle1}>
                Pending for Allocation ({pendingForAllocation})
              </Tab>
              <Tab style={tabIndex === 2 ? myStyle2 : myStyle1}>
                Pending for Proposal ({pendingProposalCount})
              </Tab>
              <Tab style={tabIndex === 3 ? myStyle2 : myStyle1}>
                Pending for Payment ({pendingForPayment})
              </Tab>
            </div>
            <TabPanel>
              <AllQueriesData CountAllQuery={CountAllQuery} />
            </TabPanel>

            <TabPanel>
              <PendingForAllocation />
            </TabPanel>

            <TabPanel>
              <PendingForProposals />
            </TabPanel>

            <TabPanel>
              <PendingForPayment
                CountPendingForPayment={CountPendingForPayment}
              />
            </TabPanel>
          </Tabs>
        </div>
      </div>
 */
}

{
  /* <div class="row mt-3">
        <div class="col-md-12" style={{ top: "-12px" }}>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="query"
              role="tabpanel"
              aria-labelledby="pills-query-tab"
            >
              <ul
                class="nav nav-pills mb-3 col-sm-12"
                style={{ justifyContent: "space-around" }}
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link text-white active"
                    id="pills-d-tab"
                    data-toggle="pill"
                    href="#d"
                    role="tab"
                    aria-controls="pills-d"
                    aria-selected="true"
                  >
                    All Queries ({allQueriesCount})
                  </a>
                </li>

                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link text-white"
                    id="pills-a-tab"
                    data-toggle="pill"
                    href="#a"
                    role="tab"
                    aria-controls="pills-a"
                    aria-selected="false"
                  >
                    Pending for Allocation ({pendingForAllocation})
                 
                  </a>
                </li>

                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link text-white"
                    id="pills-b-tab"
                    data-toggle="pill"
                    href="#b"
                    role="tab"
                    aria-controls="pills-b"
                    aria-selected="false"
                  >
                    Pending for Proposal ({pendingProposalCount})
                  </a>
                </li>

                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link text-white"
                    id="pills-c-tab"
                    data-toggle="pill"
                    href="#c"
                    role="tab"
                    aria-controls="pills-c"
                    aria-selected="false"
                  >
                    Pending for Payment ({pendingForPayment})
                  </a>
                </li>
              </ul>

              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="d"
                  role="tabpanel"
                  aria-labelledby="pills-d-tab"
                >
                  <AllQueriesData CountAllQuery={CountAllQuery} />
                </div>

                <div
                  class="tab-pane fade"
                  id="a"
                  role="tabpanel"
                  aria-labelledby="pills-a-tab"
                >
                  <PendingForAllocation
                    CountPendingForAllocation={CountPendingForAllocation}
                  />
                </div>

                <div
                  class="tab-pane fade"
                  id="b"
                  role="tabpanel"
                  aria-labelledby="pills-b-tab"
                >
                  <PendingForProposals
                    CountPendingProposal={CountPendingProposal}
                  />
                </div>

                <div
                  class="tab-pane fade"
                  id="c"
                  role="tabpanel"
                  aria-labelledby="pills-c-tab"
                >
                  <PendingForPayment
                    CountPendingForPayment={CountPendingForPayment}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     */
}

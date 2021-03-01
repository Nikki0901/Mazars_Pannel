import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";

function Dashboard() {
  const [newQueries, setNewQueries] = useState([]);
  const [incompleteData, setInCompleteData] = useState([]);
  const [completeData, setCompleteData] = useState([]);

  const userid = window.localStorage.getItem("tpkey");

  useEffect(() => {
    const getNewQueries = () => {
      axios
        .get(`${baseUrl}/tp/getassignedques?id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setNewQueries(res.data.result);
          }
        });
    };

    const getInCompleteAssingment = () => {
      axios
        .get(`${baseUrl}/tp/GetIncompleteQues?id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setInCompleteData(res.data.result);
          }
        });
    };

    const getCompleteAssingment = () => {
      axios
        .get(`${baseUrl}/tp/GetCompleteQues?id=${JSON.parse(userid)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setCompleteData(res.data.result);
          }
        });
    };

    getNewQueries();
    getInCompleteAssingment();
    getCompleteAssingment();
  }, []);

  // change date format
  function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("-");
  }

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
      <div class="row mt-3">
        <div class="col-md-12">
          <ul
            class="nav nav-pills mb-3"
            style={{ justifyContent: "space-around" }}
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-white active"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#payment"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                New Queries
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-white"
                id="pills-contact-tab"
                data-toggle="pill"
                href="#incomplete"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                Incomplete
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-white"
                id="pills-contact-tab"
                data-toggle="pill"
                href="#complete"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                Complete
              </a>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="payment"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              {newQueries.map((p, i) => (
                <div>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Query No .</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Facts of the Case</th>
                        <th scope="col">Exp. Delivery Date</th>
                        <th scope="col">Assignment Stage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <Link to={`/taxprofessional/queries/${p.id}`}>
                            {p.assign_no}
                          </Link>
                        </th>
                        <td>{p.name}</td>
                        <td>{p.fact_case}</td>
                        <td>{ChangeFormateDate(p.Exp_Delivery_Date)}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            <div
              class="tab-pane fade"
              id="incomplete"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              {incompleteData.map((p, i) => (
                <div>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Query No .</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Facts of the Case</th>
                        <th scope="col">Exp. Delivery Date</th>
                        <th scope="col">Assignment Stage</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{p.assign_no}</th>
                        <td>{p.name}</td>
                        <td>{p.fact_case}</td>
                        <td>{p.Exp_Delivery_Date}</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            <div
              class="tab-pane fade"
              id="complete"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              {/* {completeData.map((p, i) => (
                <div>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Query No .</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Delivery Date</th>
                        <th scope="col">Assignment Stage</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{p.AssignNo}</th>
                        <td>{p.name}</td>
                        <td>{p.Expect}</td>
                        <td>Client discussion</td>
                        <td class="bg-success text-white">Complete</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td>Draft report</td>
                        <td class="bg-success text-white">Complete</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td>Final Discussion</td>
                        <td class="bg-success text-white">Complete</td>
                      </tr>
                      <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td>Delivery of report</td>
                        <td class="bg-success text-white">Complete</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

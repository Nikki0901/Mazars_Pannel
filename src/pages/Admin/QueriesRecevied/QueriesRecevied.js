import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link, useParams } from "react-router-dom";

function QueriesRecevied() {
  const [submitData, setSubmitData] = useState([]);
  const [assingNo, setAssingmentNo] = useState();
  const [displayQuery, setDisplayQuery] = useState([]);
  const { id } = useParams();

  const userid = window.localStorage.getItem("adminkey");

  useEffect(() => {
    const getSubmittedAssingment = () => {
      axios.get(`${baseUrl}/get/by/AssignNo/${id}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setSubmitData(res.data.result);
          setAssingmentNo(res.data.result[0].AssignNo);
        }
      });
    };

    getSubmittedAssingment();
    getQuery();
  }, [assingNo]);

  console.log(assingNo);

  const getQuery = () => {
    axios.get(`${baseUrl}/get/additionalqueries/${assingNo}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setDisplayQuery(res.data.result);
      }
    });
  };

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <div class="row mt-3">
        <div class="col-xl-12 col-lg-12 col-md-12">
          <div class="">
            <h2>Queries Received</h2>
          </div>
          <br />
          <br />
          <div class="accordion" id="accordionExample">
            {submitData.map((p, i) => (
              <div class="card">
                <div
                  class="card-header"
                  id="headingOne"
                  style={{ padding: ".5rem .1rem" }}
                >
                  <h2 class="mb-0 query">
                    <button
                      class="btn btn-block text-left"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      {p.AssignNo}
                    </button>
                  
                  </h2>
                </div>

               
                  <div class="card-body">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Titles</th>
                          <th scope="col">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Facts of the case</th>
                          <td>{p.Fact}</td>
                        </tr>
                        <tr>
                          <th scope="row">specific questions</th>
                          <td colspan="1">{p.specificquery}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            Purpose for which Opinion is sought
                          </th>
                          <td colspan="1">{p.Purpose}</td>
                        </tr>                  
                        <tr>
                          <th scope="row">
                            Format in which Opinion is required
                          </th>
                          <td colspan="1">{p.Format}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            Timelines within which Opinion is Required
                          </th>
                          <td colspan="1">{p.timelines}</td>
                        </tr>
                        <tr>
                          <th scope="row">Documents</th>
                          <td>{p.Upload}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "33.3%" }}>
                            Additional Queries
                          </th>
                          <th scope="col">Date Submission</th>
                          <th scope="col">Documents</th>
                        </tr>
                      </thead>
                      {displayQuery.map((p, i) => (
                        <tbody>
                          <tr key={i}>
                            <td>{p.Additional}</td>
                            <td>{p.created}</td>
                            <td>{p.upload}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>

                
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QueriesRecevied;

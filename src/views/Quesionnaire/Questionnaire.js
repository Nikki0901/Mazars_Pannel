import React from "react";
import Layout from "../../components/Layout/Layout";
import "./index.css";


function Questionnaire() {
  const userId = window.localStorage.getItem("userid");
  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="schedule">
            <h3>My Assignment</h3>
            <a href="new-query.html" class="btn btn-primary">
              Fresh Assignment
            </a>
          </div>
          <br />
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12">
          <div class="accordion" id="accordionExample">
            
            <div class="card">
              <div
                class="card-header"
                id="headingOne"
                style={{padding:".5rem .1rem"}}
              >
                <h2 class="mb-0 query">
                  <button
                    class="btn btn-link btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    20210115-34570
                  </button>
                  <div>
                    <p class="m-0">Submitted on</p>
                  </div>
                  <div class="d-flex">
                    <div class="additional">
                      <button
                        class="btn"
                        data-toggle="modal"
                        data-target="#staticBackdrop"
                      >
                        Add. Query
                      </button>
                    </div>
                    <div class="complete">
                      <p>Pending</p>
                    </div>
                  </div>
                </h2>
              </div>

              <div
                id="collapseOne"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
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
                        <th scope="row">Nature of Issue</th>
                        <td>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Totam eum nihil voluptatum esse fuga et.
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Facts of the case</th>
                        <td>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Totam eum nihil voluptatum esse fuga et.
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Specific Query (ies) for advisory</th>
                        <td colspan="1">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Totam eum nihil voluptatum esse fuga et.
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Relevant Section of the Statue</th>
                        <td colspan="1">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Totam eum nihil voluptatum esse fuga et.
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Industry</th>
                        <td colspan="1">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Totam eum nihil voluptatum esse fuga et.
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Purpose for which Opinion is sought</th>
                        <td colspan="1">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Totam eum nihil voluptatum esse fuga et.
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Opinion Expert</th>
                        <td colspan="1">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Totam eum nihil voluptatum esse fuga et.
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Format in which Opinion is required</th>
                        <td colspan="1">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Totam eum nihil voluptatum esse fuga et.
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          Timelines within which Opinion is Required
                        </th>
                        <td colspan="1">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Totam eum nihil voluptatum esse fuga et.
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Documents</th>
                        <td>
                          <a href="#">Document1</a>, <a href="#">Document2</a>
                          <a href="#">Document3</a>
                        </td>
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Additional Queries#1</td>
                        <td>14-02-2021</td>
                      </tr>
                      <tr>
                        <td>Additional Queries#2</td>
                        <td>17-02-2021</td>
                      </tr>
                      <tr>
                        <td>Additional Queries#3</td>
                        <td>20-02-2021</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="card">
              <div
                class="card-header disabled"
                id="headingTwo"
                style={{padding:".5rem .1rem"}}
              >
                <h2 class="mb-0 query">
                  <button
                    class="btn btn-link btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                  >
                    20210115-34570
                  </button>
                  <div>
                    <p class="m-0">Completed on</p>
                  </div>
                  <div class="d-flex">
                    <div class="additional">
                      <button class="btn" style={{background:"green"}}>
                        Add. Query
                      </button>
                    </div>
                    <div class="complete">
                      <p>Completed</p>
                    </div>
                  </div>
                </h2>
              </div>
              <div
                id="collapseTwo"
                class="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="">
                        <p>Facts of the Case</p>
                      </div>
                      <div>
                        <ol class="pl-1">
                          <li>Facts of the Case1</li>
                          <li>Facts of the Case2</li>
                          <li>Facts of the Case3</li>
                        </ol>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div>
                        <p>Final Report</p>
                      </div>
                      <div>
                        <img
                          src="https://img.icons8.com/cotton/2x/regular-document.png"
                          class="w-25"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Questionnaire;

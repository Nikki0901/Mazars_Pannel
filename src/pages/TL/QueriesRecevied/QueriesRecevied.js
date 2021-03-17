import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link, useParams ,useHistory} from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

function QueriesRecevied() {
  const [submitData, setSubmitData] = useState([]);
  const [assingNo, setAssingmentNo] = useState();
  const [displayQuery, setDisplayQuery] = useState([]);
  const [diaplaySpecific, setDisplaySpecific] = useState([]);

  const { id } = useParams();
  const history = useHistory();

  const userid = window.localStorage.getItem("tlkey");

  useEffect(() => {
    const getQueryDetails = () => {
      axios.get(`${baseUrl}/tl/GetQueryDetails?id=${id}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setSubmitData(res.data.result);
          setDisplaySpecific(res.data.additional_queries);
          setAssingmentNo(res.data.result[0].assign_no);
        }
      });
    };

    getQueryDetails();
    getAdditionalQuery();
  }, [assingNo]);

  const getAdditionalQuery = () => {
    axios
      .get(`${baseUrl}/tl/GetAdditionalQueries?assignno=${assingNo}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setDisplayQuery(res.data.result);
        }
      });
  };

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button class="btn btn-success" onClick={() => history.goBack()}>
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </Col>
            <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "20px" }}>Query Details</p>
            </Col>
            <Col md="4" style={{ display: "flex", justifyContent: "flex-end" }}>
              <p>{assingNo}</p>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {submitData.map((p, i) => (
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
                    <th scope="row">Query Status</th>
                    <td>{p.status}</td>
                  </tr>
                  <tr>
                    <th scope="row">Facts of the case</th>
                    <td>{p.fact_case}</td>
                  </tr>

                  <tr>
                    <th scope="row">Purpose for which Opinion is sought</th>
                    <td colspan="1">{p.purpose_opinion}</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      Timelines within which Opinion is Required
                    </th>
                    <td colspan="1">{p.Timelines}</td>
                  </tr>
                  <tr>
                    <th scope="row">specific questions</th>
                    <td colspan="1">
                      {diaplaySpecific.map((p, i) => (
                        <p>{p.text}</p>
                      ))}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Documents</th>
                    <td>
                      {p.upload_doc_1 == null ? (
                        ""
                      ) : (
                        <p>
                          <a
                            href={`http://13.232.121.233/mazarapi/assets/image/${p.upload_doc_1}`}
                          >
                            <i class="fa fa-photo"></i>
                          </a>
                        </p>
                      )}

                      {p.upload_doc_2 == null ? (
                        ""
                      ) : (
                        <p>
                          <a
                            href={`http://13.232.121.233/mazarapi/assets/image/${p.upload_doc_2}`}
                          >
                            <i class="fa fa-photo"></i>
                          </a>
                        </p>
                      )}

                      {p.upload_doc_3 == null ? (
                        ""
                      ) : (
                        <p>
                          <a
                            href={`http://13.232.121.233/mazarapi/assets/image/${p.upload_doc_3}`}
                          >
                            <i class="fa fa-photo"></i>
                          </a>
                        </p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Format in which Opinion is required</th>
                    <td colspan="1">
                      <p>{p.softcopy_word === "1" && "Softcopy - Word/ Pdf"}</p>
                      <p>
                        {p.softcopy_digitally_assigned === "1" &&
                          "SoftCopy- Digitally Signed"}
                      </p>

                      <p>
                        {p.printout_physically_assigned === "1" &&
                          "Printout- Physically Signed"}
                      </p>
                    </td>
                  </tr>
                  
                </tbody>
              </table>

              <table class="table table-bordered">
                {displayQuery.length > 0 && (
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "33.3%" }}>
                        Additional Queries
                      </th>
                      <th scope="col">Date Submission</th>
                      <th scope="col">Documents</th>
                    </tr>
                  </thead>
                )}

                {displayQuery.map((p, i) => (
                  <tbody>
                    <tr key={i}>
                      <td>{p.additional_queries}</td>
                      <td>{p.created}</td>
                      <td>
                          {p.upload_doc == "" ? (
                            ""
                          ) : (
                            <p>
                              <a
                                href={`http://13.232.121.233/mazarapi/assets/image/${p.upload_doc}`}
                              >
                                <i class="fa fa-photo"></i>
                              </a>
                            </p>
                          )}
                        </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          ))}
        </CardBody>
      </Card>
    </Layout>
  );
}

export default QueriesRecevied;

// <div class="row mt-3">
// <div class="col-xl-12 col-lg-12 col-md-12">
//   <div class="">
//     <h2>Queries Received</h2>
//   </div>
//   <br />
//   <br />
//   <div class="accordion" id="accordionExample">
//     {submitData.map((p, i) => (
//       <div class="card">
//         <div
//           class="card-header"
//           id="headingOne"
//           style={{ padding: ".5rem .1rem" }}
//         >
//           <h2 class="mb-0 query">
//             <button
//               class="btn btn-block text-left"
//               type="button"
//               data-toggle="collapse"
//               data-target="#collapseOne"
//               aria-expanded="true"
//               aria-controls="collapseOne"
//             >
//               {p.AssignNo}
//             </button>
//             <div>

//             </div>
//           </h2>
//         </div>

//           <div class="card-body">
//           <table class="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">Titles</th>
//               <th scope="col">Data</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row">Facts of the case</th>
//               <td>{p.fact_case}</td>
//             </tr>

//             <tr>
//               <th scope="row">Purpose for which Opinion is sought</th>
//               <td colspan="1">{p.purpose_opinion}</td>
//             </tr>
//             <tr>
//               <th scope="row">
//                 Timelines within which Opinion is Required
//               </th>
//               <td colspan="1">{p.Timelines}</td>
//             </tr>
//             <tr>
//               <th scope="row">specific questions</th>
//               <td colspan="1">
//                 {diaplaySpecific.map((p, i) => (
//                   <p>{p.text}</p>
//                 ))}
//               </td>
//             </tr>

//             <tr>
//               <th scope="row">Documents</th>
//               <td>
//                 {p.upload_doc_1 == null ? (
//                   ""
//                 ) : (
//                   <p>
//                     <a
//                       href={`http://13.232.121.233/mazarapi/assets/image/${p.upload_doc_1}`}
//                     >
//                       <i class="fa fa-photo"></i>
//                     </a>
//                   </p>
//                 )}

//                 {p.upload_doc_2 == null ? (
//                   ""
//                 ) : (
//                   <p>
//                     <a
//                       href={`http://13.232.121.233/mazarapi/assets/image/${p.upload_doc_2}`}
//                     >
//                       <i class="fa fa-photo"></i>
//                     </a>
//                   </p>
//                 )}

//                 {p.upload_doc_3 == null ? (
//                   ""
//                 ) : (
//                   <p>
//                     <a
//                       href={`http://13.232.121.233/mazarapi/assets/image/${p.upload_doc_3}`}
//                     >
//                       <i class="fa fa-photo"></i>
//                     </a>
//                   </p>
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <th scope="row">Format in which Opinion is required</th>
//               <td colspan="1">
//                 <p>
//                   {p.softcopy_word === "1" && "Softcopy - Word/ Pdf"}
//                 </p>
//                 <p>
//                   {p.softcopy_digitally_assigned === "1" &&
//                     "SoftCopy- Digitally Signed"}
//                 </p>

//                 <p>
//                   {p.printout_physically_assigned === "1" &&
//                     "Printout- Physically Signed"}
//                 </p>
//               </td>
//             </tr>
//             <tr>
//               <th scope="row">Query Status</th>
//               <td>{p.status}</td>
//             </tr>
//           </tbody>
//         </table>
//             <table class="table table-bordered">
//               <thead>
//                 <tr>
//                   <th scope="col" style={{ width: "33.3%" }}>
//                     Additional Queries
//                   </th>
//                   <th scope="col">Date Submission</th>
//                   <th scope="col">Documents</th>
//                 </tr>
//               </thead>
//               {displayQuery.map((p, i) => (
//                 <tbody>
//                   <tr key={i}>
//                   <td>{p.additional_queries}</td>
//                     <td>{p.created}</td>
//                     <td>{p.upload}</td>
//                   </tr>
//                 </tbody>
//               ))}
//             </table>
//           </div>

//       </div>
//     ))}
//   </div>
// </div>
// </div>

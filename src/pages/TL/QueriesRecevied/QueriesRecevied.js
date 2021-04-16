import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useParams } from "react-router-dom";
import QueryDetails from "../../../components/QueryDetails/QueryDetails";

function QueriesRecevied() {
  const { id } = useParams();
  const userid = window.localStorage.getItem("tlkey");
  const [submitData, setSubmitData] = useState([]);
  const [assingNo, setAssingmentNo] = useState();
  const [displayQuery, setDisplayQuery] = useState([]);
  const [diaplaySpecific, setDisplaySpecific] = useState([]);
  const [queryDocs, setQueryDocs] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [purpose, setPurpose] = useState([]);

  const [diaplayProposal, setDisplayProposal] = useState({
    amount: "",
    accepted_amount: "",
    payment_received: "",
    cust_accept_date: "",
    proposal_date: "",
  });

  const [diaplayAssignment, setDisplayAssignment] = useState([
    {
      assignment_number: "",
      assignment_date: "",
    },
  ]);

  const [diaplayHistory, setDisplayHistory] = useState([
    {
      tlname: "",
      date_of_allocation: "",
      date_of_delivery: "",
    },
  ]);

  useEffect(() => {
    const getSubmittedAssingment = () => {
      axios.get(`${baseUrl}/customers/getQueryDetails?id=${id}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setSubmitData(res.data.result);
          setDisplaySpecific(res.data.additional_queries);
          setPaymentDetails(res.data.payment_detail);
          setAssingmentNo(res.data.result[0].assign_no);

          var purposeItem = res.data.result[0].purpose_opinion;
          console.log("purposeItem-", typeof purposeItem);
          try {
            var myObj = JSON.parse(purposeItem);
            setPurpose(myObj);
          } catch (e) {
            return false;
          }

          if (res.data.proposal_queries.length > 0) {
            setDisplayProposal({
              accepted_amount: res.data.proposal_queries[0].accepted_amount,
              payment_received: res.data.proposal_queries[0].paid_amount,
              amount: res.data.proposal_queries[0].amount,
              cust_accept_date: res.data.proposal_queries[0].cust_accept_date,
              proposal_date: res.data.proposal_queries[0].created,
              misc2: res.data.proposal_queries[0].misc2,
            });
          }

          if (res.data.assignment.length > 0) {
            setDisplayAssignment({
              assignment_number: res.data.assignment[0].assignment_number,
              assignment_date: res.data.assignment[0].created,
              date_of_delivery: res.data.assignment[0].date_of_delivery,
            });
          }
          if (res.data.history_queries.length > 0) {
            setDisplayHistory({
              tlname: res.data.history_queries[0].tname,
              date_of_allocation:
                res.data.history_queries[0].date_of_allocation,
            });
          }
          if (res.data.queries_document) {
            if (res.data.queries_document.length > 0) {
              setQueryDocs(res.data.queries_document);
            }
          }
        }
      });
    };
    getQuery();
    getSubmittedAssingment();
  }, [assingNo]);

  const getQuery = () => {
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
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="schedule">
            <h3>Query Detail</h3>
          </div>
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12">
          {submitData.map((p, index) => (
            <QueryDetails
              p={p}
              key={index}
              diaplaySpecific={diaplaySpecific}
              diaplayProposal={diaplayProposal}
              diaplayHistory={diaplayHistory}
              diaplayAssignment={diaplayAssignment}
              displayQuery={displayQuery}
              getQuery={getQuery}
              assingNo={assingNo}
              queryDocs={queryDocs}
              purpose={purpose}
              paymentDetails={paymentDetails}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default QueriesRecevied;
// useEffect(() => {
//   const getQueryDetails = () => {
//     axios.get(`${baseUrl}/tl/GetQueryDetails?id=${id}`).then((res) => {
//       console.log(res);
//       if (res.data.code === 1) {
//         setSubmitData(res.data.result);
//         setDisplaySpecific(res.data.additional_queries);
//         setAssingmentNo(res.data.result[0].assign_no);
//       }
//     });
//   };

//   getQueryDetails();
//   getAdditionalQuery();
// }, [assingNo]);

//   <Card>
//   <CardHeader>
//     <Row>
//       <Col md="4">
//         <button class="btn btn-success" onClick={() => history.goBack()}>
//           <i class="fas fa-arrow-left mr-2"></i>
//           Go Back
//         </button>
//       </Col>
//       <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
//         <p style={{ fontSize: "20px" }}>Query Details</p>
//       </Col>
//       <Col md="4" style={{ display: "flex", justifyContent: "flex-end" }}>
//       </Col>
//     </Row>
//   </CardHeader>
//   <CardBody>
//     {submitData.map((p, i) => (
//       <div class="card-body">
//         <table class="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">Titles</th>
//               <th scope="col">Data</th>
//             </tr>
//           </thead>
//           <tbody>
//           <tr>
//               <th scope="row">Query No</th>
//               <td>{p.assign_no}</td>
//             </tr>
//           <tr>
//               <th scope="row">Query Status</th>
//               <td>{p.status}</td>
//             </tr>
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
//                 <p>{p.softcopy_word === "1" && "Softcopy - Word/ Pdf"}</p>
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

//           </tbody>
//         </table>

//         <table class="table table-bordered">
//           {displayQuery.length > 0 && (
//             <thead>
//               <tr>
//                 <th scope="col" style={{ width: "33.3%" }}>
//                   Additional Queries
//                 </th>
//                 <th scope="col">Date Submission</th>
//                 <th scope="col">Documents</th>
//               </tr>
//             </thead>
//           )}

//           {displayQuery.map((p, i) => (
//             <tbody>
//               <tr key={i}>
//                 <td>{p.additional_queries}</td>
//                 <td>{ChangeFormateDate(p.created)}</td>
//                 <td>
//                     {p.upload_doc == "" ? (
//                       ""
//                     ) : (
//                       <p>
//                         <a
//                           href={`http://13.232.121.233/mazarapi/assets/image/${p.upload_doc}`}
//                         >
//                           <i class="fa fa-photo"></i>
//                         </a>
//                       </p>
//                     )}
//                   </td>
//               </tr>
//             </tbody>
//           ))}
//         </table>
//       </div>
//     ))}
//   </CardBody>
// </Card>

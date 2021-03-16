import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useParams ,useHistory} from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";

function MyAssingment() {
  const alert = useAlert();
  const { handleSubmit, register, reset } = useForm();

  const [submitData, setSubmitData] = useState([]);
  const [assingNo, setAssingmentNo] = useState();
  const [displayQuery, setDisplayQuery] = useState([]);
  const [diaplaySpecific, setDisplaySpecific] = useState([]);

  const [addModal, setAddModal] = useState(false);
  const addHandler = () => setAddModal(!addModal);

  const { id } = useParams();
  const history = useHistory();

  const userId = window.localStorage.getItem("userid");

  useEffect(() => {
    const getSubmittedAssingment = () => {
      axios.get(`${baseUrl}/customers/getQueryDetails?id=${id}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setSubmitData(res.data.result);
          setDisplaySpecific(res.data.additional_queries);
          setAssingmentNo(res.data.result[0].assign_no);
        }
      });
    };
    getQuery();
    getSubmittedAssingment();
  }, [assingNo]);

  console.log(diaplaySpecific);

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

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("assign_no", assingNo);
    formData.append("query", value.p_addqueri);
    formData.append("upload", value.p_upload[0]);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/PostAdditionalQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("Additional Queries successfully added!");
          reset();
          getQuery();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


   //change date format
   function ChangeFormateDate(oldDate) {
    console.log("date",oldDate)
    if(oldDate == null){
      return null
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="schedule">
            <h3>Query Detail</h3>
          </div>
        </div>

        <div class="col-xl-12 col-lg-12 col-md-12">
          {submitData.map((p, i) => (
            <div class="card" key={i}>
              <div
                class="card-header"
                id="headingOne"
                style={{ padding: ".5rem .1rem" }}
              >
                <h2 class="mb-0 query">
                <button class="btn btn-success ml-3" onClick={() => history.goBack()}>
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <p class="m-0" style={{ fontSize: "15px" }}>
                      Submitted on
                    </p>
                    <p class="m-0" style={{ fontSize: "15px" }}>
                      : {ChangeFormateDate(p.created)}
                    </p>
                  </div>
                  <div class="d-flex">
                    <div class="additional">
                    <button type="button" 
                    class="btn btn-info"
                    onClick={addHandler}
                    >
                      Additional Query
                      </button>
                     
                    </div>
                    
                  </div>
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
                      <th scope="row">Query No</th>
                      <td>{p.assign_no}</td>
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
                        <p>
                          {p.softcopy_word === "1" && "Softcopy - Word/ Pdf"}
                        </p>
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
                    <tr>
                      <th scope="row">Query Status</th>
                      <td>{p.status}</td>
                    </tr>
                    <tr>
                      <th scope="row">Assignment Status</th>
                      <td>
                        <tr>
                          <th>Assignment Stage</th>
                          <th>Status</th>
                        </tr>
                        <tr>
                          <td>Client Discussion</td>
                          <td>{p.client_discussion}</td>
                        </tr>
                        <tr>
                          <td>Draft report</td>
                          <td>{p.draft_report}</td>
                        </tr>
                        <tr>
                          <td>Final Discussion</td>
                          <td>{p.final_discussion}</td>
                        </tr>
                        <tr>
                          <td> Delivery of report</td>
                          <td>{p.draft_report}</td>
                        </tr>
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
                      <th scope="col">Documents</th>
                    </tr>
                  </thead>
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
            </div>
          ))}

          <Modal isOpen={addModal} toggle={addHandler} size="md">
            <ModalHeader toggle={addHandler}>Add. Query</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Additional Queries</label>
                  <textarea
                    className="form-control"
                    id="textarea"
                    rows="6"
                    name="p_addqueri"
                    ref={register}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload Your Document</label>
                  <input
                    type="file"
                    name="p_upload"
                    ref={register}
                    className="form-control-file"
                  />
                </div>

                <div class="modal-footer">
                  <button
                    type="submit"
                    onClick={addHandler}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default MyAssingment;

// <h2 class="mb-0 query">
// <button
//   class="btn btn-link btn-block text-left"
//   type="button"
//   data-toggle="collapse"
//   data-target={`#${i}`}
//   aria-expanded="true"
//   aria-controls="collapseOne"
// >
//   {p.assign_no}
// </button>
// <div style={{display:"flex" , justifyContent:"space-evenly"}}>
//   <p class="m-0" style={{ fontSize: "15px" }}>
//     Submitted on
//   </p>
//   <p class="m-0" style={{ fontSize: "15px" }}>
//    : {p.created}
//   </p>
// </div>
// <div class="d-flex">
//   <div class="additional">
//     <button
//       class="btn"
//       data-toggle="modal"
//       data-target="#staticBackdrop"
//       onClick={addHandler}
//     >
//       Add. Query
//     </button>
//   </div>
//   <div class="complete">
//     <p>Pending</p>
//   </div>
// </div>
// </h2>

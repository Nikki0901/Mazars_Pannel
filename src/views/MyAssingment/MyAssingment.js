import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useParams } from "react-router-dom";
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

  const [addModal, setAddModal] = useState(false);
  const addHandler = () => setAddModal(!addModal);

 
  const { id } = useParams();
  const userId = window.localStorage.getItem("userid");

  useEffect(() => {
    const getSubmittedAssingment = () => {
      axios.get(`${baseUrl}/tl/GetQueryDetails?id=${id}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setSubmitData(res.data.result);
          setAssingmentNo(res.data.result[0].assign_no);
        }
      });
    };
    getQuery();
    getSubmittedAssingment();
  }, [assingNo]);



  const getQuery = () => {
    axios.get(`${baseUrl}/tl/GetAdditionalQueries?assignno=${assingNo}`).then((res) => {
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

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="schedule">
            <h3>Query No</h3>
            <Link to="/customer/select-category" class="btn btn-primary">
              Fresh Assignment
            </Link>
          </div>
          <br />
        </div>

        <div class="col-xl-12 col-lg-12 col-md-12">
          <div class="accordion" id="accordionExample">
            {submitData.map((p, i) => (
              <div class="card" key={i}>
                <div
                  class="card-header"
                  id="headingOne"
                  style={{ padding: ".5rem .1rem" }}
                >
                  <h2 class="mb-0 query">
                    <button
                      class="btn btn-link btn-block text-left"
                      type="button"
                      data-toggle="collapse"
                      data-target={`#${i}`}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      {p.assign_no}
                    </button>
                    <div style={{display:"flex" , justifyContent:"space-evenly"}}>
                      <p class="m-0" style={{ fontSize: "15px" }}>
                        Submitted on
                      </p>
                      <p class="m-0" style={{ fontSize: "15px" }}>
                       : {p.date}
                      </p>
                    </div>
                    <div class="d-flex">
                      <div class="additional">
                        <button
                          class="btn"
                          data-toggle="modal"
                          data-target="#staticBackdrop"
                          onClick={addHandler}
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
                  id={i}
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
                          <th scope="row">Facts of the case</th>
                          <td>{p.fact_case}</td>
                        </tr>
                        <tr>
                          <th scope="row">specific questions</th>
                          <td colspan="1">{p.specific_query}</td>
                        </tr>

                        <tr>
                          <th scope="row">
                            Purpose for which Opinion is sought
                          </th>
                          <td colspan="1">{p.purpose_opinion}</td>
                        </tr>                    
                        <tr>
                          <th scope="row">
                            Format in which Opinion is required
                          </th>
                          <td colspan="1">{p.format_opinion}</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            Timelines within which Opinion is Required
                          </th>
                          <td colspan="1">{p.Timelines}</td>
                        </tr>
                        <tr>
                          <th scope="row">Documents</th>
                          <td>
                            {p.upload_doc}
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
                            <td>{p.upload_doc}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
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
      </div>
    </Layout>
  );
}

export default MyAssingment;

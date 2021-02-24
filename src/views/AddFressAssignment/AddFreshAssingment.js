import React from "react";
import Layout from "../../components/Layout/Layout";
// import "./index.css";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { baseUrl } from "../../config/config";
import * as yup from "yup";
import { useAlert } from "react-alert";



function AddFreshAssingment(props) {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset, control } = useForm();

  // const { append, remove, fields } = useFieldArray({
  //   control,
  //   name: "users",
  // });


  const userId = window.localStorage.getItem("userid");
  const category = window.localStorage.getItem("category");

  const onSubmit = (value) => {
    console.log("value :", value);
  
      let format = {
        "word":value.p_format_word,
        "digital":value.p_format_digital,
        "physical":value.p_format_physically,
      }

    let formData = new FormData();
    formData.append("fact", value.p_fact);
    formData.append("specific", value.p_specific);
    formData.append("upload", value.p_document[0]);
    formData.append("purpose", value.p_purpose);
    formData.append("format", format);
    formData.append("timelines", value.p_timelines);
    formData.append("user", JSON.parse(userId));
    formData.append("cid", JSON.parse(category));

  
    axios({
      method: "POST",
      url: `${baseUrl}/post/user/question`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);  
        if (response.data.code === 1) {
          reset();   
          alert.success("Query successfully added!"); 
          props.history.push("/customer/dashboard");       
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
            <h3>Add Fresh Assignment</h3>
          </div>
          <br />
        </div>
        
        <div class="col-xl-8 col-lg-8 col-md-12">
        
          <form onSubmit={handleSubmit(onSubmit)}>         
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Facts of the case</label>
                <textarea
                  className="form-control"
                  id="textarea"
                  rows="6"
                  name="p_fact"
                  ref={register}
                ></textarea>
              </div>
            </div>

            <div className="col-md-6">
            <div className="mb-3">
            <label className="form-label">Specific Questions</label>
            <input
              type="text"
              className="form-control"
              name="p_specific"
              ref={register}
              placeholder="Enter Purpose"
            />
            </div>
              
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Upload Your Document</label>
                <input
                  type="file"
                  name="p_document"
                  ref={register}
                  className="form-control-file"       
                />
              </div>
            </div>
         
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Purpose for which Opinion is sought
                </label>
                <select
                    className="form-select form-control"
                    name="p_purpose"
                    aria-label="Default select example"
                    ref={register}
                  >
                    <option value="">--select--</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Appeal">Appeal</option>
                    <option value="Internal">Internal records</option>
                    <option value="Production">Production before other Authorities</option>
                    <option value="Others">Others</option>                 
                  </select>            
              </div>
            </div>
           
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Format in which Opinion is required
                </label>
                <br />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="p_format_word"
                    ref={register}
                    value="Softcopy - Word/ Pdf"
                  />
                  <label className="form-check-label">Softcopy - Word/ Pdf</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="p_format_digital"
                    ref={register}
                    value="SoftCopy- Digitally Signed"
                  />
                  <label className="form-check-label">SoftCopy- Digitally Signed</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="p_format_physically"
                    ref={register}
                    value="Printout- Physically Signed"
                  />
                  <label className="form-check-label">Printout- Physically Signed</label>
                </div>

               
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Timelines within which Opinion is Required
                </label>
                <br />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="p_timelines"
                    ref={register}
                    value="Urgent, (4-5 Working Days)"
                    defaultChecked
                  />
                  <label>Urgent, (4-5 Working Days)</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="p_timelines"
                    ref={register}
                    value="Regular (10-12 Working Days)"
                  />
                  <label>Regular (10-12 Working Days)</label>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

         
        </div>
      </div>
    </Layout>
  );
}

export default AddFreshAssingment;

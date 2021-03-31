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

  const { append, remove, fields } = useFieldArray({
    control,
    name: "users",
  });


  const userId = window.localStorage.getItem("userid");
  const category = window.localStorage.getItem("category");


const Msg = () =>{
  return(
    <>
    <p style={{fontSize:"12px"}}>Query successfully added!</p>
    </>
  )
}



  const onSubmit = (value) => {
    console.log("value :", value);
    console.log("value :", Number(value.p_format_word));
    console.log("value :", Number(value.p_format_digital));
    console.log("value :", Number(value.p_format_physically));

   
      let formData = new FormData();
      formData.append("fact", value.p_fact);
      formData.append("specific", JSON.stringify(value.specific));
      formData.append("upload_1", value.p_document1[0]);
      formData.append("upload_2", value.p_document2[0]);
      formData.append("upload_3", value.p_document3[0]);
      formData.append("purpose", value.p_purpose);
      formData.append("timelines", value.p_timelines);
      formData.append("user", JSON.parse(userId));
      formData.append("cid", JSON.parse(category));
      formData.append("softcopy_word",Number(value.p_format_word) );
      formData.append("softcopy_digitally_assigned",Number(value.p_format_digital) );
      formData.append("printout_physically_assigned",Number(value.p_format_physically));

      formData.append("case_name", value.p_case_name);
      formData.append("assessment_year", value.p_assessment_year);

      
      axios.post(`${baseUrl}/customers/PostQuestion`, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            reset();
            alert.success(<Msg />);
            props.history.push("/customer/queries");
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
                <div className="question_query mb-2">
                  <label className="form-label">
                    Specific Query (ies) for advisory
                  </label>
                  <div
                    className="btn btn-primary"
                    onClick={() => append({ query: "" })}
                  >
                    +
                  </div>
                </div>

                {fields.length > 0 &&
                  fields.map((item, index) => (
                    <div className="question_query_field mb-2" key={index}>
                      <input
                        type="text"
                        className="form-control"
                        ref={register}
                        name={`specific[${index}].query`}
                        placeholder="Specify your query"
                      />
                      <div
                        className="btn btn-primary ml-2"
                        onClick={() => remove(index)}
                      >
                        -
                      </div>
                    </div>
                  ))}
                  
              </div>
              

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Case name</label>
                  <input
                    type="text"
                    name="p_case_name"
                    ref={register}
                    className="form-control"                
                  />             
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Assessment year</label>
                  <input
                    type="text"
                    name="p_assessment_year"
                    ref={register}
                    className="form-control"             
                  />             
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Upload Your Document</label>
                  <input
                    type="file"
                    name="p_document1"
                    ref={register}
                    className="form-control-file"                
                  />
                  <input
                    type="file"
                    name="p_document2"
                    ref={register}
                    className="form-control-file"                 
                  />
                  <input
                    type="file"
                    name="p_document3"
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
                    <option value="Production">
                      Production before other Authorities
                    </option>
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
                                 
                    />
                    <label className="form-check-label">
                      Softcopy - Word/ Pdf
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="p_format_digital"
                      ref={register}
                 
                    />
                    <label className="form-check-label">
                      SoftCopy- Digitally Signed
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="p_format_physically"
                      ref={register}
                    />
                    <label className="form-check-label">
                      Printout- Physically Signed
                    </label>
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

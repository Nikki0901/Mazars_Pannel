import React from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";



function AddAssingmentStages() {
  const alert = useAlert();
  const { register, handleSubmit, errors , reset} = useForm();
  const userid = window.localStorage.getItem("tlkey");
  const { id } = useParams();

  const onSubmit = (value) => {
    console.log(value);

    let formData = new FormData();

    // formData.append("user", JSON.parse(userid));
    formData.append("q_id", id);
    formData.append("stage_1_status", value.status_1);
    formData.append("stage_2_status", value.status_2);
    formData.append("stage_3_status", value.status_3);
    formData.append("stage_4_status", value.status_4);
    formData.append("stage_5_status", value.status_5);
 
    axios({
      method: "POST",
      url: `${baseUrl}/post/AssignmentStages`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("Assignment successfully added !");
          reset();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error); 
      });
  };


  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <div class="row mt-3">
        <div class="col-md-12">
          <div>
            <h2>Add Assignment Stages (Max 5)</h2>
          </div>
          <br />

          <div class="col-md-8">
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="row">  
              <div class="col-md-6">      
                  <div class="form-group">
                    <label style={{fontSize:"20px", fontWeight:"500", paddingTop:"30px"}}>
                      Client Discussion</label>
                  </div>
                </div>  
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Status 1</label>
                    <select
                      class="form-control"
                      ref={register}
                      name="status_1"
                      // onChange={(e) => setAssing(e.target.value)}
                    >
                      <option value="">--Select Status--</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
              <div class="col-md-6">  
              <div class="form-group">
              <label style={{fontSize:"20px", fontWeight:"500", paddingTop:"30px"}}>
                      Draft Report</label>
                  </div>
              </div>
                <div class="col-md-6">
                  <div class="form-group">
                  <label>Status 2</label>
                  <select
                      class="form-control"
                      ref={register}
                      name="status_2"
                      // onChange={(e) => setAssing(e.target.value)}
                    >
                      <option value="">--Select Status--</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
              <div class="col-md-6">  
              <div class="form-group">
              <label style={{fontSize:"20px", fontWeight:"500", paddingTop:"30px"}}>
              Final Discussion</label>
                  </div>
            </div>
                <div class="col-md-6">
                  <div class="form-group">
                  <label>Status 3</label>
                  <select
                      class="form-control"
                      ref={register}
                      name="status_3"
                      // onChange={(e) => setAssing(e.target.value)}
                    >
                      <option value="">--Select Status--</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      {/* <option value="notapplicable">Not Applicable</option> */}
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
              
              <div class="col-md-6">  
              <div class="form-group">
              <label style={{fontSize:"20px", fontWeight:"500", paddingTop:"30px"}}>
                   Delivery of report</label>
                  </div>
            </div>
                <div class="col-md-6">
                <div class="form-group">
                <label>Status 4</label>
                <select
                      class="form-control"
                      ref={register}
                      name="status_4"
                      // onChange={(e) => setAssing(e.target.value)}
                    >
                      <option value="">--Select Status--</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                
              </div>

              <div class="row">
              <div class="col-md-6">  
              <div class="form-group">
              <label style={{fontSize:"20px", fontWeight:"500", paddingTop:"30px"}}>
                Others</label>
                  </div>
                    </div>
                <div class="col-md-6">
                <div class="form-group">
                <label>Status 5</label>
                <select
                      class="form-control"
                      ref={register}
                      name="status_5"
                      // onChange={(e) => setAssing(e.target.value)}
                    >
                      <option value="">--Select Status--</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
               
              </div>

              <br />
              <div class="form-group">
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddAssingmentStages;

{
  /* <div class="mb-1">
                <div class="d-flex">
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    placeholder="Add Completion Stage"
                  />
                  <button class="btn btn-primary ml-2">+</button>
                </div>
              </div>
              <div class="mb-1">
                <div class="d-flex">
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    placeholder="Add Completion Stage"
                  />
                  <button class="btn btn-primary ml-2">+</button>
                </div>
              </div> */
}

{
  /* <form onSubmit={handleSubmit(onSubmit)}>
              <div class="col-md-6">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="p_client"
                    ref={register}
                  />
                  <label className="form-check-label">	Client discussion</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="p_draft"
                    ref={register}
                  />
                  <label className="form-check-label">Draft report</label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="p_final"
                    ref={register}
                  />
                  <label className="form-check-label">Final Discussion</label>
                </div>


                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="p_delivery"
                    ref={register}
                  />
                  <label className="form-check-label">Delivery of report</label>
                </div>


                <div class="mb-1">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form> */
}

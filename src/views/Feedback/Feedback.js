import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";


// const Schema = yup.object().shape({
//   p_feedback: yup.string().required("required feedback"),
//   p_assignment: yup.string().required("required assignment"),
// });


function Feedback() {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm(); 


  const [assignment, setAssingment] = useState([]);
  const [teamLeader, setTeamLeader] = useState([]);

  const userId = window.localStorage.getItem("userid");

  useEffect(() => {
    const getAssingment = () => {
      axios.get(`${baseUrl}/customers/getAssignedAssignments?user=${JSON.parse(userId)}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setAssingment(res.data.result);
        }
      });
    };

    getAssingment();
  }, []);


  useEffect(() => {
    getTeamLeader();
  }, []);

  const getTeamLeader = () => {
    axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setTeamLeader(res.data.result);
      }
    });
  };



  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("assign_no", value.p_assignment);
    formData.append("feedback", value.p_feedback);
    formData.append("user_id", JSON.parse(userId));
    formData.append("tl_id", value.p_teamleader);


    axios({
      method: "POST",
      url: `${baseUrl}/customers/PostUserFeedback`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          reset();   
          alert.success(" feedback successfully added!");      
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
          <div class="text-center">
            <h3>Feedback!!!</h3>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div class="col-lg-2 col-xl-2 col-md-12"></div>
        <div class="col-lg-8 col-xl-8 col-md-12">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Assignment No.</label>
                    <select
                      class="form-control"
                      name="p_assignment"
                      ref={register}
                    >
                      <option value="">--select--</option>

                      {assignment.map((p, i) => (
                        <option key={i} value={p.assign_no}>
                          {p.assign_no}
                        </option>
                      ))}
                    </select>
                   
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <label>Select Team Leader</label>
                    <select
                      class="form-control"
                      name="p_teamleader"
                      ref={register}
                    >
                      <option value="">--select--</option>

                      {teamLeader.map((p, i) => (
                        <option key={i} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                   
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <label>Feedback</label>
                    <textarea
                      class="form-control"
                      placeholder="Feedback text here"
                      rows="5"
                      ref={register}
                      name="p_feedback"
                    ></textarea>
                   
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div class="col-lg-2 col-xl-2 col-md-12"></div>
      </div>
    </Layout>
  );
}

export default Feedback;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";


// const Schema = yup.object().shape({
//   p_feedback: yup.string().required("required feedback"),
//   p_assignment: yup.string().required("required assignment"),
// });


function Chatting(props) {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();

  const userId = window.localStorage.getItem("tlkey");
  const [assignment, setAssingment] = useState([]);

  useEffect(() => {
    const getQuery = () => {
      axios.get(`${baseUrl}/tl/getProposalQuery?uid=${JSON.parse(userId)}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setAssingment(res.data.result);
          }
        });
    };
    getQuery();
  }, []);



  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("assign_id", value.p_assignment);
    formData.append("message_type", value.p_sms_type);
    formData.append("message", value.p_message);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/messageSent`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          reset();
          alert.success("message successfully send!");
          props.history.push("/teamleader/message");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userId}>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="text-center">
            <h3>Add Message</h3>
          </div>
        </div>

        <div class="col-lg-2 col-xl-2 col-md-12"></div>
        <div class="col-lg-8 col-xl-8 col-md-12">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="row">

                <div class="col-md-12">
                  <div class="form-group">
                    <label>Query No.</label>
                    <select
                      class="form-control"
                      name="p_assignment"
                      ref={register}
                    >
                      <option value="">--select--</option>
                      {assignment.map((p, i) => (
                        <option key={i} value={p.id}>
                          {p.assign_no}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <label>Message Type</label>
                    <select
                      class="form-control"
                      name="p_sms_type"
                      ref={register}
                    >
                      <option value="">--select--</option>
                      <option value="1">Information</option>
                      <option value="2">Proposal Discussion</option>
                      <option value="3">Assignment Discussion</option>
                    </select>

                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <label>Message</label>
                    <textarea
                      class="form-control"
                      placeholder="Message text here"
                      rows="5"
                      ref={register}
                      name="p_message"
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

export default Chatting;

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


function Chatting(props) {

  console.log("props", props)

  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();

  const userId = window.localStorage.getItem("userid");
  const [assignment, setAssingment] = useState([]);

  const [data, setData] = useState({})

  const { message_type, query_id, query_No, routes } = data

  // const dataItem = props.location.obj
  // const { message_type, query_id, query_No, routes } = dataItem



  useEffect(() => {
    console.log("useEffect", props)
    const dataItem = props.location.obj

    if (dataItem) {
      localStorage.setItem("myDataCust", JSON.stringify(dataItem));
    }

    var myData = localStorage.getItem("myDataCust");
    var data2 = JSON.parse(myData)
    setData(data2)

  }, []);



  useEffect(() => {
    const getQuery = () => {
      axios.get(`${baseUrl}/customers/getAssignedAssignments?user=${JSON.parse(userId)}
      &type=1`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setAssingment(res.data.result);
          }
        });
    };

    getQuery();
  }, []);


  // console.log("data", data)


  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("assign_id", query_id);
    formData.append("message_type", message_type);
    formData.append("message", value.p_message);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/messageSent`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          reset();
          alert.success(" message successfully send!");
          props.history.push(routes);
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
                    <input
                      type="text"
                      name="p_query"
                      className="form-control"
                      ref={register}
                      value={query_No}
                      disabled
                    />
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <label>Message Type</label>
                    <input
                      type="text"
                      name="p_query"
                      className="form-control"
                      ref={register}
                      value={message_type}
                      disabled
                    />

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
    </Layout >
  );
}

export default Chatting;


{/* <select
                    class="form-control"
                    name="p_sms_type"
                    ref={register}
                    value={query_No}
                  >
                    <option value="">--select--</option>
                    <option value="1">Information</option>
                    <option value="2">Proposal Discussion</option>
                    <option value="3">Assignment Discussion</option>
                  </select> */}
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Alerts from "../../common/Alerts";

// const Schema = yup.object().shape({
//   p_feedback: yup.string().required("required feedback"),
//   p_assignment: yup.string().required("required assignment"),
// });


function Feedback() {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();
  const history = useHistory();
  const { id } = useParams();


  const userId = window.localStorage.getItem("userid");



  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("assign_no", id);
    formData.append("feedback", value.p_feedback);
    formData.append("user_id", JSON.parse(userId));
    // formData.append("tl_id", value.p_teamleader);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/PostUserFeedback`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          reset();
          var variable = "Feedback Successfully Sent "
          Alerts.SuccessNormal(variable)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button
                class="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                <ArrowBackIcon />
                Go Back
              </button>
            </Col>
            <Col md="8">
              <h4>Feedback</h4>
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="row" style={{ display: "flex", justifyContent: "center" }}>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Query No.</label>
                  <input
                    type="text"
                    name="p_query"
                    className="form-control"
                    ref={register}
                    value={id}
                    disabled
                  />
                </div>


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
                <button type="submit" className="btn btn-primary">
                  submit
                </button>
              </div>
            </div>

          </form>
        </CardBody>
      </Card>

    </Layout>
  );
}

export default Feedback;


{/* <select
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
                    </select> */}
 // useEffect(() => {
  //   const getAssingment = () => {
  //     axios.get(`${baseUrl}/customers/getAssignedAssignments?user=${JSON.parse(userId)}`).then((res) => {
  //       console.log(res);
  //       if (res.data.code === 1) {
  //         setAssingment(res.data.result);
  //       }
  //     });
  //   };

  //   getAssingment();
  // }, []);

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Tooltip,
} from "reactstrap";
import { useHistory } from "react-router-dom";

// const Schema = yup.object().shape({
//   p_feedback: yup.string().required("required feedback"),
//   p_assignment: yup.string().required("required assignment"),
// });


function Chatting(props) {
  const alert = useAlert();
  const history = useHistory();
  const { handleSubmit, register, errors, reset } = useForm();

  const userId = window.localStorage.getItem("tlkey");
  const [assignment, setAssingment] = useState([]);

  const [data, setData] = useState({})
  const { message_type, query_id, query_No, routes } = data


  useEffect(() => {
    console.log("useEffect", props)
    const dataItem = props.location.obj

    if (dataItem) {
      localStorage.setItem("myDataTL", JSON.stringify(dataItem));
    }

    var myData = localStorage.getItem("myDataTL");
    var data2 = JSON.parse(myData)
    setData(data2)
  }, []);


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
    formData.append("assign_id", query_id);
    formData.append("message_type", value.msg_type);
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
          alert.success("message successfully sent!");
          props.history.push(routes);
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button
                class="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </Col>
            <Col md="8">
              <h4>Message</h4>
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
                    value={query_No}
                    disabled
                  />
                </div>

                <div class="form-group">
                  <label>Message Type</label>
                  <select
                    className="form-select form-control"
                    name="msg_type"
                    ref={register}
                    style={{ height: "33px" }}
                  >
                    <option value="">--select--</option>
                    <option value="4">Query Discussion</option>
                    <option value="2">Proposal Discussion</option>
                    <option value="5">Payment Discussion</option>
                    <option value="3">Assignment Discussion</option>
                    <option value="1">Others</option>
                  </select>
                </div>

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

                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>

          </form>
        </CardBody>

      </Card>
    </Layout>
  );
}

export default Chatting;

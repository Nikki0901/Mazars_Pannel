import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
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

function AddAssingmentStages() {
  const alert = useAlert();
  const { register, handleSubmit, errors, reset } = useForm();
  const userid = window.localStorage.getItem("tlkey");
  const { id } = useParams();
  const history = useHistory();



  const onSubmit = (value) => {
    console.log(value);

    let formData = new FormData();

    // formData.append("user", JSON.parse(userid));
    formData.append("q_id", id);
    formData.append("user_id", JSON.parse(userid));
    formData.append("stage_1_status", value.status_1);
    formData.append("stage_2_status", value.status_2);
    formData.append("stage_3_status", value.status_3);
    formData.append("stage_4_status", value.status_4);
    formData.append("stage_5_status", value.status_5);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/postAssignmentStages`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success(<Msg />);
          reset();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  //alert msg
  const Msg = () => {
    return (
      <>
        <p style={{ fontSize: "10px" }}>Assignment successfully added </p>
      </>
    );
  };
  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
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
              <h4>Assignment Stages</h4>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <div class="row mt-3">
            <div class="col-md-12">
              <div class="col-md-8">
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label
                          style={{
                            fontSize: "20px",
                            fontWeight: "500",
                            paddingTop: "30px",
                          }}
                        >
                            Client Discussion
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <select
                          class="form-control"
                          ref={register}
                          name="status_1"
                          // onChange={(e) => setAssing(e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="notApplicable">Not Applicable</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label
                          style={{
                            fontSize: "20px",
                            fontWeight: "500",
                            paddingTop: "30px",
                          }}
                        >
                          Draft Report
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <select
                          class="form-control"
                          ref={register}
                          name="status_2"
                          // onChange={(e) => setAssing(e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="notApplicable">Not Applicable</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label
                          style={{
                            fontSize: "20px",
                            fontWeight: "500",
                            paddingTop: "30px",
                          }}
                        >
                          Final Discussion
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <select
                          class="form-control"
                          ref={register}
                          name="status_3"
                          // onChange={(e) => setAssing(e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="notApplicable">Not Applicable</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label
                          style={{
                            fontSize: "20px",
                            fontWeight: "500",
                            paddingTop: "30px",
                          }}
                        >
                          Delivery of report
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <select
                          class="form-control"
                          ref={register}
                          name="status_4"
                          // onChange={(e) => setAssing(e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="notApplicable">Not Applicable</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label
                          style={{
                            fontSize: "20px",
                            fontWeight: "500",
                            paddingTop: "30px",
                          }}
                        >
                          Others
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <select
                          class="form-control"
                          ref={register}
                          name="status_5"
                          // onChange={(e) => setAssing(e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="notApplicable">Not Applicable</option>
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
        </CardHeader>
      </Card>
    </Layout>
  );
}

export default AddAssingmentStages;

 // {
        //   Object.keys(obj).map((key, i) => (
        //     console.log(key,i ) 
        //     // setSubmitData(key[0])  
                            
        //   )
        //   )
        // }


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




// const keyValue = (input) => Object.entries(input).forEach(([key,value]) => {
//   console.log(key)
  
// })
// keyValue(res.data.result[0])



  // const [submitData, setSubmitData] = useState({
  //   client_discussion: "",
  //   draft_report: "",
  //   final_discussion: "",
  //   delivery_report: "",
  //   other: "",
  // });

  // const { client_discussion, draft_report, final_discussion,delivery_report } = submitData;
  
  // const [submitData, setSubmitData] = useState({})

  // useEffect(() => {
  //   getAssignmentStages();
  // }, []);

  // const getAssignmentStages = () => {
  //   axios.get(`${baseUrl}/tl/GetQueryDetails?id=34`).then((res) => {
  //     console.log(res);
  //     console.log("check",  res.data.result[0])
  //     if (res.data.code === 1) {
  //       var obj = res.data.result[0]
  //       var arr = []
  //       for (const key in obj) {
  //         console.log(key , " --", obj[key]);
  //           arr.push(key)  
  //       }
  //       console.log(arr)
  //       setSubmitData({
  //         client_discussion:arr[17] ,
  //         draft_report:arr[18] ,
  //         final_discussion:arr[19] ,
  //         delivery_report:arr[20] ,        
  //       });
       
  //     }
  //   });
  // };

  // console.log("setSubmitData ----",submitData)
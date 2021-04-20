import React from "react";
import Layout from "../../../components/Layout/Layout";
import { useHistory } from "react-router-dom";
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
import { useForm } from "react-hook-form";

function AssignmentForm(props) {
  const { handleSubmit, register, errors, reset, setValue } = useForm();
  const history = useHistory();
  const userid = window.localStorage.getItem("tlkey");
  const onSubmit = (value) => {
    console.log("value :", value);
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
              <h4>Client Discussion Form</h4>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="col-lg-8 col-xl-8 col-md-12">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Type</label>
                      <select class="form-control" ref={register} name="type">
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        name="p_dateTo"
                        className="form-control"
                        ref={register}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Notes</label>
                      <textarea
                        className="form-control"
                        id="textarea"
                        rows="2"
                        name="p_fact"
                        ref={register}
                      ></textarea>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Upload Documents</label>
                      <input
                        type="file"
                        name="p_fact"
                        ref={register()}
                        className="form-control-file"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  submit
                </button>
              </div>
            </form>
          </div>
        </CardHeader>
      </Card>
    </Layout>
  );
}

export default AssignmentForm;

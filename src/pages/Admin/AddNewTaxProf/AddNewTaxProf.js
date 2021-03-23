import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

function AddNew() {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();
  const [teamleader, setTeamLeader] = useState([]);
  const userid = window.localStorage.getItem("adminkey");

  const history = useHistory();

  useEffect(() => {
    const getTeamLeader = () => {
      axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTeamLeader(res.data.result);
        }
      });
    };
    getTeamLeader();
  }, []);

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("email", value.p_email);
    formData.append("name", value.p_name);
    formData.append("phone", value.p_phone);
    formData.append("type", "tp");
    formData.append("tp_id", value.p_teamleader);

    axios({
      method: "POST",
      url: `${baseUrl}/tp/AddTaxProfessional`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("TP created  !");
          reset();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <div class="col-md-12 d-flex">
            <div>
              <button
                class="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </div>
            <div class="text-center ml-5">
              <h4>Add New Tax Professionals</h4>
            </div>
          </div>
        </CardHeader>

        <CardHeader>
          <div class="row mt-3">
            <div class="col-lg-2 col-xl-2 col-md-12"></div>
            <div class="col-lg-8 col-xl-8 col-md-12">
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          class="form-control"
                          name="p_name"
                          ref={register}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          class="form-control"
                          name="p_email"
                          ref={register}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          class="form-control"
                          name="p_phone"
                          ref={register}
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Select teamleader</label>
                        <select
                          name="p_teamleader"
                          class="form-control"
                          ref={register}
                        >
                          <option value="">--select--</option>
                          {teamleader.map((p) => (
                            <option key={p.Id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Layout>
  );
}

export default AddNew;

// const Schema = yup.object().shape({
//   p_name: yup.string().required("required name"),
//   p_email: yup.string().email("invalid email").required("required email"),
//   p_phone: yup
//   .string()
//   .required("required phone no")
//   .matches(/^[0-9]+$/, "Must be only digits")
//   .min(10, "Must be exactly 10 digits")
//   .max(20, "max 20 digits"),
// });

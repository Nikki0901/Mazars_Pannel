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
import classNames from "classnames";

const Schema = yup.object().shape({
  p_name: yup.string().required("required name"),
  p_email: yup.string().email("invalid email").required("required email"),
  p_phone: yup
    .string()
    .required("required phone no")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(20, "max 20 digits"),
  p_tax: yup.string().required("required category"),
  p_tax2: yup.string().required("required sub category"),
  p_teamleader: yup.string().required("required sub teamleader"),
});

function AddNew() {
  const alert = useAlert();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [teamleader, setTeamLeader] = useState([]);
  const userid = window.localStorage.getItem("adminkey");

  const history = useHistory();
  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);

  const [store, setStore] = useState("");
  const [store2, setStore2] = useState(null);

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

  useEffect(() => {
    const getCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax(res.data.result);
        }
      });
    };

    getCategory();
  }, []);

  useEffect(() => {
    const getSubCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax2(res.data.result);
        }
      });
    };
    getSubCategory();
  }, [store]);


  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("email", value.p_email);
    formData.append("name", value.p_name);
    formData.append("phone", value.p_phone);
    formData.append("pcat_id", value.p_tax);
    formData.append("cat_id", value.p_tax2);
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
          history.goBack();
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_name,
                        })}
                        name="p_name"
                        ref={register}
                      />
                      {errors.p_name && (
                        <div className="invalid-feedback">
                          {errors.p_name.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_phone,
                        })}
                        name="p_phone"
                        ref={register}
                      />
                      {errors.p_phone && (
                        <div className="invalid-feedback">
                          {errors.p_phone.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email,
                        })}
                        name="p_email"
                        ref={register}
                      />
                      {errors.p_email && (
                        <div className="invalid-feedback">
                          {errors.p_email.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Select teamleader</label>
                      <select
                        name="p_teamleader"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_teamleader,
                        })}
                        ref={register}
                      >
                        <option value="">--select--</option>
                        {teamleader.map((p) => (
                          <option key={p.Id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                      {errors.p_teamleader && (
                        <div className="invalid-feedback">
                          {errors.p_teamleader.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Category</label>
                      <select
                        className={classNames("form-control", {
                          "is-invalid": errors.p_tax,
                        })}
                        name="p_tax"
                        ref={register}
                        onChange={(e) => setStore(e.target.value)}
                      >
                        <option value="">--Select Category--</option>
                        {tax.map((p, index) => (
                          <option key={index} value={p.id}>
                            {p.details}
                          </option>
                        ))}
                      </select>
                      {errors.p_tax && (
                        <div className="invalid-feedback">
                          {errors.p_tax.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Sub Category</label>
                      <select
                        className={classNames("form-control", {
                          "is-invalid": errors.p_tax2,
                        })}
                        name="p_tax2"
                        ref={register}
                        onChange={(e) => setStore2(e.target.value)}
                      >
                        <option value="">--Select Sub-Category--</option>
                        {tax2.map((p, index) => (
                          <option key={index} value={p.id}>
                            {p.details}
                          </option>
                        ))}
                      </select>
                      {errors.p_tax2 && (
                        <div className="invalid-feedback">
                          {errors.p_tax2.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
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

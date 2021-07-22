import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import classNames from "classnames";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Alerts from "../../../common/Alerts";

const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required("required email"),
  password: yup
    .string()
    .required("required password")
    .min(5, "at least 5 digits")
    .max(20, "max 20 digits"),
});

function Login(props) {
  const alert = useAlert();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });
  const [email, setEmail] = useState(null);
  const [isPasswordShow, setPasswordShow] = useState(false);
  const togglePasssword = () => {
    setPasswordShow(!isPasswordShow)
  };

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("id", value.p_email);
    formData.append("password", value.password);
    formData.append("type", "tp");

    axios({
      method: "POST",
      url: `${baseUrl}/tp/login`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          Alerts.SuccessLogin()
          localStorage.setItem(
            "tpkey",
            JSON.stringify(response.data["user id"])
          );
          props.history.push("/taxprofessional/dashboard");
        } else if (response.data.code === 0) {
          console.log(response.data.result);
          Alerts.ErrorLogin()
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const handleChange = (e) => {
    console.log("val-", e.target.value);
    setEmail(e.target.value);
  };
  return (
    <>
      <Header mtp="mtp" />
      <div className="container">
        <div className="form">
          <div className="heading">
            <h2>MTP Login</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_email,
                    })}
                    name="p_email"
                    ref={register}
                    placeholder="Enter Email"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.p_email && (
                    <div className="invalid-feedback">
                      {errors.p_email.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type={isPasswordShow ? "text" : "password"}
                    className={classNames("form-control", {
                      "is-invalid": errors.password,
                    })}
                    name="password"
                    placeholder="Enter Password"
                    ref={register}
                  />
                  <i
                    className={`fa ${isPasswordShow ? "fa-eye-slash" : "fa-eye"} password-icon`}
                    onClick={togglePasssword}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Link
                to={{
                  pathname: "/taxprofessional/forget-password",
                  email: `${email}`,
                }}
              >
                Forgot Password
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;

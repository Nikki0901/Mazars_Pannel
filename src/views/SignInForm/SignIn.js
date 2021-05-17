import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Swal from "sweetalert2";
import { Spinner } from "reactstrap";

const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required("required email"),
  p_password: yup.string().required("required password"),
});

function SignIn(props) {
  const alert = useAlert();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });
  const [load, setLoad] = useState(false);

  const onSubmit = (value) => {
    console.log("value :", value);

    setLoad(true);

    let formData = new FormData();
    formData.append("user_id", value.p_email);
    formData.append("password", value.p_password);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/login`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("Login successfully !");
          localStorage.setItem("userid", JSON.stringify(response.data.user_id));
          localStorage.setItem("name", JSON.stringify(response.data.name));
          props.history.push("/customer/dashboard");
        } else if (response.data.code === 0) {
          console.log(response.data.result);
          setLoad(false);
          Swal.fire(
            "Oops...",
            "Errorr : Incorrect Email and password",
            "error"
          );
          // Swal.fire(`oops : ${response.data.result}`)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <>
      <Header cust_sign="cust_sign" />
      <div className="container">
        <div className="form">
          <div className="heading">
            <h2>Customer Login</h2>
          </div>

          {load ? (
            <Spinner size="sm" color="primary" />
          ) : (
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
                      type="password"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_password,
                      })}
                      name="p_password"
                      placeholder="Enter Password"
                      ref={register}
                    />
                    {errors.p_password && (
                      <div className="invalid-feedback">
                        {errors.p_password.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>

              <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <Link to={`/customer/forget-password`}>Forgot Password</Link>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SignIn;

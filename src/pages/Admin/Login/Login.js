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
import Loader from "react-loader-spinner";

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
  const [loading, setLoading] = useState(false);

  const onSubmit = (value) => {
    setLoading(true);
    console.log("value :", value);

    let formData = new FormData();
    formData.append("userid", value.p_email);
    formData.append("password", value.password);

    axios({
      method: "POST",
      url: `${baseUrl}/admin/login`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("Login successfully !");
          localStorage.setItem(
            "adminkey",
            JSON.stringify(response.data["user id"])
          );
          setLoading(false);
          props.history.push("/admin/dashboard");
        } else if (response.data.code === 0) {
          console.log(response.data.result);
          setLoading(false);
          Swal.fire('Oops...',"Errorr : Incorrect Email and password",'error')
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <>
      <Header admin="admin" />
      <div class="container">
        <div class="form">
          <div class="heading">
            <h2>ADMIN LOGIN</h2>
          </div>
          {loading ? (
            <div style={{display: 'flex', justifyContent: 'center'}}><Loader type="Circles" color="#00BFFF" height={60} width={60}/></div>
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
                      "is-invalid": errors.password,
                    })}
                    name="password"
                    placeholder="Enter Password"
                    ref={register}
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
          </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;

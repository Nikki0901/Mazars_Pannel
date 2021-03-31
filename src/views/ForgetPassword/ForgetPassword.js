import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import NewPassword from "../NewPassword/NewPassword";

const Schema = yup.object().shape({
  p_name: yup.string().required("required user id"),
  p_email: yup.string().email("invalid email").required("required email"),
});

function ForgetPassword(props) {
  const alert = useAlert();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [error, setError] = useState("");

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("user_id", value.p_name);
    formData.append("email", value.p_email);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/forgototp`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("otp send your email !");
          props.history.push("/customer/new-password");
        } else if (response.data.code === 0) {
          console.log(response.data.result);
          setError(response.data.result);
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
          <p className="error">{error && error}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">User Id</label>
              <input
                type="text"
                className="form-control"
                name="p_name"
                ref={register}
                placeholder="Enter user id"
              />
              <p className="error">{errors.p_name && errors.p_name.message}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                name="p_email"
                ref={register}
                placeholder="Enter Email"
              />
              <p className="error">
                {errors.p_email && errors.p_email.message}
              </p>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ForgetPassword;

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import Layout from "../../components/Layout/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Schema = yup.object().shape({
  p_name: yup.string().required("required user id"),
  p_password: yup.string().required("required password"),
  p_confirm_password: yup.string().required("required confirm password"),
});

function ChangePassword(props) {
  const userId = window.localStorage.getItem("userid");

  const alert = useAlert();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [error, setError] = useState("");
  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("id", JSON.parse(userId));
    formData.append("user_id", value.p_name);
    formData.append("password", value.password);
    formData.append("rpassword", value.confirm_password);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/passChange`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("change password successfully!");
          reset();
        } else if (response.data.code === 0) {
          console.log(response.data.result);
          setError(response.data.result);
          reset();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <div className="container">
        <div className="form">
        <div className="heading">
            <h2>Change Password</h2>
          </div>
        <p className="error">{error && error}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="mb-3">
                <label className="form-label">User Id</label>
                <input
                  type="text"
                  className="form-control"
                  name="p_name"
                  ref={register}
                  placeholder="Enter user id"
                />
                 <p className="error">
                  {errors.p_name && errors.p_name.message}
                </p>
              </div>

              <label className="form-label">New Password</label>
              <input
                type="text"
                id="password"
                className="form-control"
                placeholder="Enter Your Password"
                name="p_password"
                ref={register}
              />
               <p className="error">
                  {errors.p_password && errors.p_password.message}
                </p>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="text"
                id="password"
                className="form-control"
                placeholder="Confirm Password"
                name="p_confirm_password"
                ref={register}
              />
               <p className="error">
                  {errors.p_confirm_password && errors.p_confirm_password.message}
                </p>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ChangePassword;

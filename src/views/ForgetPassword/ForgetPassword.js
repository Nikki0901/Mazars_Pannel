import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";

function ForgetPassword() {
  //   const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();

  const onSubmit = (value) => {
    console.log("value :", value);

  };

  return (
    <>
      <Header cust_sign="cust_sign" />
      <div className="container">
        <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              name="p_email"
              ref={register}
              placeholder="Enter Email"
            />
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

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";

function NewPassword() {
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
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="text"
                id="password"
                className="form-control"
                placeholder="Enter Your Password"
                name="password"
                ref={register({
                  required: "This field is required",
                  pattern: {
                    value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                    message:
                      "UpperCase, LowerCase, Number/SpecialChar and min 8 Chars",
                  },
                })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="text"
                id="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirm_password"
                ref={register}
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

export default NewPassword;

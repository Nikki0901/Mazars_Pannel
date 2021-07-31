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
import Mandatory from "../../../components/Common/Mandatory";
import VerifyOtpLogin from "./VerifyOtpLogin";

const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required("mandatory"),
  password: yup
    .string()
    .required("mandatory")
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
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState('')

  const togglePasssword = () => {
    setPasswordShow(!isPasswordShow)
  };

  const onSubmit = (value) => {
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
          setShow(true)
          Alerts.SuccessNormal("OTP sent to your email address.")
          setUid(response.data["user id"])       
        } else if (response.data.code === 0) {
          Alerts.ErrorNormal("Invalid email or password.")
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
      <Header admin="admin" />
      <div class="container">

        {
          show ? <div>
            <VerifyOtpLogin email={email} uid={uid}/>
          </div>
            :
            <div class="form">
              <div class="heading">
                <h2>ADMIN LOGIN</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Email<span className="declined">*</span></label>
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
                      <label className="form-label">Password<span className="declined">*</span></label>
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

                {/* <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Link
                to={{
                  pathname: "/admin/forget-password",
                  email: `${email}`,
                }}
              >
                Forgot Password
              </Link>
            </div> */}

                <Mandatory />
              </form>
            </div>
        }


      </div>
      <Footer />
    </>
  );
}

export default Login;

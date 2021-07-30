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
import { Spinner } from "reactstrap";
import Alerts from "../../common/Alerts";
import VerifyOtpLogin from "../VrerifyOtpLogin/VerifyOtpLogin";



const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required("mandatory"),
  p_password: yup.string().required("mandatory"),
});


function SignIn(props) {
  const alert = useAlert();
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState(null);
  const [show, setShow] = useState(false);


  const [isPasswordShow, setPasswordShow] = useState(false);
  const togglePasssword = () => {
    setPasswordShow(!isPasswordShow)
  };


  const onSubmit = (value) => {
    console.log("value :", value);

    // setLoad(true);

    // let formData = new FormData();
    // formData.append("user_id", value.p_email);
    // formData.append("password", value.p_password);

    // axios({
    //   method: "POST",
    //   url: `${baseUrl}/customers/login`,
    //   data: formData,
    // })
    //   .then(function (response) {
    //     console.log("res-", response);
    //     console.log("otp-", response.data["otp "]);

    //     if (response.data.code === 1) {

    //       localStorage.setItem("email", JSON.stringify(value.p_email))
    //       localStorage.setItem("uid", JSON.stringify(response.data.user_id))

    //       setShow(true)
    //       // Alerts.SuccessLogin()
    //       // localStorage.setItem("userid", JSON.stringify(response.data.user_id));
    //       // localStorage.setItem("name", JSON.stringify(response.data.name));

    //       // props.history.push("/customer/otp");
    //     } else if (response.data.code === 0) {
    //       console.log(response.data.result);
    //       setLoad(false);
    //       Alerts.ErrorLogin()
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("erroror - ", error);
    //   });
  };

  const handleChange = (e) => {
    console.log("val-", e.target.value);
    setEmail(e.target.value);
  };


  return (
    <>
      <Header cust_sign="cust_sign" />
      <div className="container">

        {
          show ? <div>
            <VerifyOtpLogin />
          </div>
            :
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
                        <label className="form-label">Email *</label>
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
                        <label className="form-label">Password *</label>
                        <input
                          type={isPasswordShow ? "text" : "password"}
                          className={classNames("form-control", {
                            "is-invalid": errors.p_password,
                          })}
                          name="p_password"
                          placeholder="Enter Password"
                          ref={register}
                        />
                        <i
                          className={`fa ${isPasswordShow ? "fa-eye-slash" : "fa-eye"} password-icon`}
                          onClick={togglePasssword}
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
                    <Link
                      to={{
                        pathname: "/customer/forget-password",
                        email: `${email}`,
                      }}
                    >
                      Forgot Password
                    </Link>
                  </div>
                </form>
              )}
            </div>

        }


      </div>

      <Footer />
    </>
  );
}

export default SignIn;



// <Link
//   to={{
//     pathname: "/customer/forget-password",
//     email: `${email}`,
//   }}
// >
//   Forgot Password
// </Link>;

{
  /* <Link 
                to={`/customer/forget-password`}
                >Forgot Password</Link> */
}

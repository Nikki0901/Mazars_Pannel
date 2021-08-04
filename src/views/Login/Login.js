import { useRef, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import { Button, Typography } from "@material-ui/core";
import './style.css';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../../config/config";
import VerifyOTP from "./VerifyOTP";
import classNames from "classnames";
import Alerts from "../../common/Alerts";
import Mandatory from "../../components/Common/Mandatory";



const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required(""),
  p_password: yup.string().required(""),
});


function LoginForm() {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [uid, setUid] = useState('')

  const [time, setTime] = useState('');
  const [disabled, setDisabled] = useState(false)
  const [load, setLoad] = useState(false);

  const [isPasswordShow, setPasswordShow] = useState(false);
  const togglePasssword = () => {
    setPasswordShow(!isPasswordShow)
  };


  useEffect(() => {
    getTime()
  }, [load]);

  const getTime = () => {
    // console.log("get time")
    if (load) {
      var timerOn = true;
      function timer(remaining) {
        var s = remaining % 60;
        s = s < 10 ? '0' + s : s;
        setTime(s)
        remaining -= 1;
        if (remaining >= 0 && timerOn) {
          setTimeout(function () {
            timer(remaining);
          }, 1000);
          return;
        }
        setDisabled(true)
      }
      timer(60);
    }
  }



  const onSubmit = (value) => {
    console.log("value :", value);

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
          Alerts.SuccessNormal("As per your request , OTP has been sent to your email address.")
          setShow(true)
          setLoad(true)
          setUid(response.data.user_id)
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
       <Header cust_sign="cust_sign" />

<h1 style={{ "textAlign": "center", "margin": "55px 0 30px 0" }}>
  Would you like to post a query
</h1>

<div className="StartPage">
  <div className="mainContent">
    <div className="signIn">
      <div className="signBtn">
        <div className="boxOverlay">
        <Typography variant="h4" style={{ "margin": "5px auto" }}>
        For new customers
      </Typography>
          <Button color="primary" variant="contained">
            <Link className="SignUpLink"
              to={{
                pathname: "/customer/signup",
              }}
            >
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </div>
    <div className="signUp">
      <Typography variant="h4" style={{ "margin": "5px auto" }}>
        For existing customers
      </Typography>
      {
        show ? <div className="customForm">
          
          <VerifyOTP email={email} uid={uid} time={time} setLoad={setLoad}
            setDisabled={setDisabled} disabled={disabled} />
        </div>
          :
<div className="customForm">
     <form onSubmit={handleSubmit(onSubmit)} className="signInForm">
            <div className="form-group">
              <label className="form-label">Email <span className="declined">*</span></label>
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
            </div>

            <div className="form-group">
              <label className="form-label">Password <span className="declined">*</span></label>
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
                className={`fa ${isPasswordShow ? "fa-eye-slash" : "fa-eye"} password-icon-login`}
                onClick={togglePasssword}
              />
<div style={{ display: "flex",  justifyContent : "flex-end" }}>
              <Link
                to={{
                  pathname: "/customer/forget-password",
                  email: `${email}`,
                }}
              >
                Forgot Password
              </Link>
            </div>
            </div>
            <div className="form-group">
            <Button type="submit">
              Login
            </Button>
            </div>

           
          
    </form>
</div>
        
      }
       <Mandatory />
    </div>
 
   
  </div>
 
</div>
<Footer />
</>
  );
}

export default LoginForm;




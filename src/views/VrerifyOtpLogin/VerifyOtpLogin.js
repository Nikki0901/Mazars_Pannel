import React, { useEffect, useState } from 'react'
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer'
import axios from 'axios'
import { baseUrl } from "../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";

const Schema = yup.object().shape({
  p_otp: yup.string().required("required otp"),
});



function VerifyOtp(props) {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(Schema),
  });
  const [time, setTime] = useState('')
  const [disabled, setDisabled] = useState(false)
  // const [uid, setUid] = useState('')
  // const [otp, setOtp] = useState('')



  useEffect(() => {
    console.log("call useEffect")

    var timerOn = true;
    function timer(remaining) {
      // var m = Math.floor(remaining / 60);
      var s = remaining % 60;

      // m = m < 10 ? '0' + m : m;
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
  }, []);



  const onSubmit = (value) => {
    console.log("value :", value);

    var myemail = localStorage.getItem("email");

    let formData = new FormData();
    formData.append("email", JSON.parse(myemail));
    formData.append("otp", value.p_otp);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/verifyloginotp`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        console.log("res-", response.data["otp "]);

        if (response.data.code == 1) {


          localStorage.setItem("userid", JSON.stringify(response.data.user_id));
          localStorage.setItem("name", JSON.stringify(response.data.name));
          props.history.push("/customer/dashboard");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  }


  const resendOtp = () => {
    props.history.push("/customer/signin");

    var email = localStorage.getItem("email");
    var uid = localStorage.getItem("uid");


    let formData = new FormData();
    formData.append("email", email);
    formData.append("uid", uid);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/regenrateotp`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code == 1) {
          setDisabled(true)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });

  }


  // console.log("otp-", otp);

  return (
    <>
      <Header loginOTP="loginOTP" />
      <div class="container">
        <div class="otp">
          <div class="heading text-center">
            <h2>Verify Your OTP</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              disabled ?
                null
                :
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="otp"
                    placeholder="Enter Your OTP Here"
                    ref={register}
                    name="p_otp"
                  />

                  <small class="text-center">
                    Note: OTP is valid for {time} seconds.
                  </small>
                </div>
            }

            <div class="text-center">

              {
                disabled ?
                  <button type="submit" class="btn btn-success" onClick={resendOtp}>RESEND OTP</button>
                  :
                  <button type="submit" class="btn btn-primary">VERIFY OTP</button>
              }
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default VerifyOtp;

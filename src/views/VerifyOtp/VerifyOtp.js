import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer'
import axios from 'axios'
import { baseUrl } from "../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


// const Schema = yup.object().shape({
//   p_otp: yup.string().required("required otp"),
// });


function VerifyOtp(props) {

  const { handleSubmit, register, errors } = useForm();

  const [time, setTime] = useState('')
  const [disabled, setDisabled] = useState(false)


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

    let formData = new FormData();
    formData.append("otp", value.p_otp);

    axios({
      method: "POST",
      url: `${baseUrl}/auth/validateOTP`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          props.history.push("/customer/questionnaire-page");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  }

  const resendOtp = () => {
    console.log("resend otp")
    // props.history.push("/customer/signup");
  }


  return (
    <>
      <Header noSign="noSign" />
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

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from "../../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import Alerts from "../../../common/Alerts";
import Mandatory from "../../../components/Common/Mandatory";


const Schema = yup.object().shape({
  p_otp: yup.string().required(""),
});


function VerifyOtp({ email, uid }) {
  console.log("email :", email);
  console.log("uid :", uid);


  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(Schema),
  });
  const history = useHistory();
  const [time, setTime] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [num, changeNum] = useState(false);


  useEffect(() => {
    console.log("call useEffect button")
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
  }, [num]);

  useEffect(() => {
    console.log("call useEffect")
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
  }, []);

  const validOtp = (e) => {
    if (isNaN(e.target.value)) {
      Alerts.ErrorNormal("Please enter number only")
    }
  }



  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("email", email);
    formData.append("otp", value.p_otp);

    axios({
      method: "POST",
      url: `${baseUrl}/admin/verifyloginotp`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        console.log("res-", response.data["otp "]);

        if (response.data.code == 1) {
          Alerts.SuccessLogin()
          localStorage.setItem(
            "adminkey",
            JSON.stringify(response.data["user id"])
          );
          history.push("/admin/dashboard");

        } else {
          Alerts.ErrorNormal("Incorrect OTP")
          reset();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  }


  const resendOtp = () => {
    changeNum(true)
    let formData = new FormData();
    formData.append("email", email);
    formData.append("uid", uid);

    axios({
      method: "POST",
      url: `${baseUrl}/admin/regenrateotp`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          Alerts.SuccessNormal("An OTP sent to your mail")
          setDisabled(false)
        }
        else if (response.data.code === 0) {
          Alerts.ErrorNormal("Some thing went wrong, please try again")
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  }



  return (
    <>

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
                  <label className="form-label">Enter OTP <span className="declined">*</span></label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_otp,
                    })}
                    id="otp"
                    placeholder="Enter Your OTP Here"
                    ref={register}
                    name="p_otp"
                    onChange={(e) => validOtp(e)}
                  />
                  {errors.p_otp && (
                    <div className="invalid-feedback">
                      {errors.p_otp.message}
                    </div>
                  )}
                  <small class="text-center">
                    Note: OTP is valid for {time} seconds.
                  </small>
                  <Mandatory />
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

    </>
  );
}

export default VerifyOtp;

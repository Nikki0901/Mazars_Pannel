import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Alerts from "../../../common/Alerts";
import ResendOtp from "./ResendOtp";



function NewPassword(props) {
  const alert = useAlert();
  const { register, handleSubmit, errors, getValues, reset } = useForm();
  const { id } = useParams();

  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isPasswordShow2, setPasswordShow2] = useState(false);

  const [time, setTime] = useState('')
  const [disabled, setDisabled] = useState(false)

  const togglePasssword = () => {
    setPasswordShow(!isPasswordShow)
  };

  const togglePasssword2 = () => {
    setPasswordShow2(!isPasswordShow2)
  };


  useEffect(() => {
    getTime()
  }, []);


  const getTime = () => {
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


  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("email", value.p_email);
    formData.append("password", value.p_password);
    formData.append("rpassword", value.p_confirm_password);
    formData.append("otp", value.p_code);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/resetpassword`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          var variable = "Reset Password Successfully "
          Alerts.SuccessNormal(variable)
          reset();
          props.history.push("/teamleader/login");
        } else if (response.data.code === 0) {
          console.log(response.data.result);
          Swal.fire("Oops...", "Errorr : " + response.data.result, "error");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <>
      <Header mtl="mtl" />
      <div className="container">
        <div className="form">

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="heading">
              <h2>Reset Password</h2>
            </div>
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
                    placeholder="Enter Email"
                    defaultValue={id}
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter valid email address",
                      },
                    })}
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
                  <label className="form-label">New Password<span className="declined">*</span></label>
                  <input
                    type={isPasswordShow ? "text" : "password"}
                    name="p_password"
                    id="password"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_password,
                    })}
                    placeholder="Enter Your Password"
                    autocomplete="off"
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                        message:
                          "UpperCase, LowerCase, Number,SpecialChar and min 8 Chars",
                      },
                    })}
                    onPaste={((e) => {
                      e.preventDefault();
                      return false;
                    })}
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

              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Confirm Password<span className="declined">*</span></label>
                  <input
                    type={isPasswordShow2 ? "text" : "password"}
                    id="password"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_confirm_password,
                    })}
                    placeholder="Confirm Password"
                    name="p_confirm_password"
                    autocomplete="off"
                    ref={register({
                      required: true,
                      validate: (value) =>
                        value === getValues("p_password") ||
                        "password doesn 't match",
                    })}
                    onPaste={((e) => {
                      e.preventDefault();
                      return false;
                    })}
                  />
                  <i
                    className={`fa ${isPasswordShow2 ? "fa-eye-slash" : "fa-eye"} password-icon`}
                    onClick={togglePasssword2}
                  />
                  {errors.p_confirm_password && (
                    <div className="invalid-feedback">
                      {errors.p_confirm_password.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">OTP<span className="declined">*</span></label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_code,
                    })}
                    name="p_code"
                    placeholder="Enter OTP"
                    autocomplete="off"
                    ref={register({ required: true })}
                  />
                  {errors.p_code && (
                    <div className="invalid-feedback">
                      {errors.p_code.message}
                    </div>
                  )}
                  <small class="text-center">
                    Note: OTP is valid for {time} seconds.
                  </small>
                </div>
              </div>
            </div>
            {
              disabled ?
                <button type="submit" className="btn btn-primary" disabled>
                  Submit
                </button>
                :
                <button type="submit" className="btn btn-primary" >
                  Submit
                </button>
            }
          </form>

          {
            disabled ?
              <ResendOtp id={id} setDisabled={setDisabled} getTime={getTime} />
              :
              null
          }

          <span className="declined">*Mandatory</span>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default NewPassword;






// import { useForm } from "react-hook-form";
// import React, { useState, useEffect } from "react";
// import Header from "../../../components/Header/Header";
// import Footer from "../../../components/Footer/Footer";
// import axios from "axios";
// import { baseUrl } from "../../../config/config";
// import { useAlert } from "react-alert";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import classNames from "classnames";
// import Swal from "sweetalert2";
// import { useParams } from "react-router-dom";


// function NewPassword(props) {
//   const alert = useAlert();
//   const { register, handleSubmit, errors, getValues, reset } = useForm();
//   const { id } = useParams();

//   const onSubmit = (value) => {
//     console.log("value :", value);

//     let formData = new FormData();
//     // formData.append("user_id", value.p_name);
//     formData.append("email", value.p_email);
//     formData.append("code", value.p_code);
//     formData.append("password", value.p_password);
//     formData.append("rpassword", value.p_confirm_password);

//     axios({
//       method: "POST",
//       url: `${baseUrl}/customers/resetpassword`,
//       data: formData,
//     })
//       .then(function (response) {
//         console.log("res-", response);
//         if (response.data.code === 1) {
//           alert.success("reset password successfully!");
//           reset();
//           props.history.push("/teamleader/login");
//         } else if (response.data.code === 0) {
//           console.log(response.data.result);
//           // alert.error(response.data.result);
//           Swal.fire("Oops...", "Errorr : " + response.data.result, "error");
//         }
//       })
//       .catch((error) => {
//         console.log("erroror - ", error);
//       });
//   };

//   return (
//     <>
//       <Header mtl="mtl"/>
//       <div className="container">
//         <div className="form">
//           <div className="heading">
//             <h2>Reset Password</h2>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="form-group">

//               <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <input
//                   type="text"
//                   className={classNames("form-control", {
//                     "is-invalid": errors.p_email,
//                   })}
//                   name="p_email"
//                   placeholder="Enter Email"
//                   defaultValue={id}
//                   ref={register({
//                     required: "This field is required",
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: "Please enter valid email address",
//                     },
//                   })}
//                 />
//                 {errors.p_email && (
//                   <div className="invalid-feedback">
//                     {errors.p_email.message}
//                   </div>
//                 )}
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">OTP</label>
//                 <input
//                   type="text"
//                   className={classNames("form-control", {
//                     "is-invalid": errors.p_code,
//                   })}
//                   name="p_code"
//                   placeholder="Enter otp"
//                   ref={register({
//                     required: "This field is required",
//                   })}
//                 />
//                 {errors.p_code && (
//                   <div className="invalid-feedback">
//                     {errors.p_code.message}
//                   </div>
//                 )}
//               </div>
//               <label className="form-label">New Password</label>
//               <input
//                 type="text"
//                 id="password"
//                 className={classNames("form-control", {
//                   "is-invalid": errors.p_password,
//                 })}
//                 placeholder="Enter Your Password"
//                 name="p_password"
//                 ref={register({
//                   required: "This field is required",
//                   pattern: {
//                     value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
//                     message:
//                       "UpperCase, LowerCase, Number/SpecialChar and min 8 Chars",
//                   },
//                 })}
//               />
//               {errors.p_password && (
//                 <div className="invalid-feedback">
//                   {errors.p_password.message}
//                 </div>
//               )}
//             </div>

//             <div className="form-group">
//               <label className="form-label">Confirm Password</label>
//               <input
//                 type="text"
//                 id="password"
//                 className={classNames("form-control", {
//                   "is-invalid": errors.p_confirm_password,
//                 })}
//                 placeholder="Confirm Password"
//                 name="p_confirm_password"
//                 ref={register({
//                   required: "This field is required",
//                   validate: (value) =>
//                     value === getValues("p_password") ||
//                     "password doesn 't match",
//                 })}
//               />
//               {errors.p_confirm_password && (
//                 <div className="invalid-feedback">
//                   {errors.p_confirm_password.message}
//                 </div>
//               )}
//             </div>

//             <button type="submit" className="btn btn-primary">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default NewPassword;


import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import axios from "axios";
import {Link} from 'react-router-dom';
import {Button } from '@material-ui/core';
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import Layout from "../../components/Layout/Layout";
import classNames from "classnames";
import Swal from "sweetalert2";
import Alerts from "../../common/Alerts";

// const Schema = yup.object().shape({
//   p_name: yup.string().required("required user id"),
//   p_password: yup.string().required("required password"),
//   p_confirm_password: yup.string().required("required confirm password"),
// });

function ChangePassword(props) {
  const userId = window.localStorage.getItem("userid");

  const alert = useAlert();
  // const { handleSubmit, register, reset, errors } = useForm({
  //   resolver: yupResolver(Schema),
  // });

  const { register, handleSubmit, errors, getValues, reset } = useForm();

  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isPasswordShow2, setPasswordShow2] = useState(false);


  const togglePasssword = () => {
    setPasswordShow(!isPasswordShow)
  };

  const togglePasssword2 = () => {
    setPasswordShow2(!isPasswordShow2)
  };


  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("id", JSON.parse(userId));
    formData.append("user_id", value.p_email);
    formData.append("password", value.p_password);
    formData.append("rpassword", value.p_confirm_password);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/passChange`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {

          var variable = "Change Password Successfully"
          Alerts.SuccessNormal(variable)
          reset();
        } else if (response.data.code === 0) {
          console.log(response.data.result);

          Swal.fire("Oops...", "Errorr : " + response.data.result, "error");
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Email </label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_email,
                    })}
                    name="p_email"
                    placeholder="Enter email id"
                    ref={register({
                      required: "This field is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter valid email address",
                      },
                    })}
                  />
                  {errors.p_email && (
                    <div className="invalid-feedback">
                      {errors.p_email.message}{" "}
                    </div>
                  )}
                </div>
              </div>


              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type={isPasswordShow ? "text" : "password"}
                    id="password"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_password,
                    })}
                    onPaste={((e) => {
                      e.preventDefault();
                      return false;
                    })}
                    placeholder="Enter Your Password"
                    name="p_password"
                    ref={register({
                      required: "This field is required",
                      pattern: {
                        value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                        message:
                          "UpperCase, LowerCase, Number/SpecialChar and min 8 Chars",
                      },
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
                  <label className="form-label">Confirm Password</label>
                  <input
                 onPaste={((e) => {
                  e.preventDefault();
                  return false;
                })}
                    type={isPasswordShow2 ? "text" : "password"}
                    id="password"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_confirm_password,
                    })}
                    placeholder="Confirm Password"
                    name="p_confirm_password"
                    ref={register({
                      required: "This field is required",
                      validate: (value) =>
                        value === getValues("p_password") ||
                        "password doesn 't match",
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
            </div>


            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
             <Link to="/customer/dashboard" style={{"margin" :"10px"}}>
             <Button type="submit" variant="contained" color="secondary">
             Cancle
            </Button>
             </Link>
             
             
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ChangePassword;


// import { useForm } from "react-hook-form";
// import React, { useState, useEffect } from "react";
// import "../../assets/css/style.css";
// import "../../assets/css/media.css";
// import axios from "axios";
// import { baseUrl } from "../../config/config";
// import { useAlert } from "react-alert";
// import Layout from "../../components/Layout/Layout";
// import classNames from "classnames";
// import Swal from "sweetalert2";
// import Alerts from "../../common/Alerts";


// function ChangePassword(props) {
//   const userId = window.localStorage.getItem("userid");

//   const alert = useAlert();
//   // const { handleSubmit, register, reset, errors } = useForm({
//   //   resolver: yupResolver(Schema),
//   // });

//   const { register, handleSubmit, errors, getValues, reset } = useForm();

//   const [isPasswordShow, setPasswordShow] = useState(false);
//   const [isPasswordShow2, setPasswordShow2] = useState(false);


//   const togglePasssword = () => {
//     setPasswordShow(!isPasswordShow)
//   };

//   const togglePasssword2 = () => {
//     setPasswordShow2(!isPasswordShow2)
//   };


//   const onSubmit = (value) => {
//     console.log("value :", value);

//     let formData = new FormData();
//     formData.append("id", JSON.parse(userId));
//     formData.append("user_id", value.p_email);
//     formData.append("password", value.p_password);
//     formData.append("rpassword", value.p_confirm_password);

//     axios({
//       method: "POST",
//       url: `${baseUrl}/customers/passChange`,
//       data: formData,
//     })
//       .then(function (response) {
//         console.log("res-", response);
//         if (response.data.code === 1) {

//           var variable = "Change Password Successfully"
//           Alerts.SuccessNormal(variable)
//           reset();
//         } else if (response.data.code === 0) {
//           console.log(response.data.result);

//           Swal.fire("Oops...", "Errorr : " + response.data.result, "error");
//           reset();
//         }
//       })
//       .catch((error) => {
//         console.log("erroror - ", error);
//       });
//   };

//   return (
//     <Layout custDashboard="custDashboard" custUserId={userId}>
//       <div className="container">
//         <div className="form">
//           <div className="heading">
//             <h2>Change Password</h2>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="mb-3">
//                   <label className="form-label">Email </label>
//                   <input
//                     type="text"
//                     className={classNames("form-control", {
//                       "is-invalid": errors.p_email,
//                     })}
//                     name="p_email"
//                     placeholder="Enter email id"
//                     ref={register({
//                       required: "This field is required",
//                       pattern: {
//                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                         message: "Please enter valid email address",
//                       },
//                     })}
//                   />
//                   {errors.p_email && (
//                     <div className="invalid-feedback">
//                       {errors.p_email.message}{" "}
//                     </div>
//                   )}
//                 </div>
//               </div>


//               <div className="col-md-12">
//                 <div className="mb-3">
//                   <label className="form-label">New Password</label>
//                   <input
//                     type={isPasswordShow ? "text" : "password"}
//                     id="password"
//                     className={classNames("form-control", {
//                       "is-invalid": errors.p_password,
//                     })}
//                     placeholder="Enter Your Password"
//                     name="p_password"
//                     ref={register({
//                       required: "This field is required",
//                       pattern: {
//                         value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
//                         message:
//                           "UpperCase, LowerCase, Number/SpecialChar and min 8 Chars",
//                       },
//                     })}
//                   />
//                   <i
//                     className={`fa ${isPasswordShow ? "fa-eye-slash" : "fa-eye"} password-icon`}
//                     onClick={togglePasssword}
//                   />
//                   {errors.p_password && (
//                     <div className="invalid-feedback">
//                       {errors.p_password.message}
//                     </div>
//                   )}
//                 </div>
//               </div>


//               <div className="col-md-12">
//                 <div className="mb-3">
//                   <label className="form-label">Confirm Password</label>
//                   <input
//                     type={isPasswordShow2 ? "text" : "password"}
//                     id="password"
//                     className={classNames("form-control", {
//                       "is-invalid": errors.p_confirm_password,
//                     })}
//                     placeholder="Confirm Password"
//                     name="p_confirm_password"
//                     ref={register({
//                       required: "This field is required",
//                       validate: (value) =>
//                         value === getValues("p_password") ||
//                         "password doesn 't match",
//                     })}
//                   />
//                   <i
//                     className={`fa ${isPasswordShow2 ? "fa-eye-slash" : "fa-eye"} password-icon`}
//                     onClick={togglePasssword2}
//                   />
//                   {errors.p_confirm_password && (
//                     <div className="invalid-feedback">
//                       {errors.p_confirm_password.message}
//                     </div>
//                   )}
//                 </div>
//               </div>

//             </div>


//             <button type="submit" className="btn btn-primary">
//               Submit
//             </button>

//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default ChangePassword;




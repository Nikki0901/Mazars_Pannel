import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import Layout from "../../components/Layout/Layout";
import classNames from "classnames";
import Swal from "sweetalert2";
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

  const [error, setError] = useState("");
  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("id", JSON.parse(userId));
    formData.append("user_id", value.p_name);
    formData.append("password", value.password);
    formData.append("rpassword", value.confirm_password);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/passChange`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("change password successfully!");
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
          {/* <p className="error">{error && error}</p> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="mb-3">
                <label className="form-label">User Id</label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.p_name,
                  })}
                  name="p_name"
                  placeholder="Enter user id"
                  ref={register({
                    required: "This field is required",
                  })}
                />
                {errors.p_name && (
                  <div className="invalid-feedback">
                    {errors.p_name.message}{" "}
                  </div>
                )}
                {/* <p className="error">
                  {errors.p_name && errors.p_name.message}
                </p> */}
              </div>

              <label className="form-label">New Password</label>
              <input
                type="text"
                id="password"
                className={classNames("form-control", {
                  "is-invalid": errors.p_password,
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
              {errors.p_password && (
                <div className="invalid-feedback">
                  {errors.p_password.message}
                </div>
              )}
              {/* <p className="error">
                  {errors.p_password && errors.p_password.message}
                </p> */}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="text"
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
              {errors.p_confirm_password && (
                <div className="invalid-feedback">
                  {errors.p_confirm_password.message}
                </div>
              )}
              {/* <p className="error">
                  {errors.p_confirm_password && errors.p_confirm_password.message}
                </p> */}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ChangePassword;

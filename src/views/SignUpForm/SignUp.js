import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import classNames from "classnames";
import Swal from "sweetalert2";
import { Spinner } from "reactstrap";
import { professionName, country, states } from './data';
import { cities } from './city';
import Alerts from "../../common/Alerts";
import { ResponsiveEmbed } from "react-bootstrap";



// const Schema = yup.object().shape({
//   // p_name: yup.string().required("required name"),
//   // p_email: yup.string().email("invalid email").required("required email"),
//   // p_profession: yup.string().required("required proffesion"),
//   // p_state: yup.string().required("required state"),
//   // p_city: yup.string().required("required city"),
//   // p_phone: yup
//   //   .string()
//   //   .required("required phone no")
//   //   .matches(/^[0-9]+$/, "Must be only digits")
//   //   .min(10, "Must be exactly 10 digits")
//   //   .max(20, "max 20 digits"),
//   // p_password: yup
//   //   .string()
//   //   .required("required password")
//   //   .min(5, "at least 5 digits")
//   //   .max(20, "max 20 digits"),
// });



function SignUp(props) {
  const alert = useAlert();
  const { handleSubmit, register, errors, getValues } = useForm();


  const [otpMsg, setOtpMsg] = useState();
  const [load, setLoad] = useState(false);
  const [store, setStore] = useState(0);
  const [disabled, setDisbutton] = useState(true);
  const [disabled2, setDisbutton2] = useState(false);

  const [password, setPassword] = useState(false);
  const [passError, setpassError] = useState()
  const [repassword, setRepassword] = useState(false);
  const [passData, setPassData] = useState([])
  const [valiPhone, setValiphone] = useState([]);


  const [State, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [countryCode, setCountryCode] = useState([])
  const [showPlus, setShowPlus] = useState(false)
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [valiEmail, setValiemail] = useState(null)
  const [invalid, setInvalid] = useState(null)
  const [numExist, setNumExist] = useState(null)
  const [numAvail, setNumAvail] = useState(null)

  const togglePasssword = () => {
    setPassword(!password)
  };

  const togglePasssword2 = () => {
    setRepassword(!repassword)
  };


  const onSubmit = (value) => {
    console.log("value :", value);


    // let formData = new FormData();
    // formData.append("name", value.p_name);
    // formData.append("email", value.p_email);
    // formData.append("phone", value.p_phone);
    // formData.append("occupation", value.p_profession);
    // formData.append("state", value.p_state);
    // formData.append("city", value.p_city)
    // formData.append("zipCode", value.p_zipCode);
    // formData.append("password", value.p_password);

    // axios({
    //   method: "POST",
    //   url: `${baseUrl}/customers/signup`,
    //   data: formData,
    // })
    //   .then(function (response) {
    //     console.log("res-", response);

    //     if (response.data.code === 1) {

    //       var variable = "Signup successfully."
    //       Alerts.SuccessNormal(variable)

    //       localStorage.setItem("userid", JSON.stringify(response.data.id));
    //       localStorage.setItem(
    //         "userNameId",
    //         JSON.stringify(response.data.user_id)
    //       );
    //       localStorage.setItem("name", JSON.stringify(response.data.name));
    //       props.history.push("/customer/questionnaire-page");
    //     } else if (response.data.code === 0) {
    //       console.log("res -", response.data.result);
    //       setLoad(false);
    //       Swal.fire(
    //         "Oops",
    //         `error :        
    //       ${response.data.message[0] ? response.data.message[0] : ""} 
    //       ${response.data.message[0] && response.data.message[1] ? "and" : ""} 
    //         ${response.data.message[1] ? response.data.message[1] : ""} 
    //         `,
    //         "error"
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("erroror - ", error);
    //   });
  };


  const getcountry = (key) => {
    setShowPlus(true)

    var arrayState = []
    states.filter((data) => {
      if (data.country_id == key) {
        arrayState.push(data)
      }
    });
    setState(arrayState)

    country.filter((data) => {
      if (key == data.id) {
        setCountryCode(data.phoneCode)
      }
    })

  };

  const getCity = (key) => {
    var arrayCity = []

    cities.filter((data) => {
      if (data.state_id === key) {
        arrayCity.push(data)
      }
    });
    setCity(arrayCity)
  }

  //eamil onchange
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  //email validaation with api
  const emailValidation = (key) => {

    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(validRegex)) {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("type", 1);

      axios({
        method: "POST",
        url: `${baseUrl}/customers/validateregistration`,
        data: formData,
      })
        .then(function (response) {
          console.log("resEmail-", response);
          if (response.data.code === 1) {
            setValiemail(response.data.result)
            setInvalid('')
          } else if (response.data.code === 0) {
            setInvalid(response.data.result)
            setValiemail('')
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
    else {
      console.log("error")
    }

  }


  //phone onchange
  const phoneHandler = (e) => {
    if (isNaN(e.target.value)) {
      console.log("please enter no only")
    } else {
      setPhone(e.target.value);
    }
  };


  //phone validaation with api
  const phoneValidation = () => {

    if (phone.length > 9) {
      let formData = new FormData();
      formData.append("phone", phone);
      formData.append("type", 2);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/validateregistration`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            // setValiphone(response.data.result)
            console.log(response.data.result)
            setNumExist('')
            setNumAvail(response.data.result);
            
          }
          else if (response.data.code === 0) {
            console.log(response.data.result)
            setNumAvail('')
            setNumExist(response.data.result)
           
            console.log("mobile" + setNumExist)
          }

        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
  }

  console.log(numExist)

  return (
    <>
      <Header cust_sign="cust_sign" />
      <div className="container">
        <div className="form">
          <div className="heading">
            <h2>Customer Register</h2>
          </div>
          {load ? (
            <Spinner size="sm" color="primary" />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
              <div className="row">
                <div className="col-md-6">

                  <div className="mb-3">
                    <label className="form-label">Name<span className="declined">*</span></label>
                    <input
                      type="text"
                      name="p_name"
                      ref={register({
                        required: "This field is required",
                      })}
                      placeholder="Enter Name"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_name,
                      })}
                    />
                  </div>

                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Email<span className="declined">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="p_email"
                      onChange={(e) => emailHandler(e)}
                      onBlur={emailValidation}
                      className={classNames("form-control", {
                        "is-invalid": errors.p_email,
                      })}
                      placeholder="Enter Your Password"
                      ref={register}
                    />

                    {
                      valiEmail ?
                        <p className="completed">
                          {valiEmail}
                        </p>
                        :
                        <p className="declined">{invalid}</p>
                    }



                  </div>
                </div>


                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Occupation/ Profession<span className="declined">*</span></label>
                    <br />
                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.p_profession,
                      })}
                      name="p_profession"
                      aria-label="Default select example"
                      ref={register({
                        required: "This field is required",
                      })}
                    >
                      <option value="">--select--</option>
                      {professionName.map((p, index) => (
                        <option key={index} value={p.city}>
                          {p.city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>


                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Country<span className="declined">*</span></label>
                    <select
                      id="state"
                      name="p_country"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_country,
                      })}
                      ref={register({
                        required: "This field is required",
                      })}
                      onChange={(e) => getcountry(e.target.value)}
                    >
                      <option value="">--select--</option>
                      {country.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>


                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">State<span className="declined">*</span></label>
                    <select
                      id="state"
                      name="p_state"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_state,
                      })}
                      ref={register({
                        required: "This field is required",
                      })}
                      onChange={(e) => getCity(e.target.value)}
                    >
                      <option value="">--select--</option>
                      {State.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>


                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">City<span className="declined">*</span></label>
                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.p_city,
                      })}
                      name="p_city"
                      ref={register({
                        required: "This field is required",
                      })}
                    >
                      <option value="">--select--</option>
                      {city.map((p, index) => (
                        <option key={index} value={p.city}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Mobile number<span className="declined">*</span></label>
                    <div className="mobNumber" style={{ "display": "flex" }}>
                      <select
                        name="p_code"
                        disabled={true}
                        ref={register({
                          required: "This field is required",
                        })}
                      >
                        <option>
                          {showPlus ? "+" + countryCode : null}
                        </option>
                      </select>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_code,
                        })}
                        name="p_phone"
                        ref={register}
                        placeholder="Mobile number"
                        onChange={(e) => phoneHandler(e)}
                        onBlur={phoneValidation}
                      />

                    </div>
                    {
                      numAvail ?
                        <p className="completed"> {numAvail}
                        </p>
                        :
                        <p className="declined">{numExist}</p>
                    }

                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Zipcode<span className="declined">*</span></label>
                    <input
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_zipCode,
                      })}
                      name="p_zipCode"
                      ref={register({
                        required: "This field is required",
                      })}
                      placeholder="Enter Name"
                    />
                  </div>

                </div>
                <div class="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Password<span className="declined">*</span></label>

                    <input
                      type={password ? "text" : "password"}
                      className="form-control"
                      onCopy={(e) => {
                        e.preventDefault();
                        return false
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        return false
                      }}
                      // onChange={funValidation}
                      name="p_password"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_password,
                      })}
                      placeholder="Enter Your Password"
                      ref={register({
                        required: "mandatory",
                        pattern: {
                          value:
                            /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                          message:
                            "UpperCase, LowerCase, Number/SpecialChar and min 8 Chars",
                        },
                      })}
                    />
                    <i
                      className={`fa ${password ? "fa-eye-slash" : "fa-eye"} password-icon`}
                      onClick={togglePasssword}
                    />
                    {errors.p_password && (
                      <div className="invalid-feedback">
                        {errors.p_password.message}
                      </div>
                    )}
                  </div>
                </div>

                <div class="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Confirm Password<span className="declined">*</span></label>
                    <input
                      type={repassword ? "text" : "password"}
                      className={classNames("form-control", {
                        "is-invalid": errors.p_confirm_password,
                      })}
                      onCopy={(e) => {
                        e.preventDefault();
                        return false
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        return false
                      }}
                      placeholder="Confirm Password"
                      name="p_confirm_password"
                      ref={register({
                        required: "mandatory",
                        validate: (value) =>
                          value === getValues("p_password") ||
                          "password doesn 't match",
                      })}
                    />
                    <i
                      className={`fa ${repassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
                      onClick={togglePasssword2}
                    />
                    {errors.p_confirm_password && (
                      <div className="invalid-feedback">
                        {errors.p_confirm_password.message}
                      </div>
                    )}
                  </div>
                </div>


                <div class="col-md-6">
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
      <Footer />
    </>
  );
}

export default SignUp;





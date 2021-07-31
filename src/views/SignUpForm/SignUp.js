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
import ResendOtp from "./ResendOtp";
import GetOTP from "./GetOTP";
import Mandatory from "../../components/Common/Mandatory";






function SignUp(props) {
  const alert = useAlert();
  const { handleSubmit, register, errors, getValues } = useForm();

  
  const [display, setDisplay] = useState(false);
  const [otpMsg, setOtpMsg] = useState();
  const [load, setLoad] = useState(false);
  const [store, setStore] = useState(0);
  const [password, setPassword] = useState(false);
  const [passError, setpassError] = useState()
  const [repassword, setRepassword] = useState(false);
  const [show, setShow] = useState(false);

  const [State, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [countryCode, setCountryCode] = useState('')
  const [showPlus, setShowPlus] = useState(false)
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [valiEmail, setValiemail] = useState(null)
  const [invalid, setInvalid] = useState(null)
  const [numExist, setNumExist] = useState(null)
  const [numAvail, setNumAvail] = useState(null)
  const [countryName, setCountryName] = useState(null)
  const [stateName, setStateName] = useState(null)

  const [countryId, setCountryId] = useState(null)
  const [indNumError, setIndNumError] = useState(null)
  const [zipCode, setZipCode] = useState('')
  const [zipError, setZipError] = useState(null)
  const [passData1, setPassData1] = useState([])

  const togglePasssword = () => {
    setPassword(!password)
  };

  const togglePasssword2 = () => {
    setRepassword(!repassword)
  };

  const [time, setTime] = useState('')
  const [disabled, setDisabled] = useState(false)


  useEffect(() => {
    getTime()
  }, [load]);


  const getTime = () => {
    console.log("get time")

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
      timer(120);
    }
  }


  //get country
  const getcountry = (key) => {
    setShowPlus(true)

    if (key == 101) {
      setCountryId(key)
    }
    else {
      setCountryId("")
    }

    country.filter((p) => {
      if (p.id == key) {
        setCountryCode(p.phoneCode)
        setCountryName(p.name)
      }
    });

    var arrayState = []
    states.filter((data) => {
      if (data.country_id == key) {
        arrayState.push(data)
      }
    });
    setState(arrayState)
  };


  //get city
  const getCity = (key) => {


    states.filter((p) => {
      if (p.id == key) {
        setStateName(p.name)
      }
    });

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
    else if (email.length > 0) {
      console.log("error")
      setInvalid("invalid email")
    } else if (email.length === 0) {
      setInvalid("")
    }
  }


  //phone onchange
  const phoneHandler = (e) => {
    if (isNaN(e.target.value)) {
      setNumExist('Please enter number only')
    }
    else {
      setPhone(e.target.value)
    }
    if (phone.length > 10) {
      setIndNumError("")
    }
  };

  //phone validaation with api
  const phoneValidation = () => {
    console.log(phone.length)
    if (countryId && phone.length > 10) {
      console.log(phone.length)
      setNumAvail("")
      setNumExist("")
      setIndNumError("Maximum 10 value should be enter")
    }
    else if (countryId && phone.length < 10) {
      console.log(phone.length)
      setNumAvail("")
      setNumExist("")
      setIndNumError("Minimum 10 value should be enter")
    }

    else {
      setIndNumError("")
      console.log(countryId)
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
          // console.log("erroror - ", error);
        });
    }
  }


  //zip oncahnge
  const zipValue = (e) => {
    if (isNaN(e.target.value)) {
      setZipError("Please enter number only")
    }
    else {
      setZipCode(e.target.value)
      setZipError("")
    }
  }


  // onblur
  const zipVali2 = (e) => {
    if (countryId && zipCode && zipCode.length < 5) {
      setZipError("")
      console.log(zipCode.length)
    }
    else if (countryId && zipCode && zipCode.length > 6) {
      setZipError("Maximum 6 digit allowed")
      console.log(zipCode.length)
    }

  }


  //password
  const valiPassword = (e) => {
    let arr3 = []
    arr3.push(e.target.value)
    setPassData1(...arr3)
    console.log(e.target.value.length)
    if (arr3.length >= 0) {

      if (e.target.value == false) {
        setpassError("");
      }
      else if (e.target.value.search(/[a-z]/) === -1) {
        setpassError("Your password must be atleaset one lower case letter")
      }
      else if (e.target.value.search(/[A-Z]/) === -1) {
        setpassError("Your password must be at least one upper letter");
      }

      else if (e.target.value.search(/[0-9]/) === -1) {
        setpassError("Your password must contain at least one digit.");

      }

      else if (e.target.value.search(/[!#$%&@? "]/) === -1) {
        setpassError("Your password must contain at least one special Character.");

      }
      else if (e.target.value.length < 8) {
        setpassError("Your password must be at least 8 characters");
      }
      else {
        setpassError("")
      }
    }
    else {
      setpassError("")
    }
  }


  //submit form
  const onSubmit = (value) => {
    console.log("value :", value);

    console.log("display :", display);

    let formData = new FormData();
    formData.append("name", value.p_name);
    formData.append("email", value.p_email);
    formData.append("phone", value.p_phone);
    formData.append("occupation", value.p_profession);
    formData.append("city", value.p_city)
    formData.append("pincode", value.p_zipCode);
    formData.append("password", value.p_password);
    formData.append("rpassword", value.p_confirm_password);
    formData.append("otp", value.p_otp);
    formData.append("country", countryName);
    formData.append("state", stateName);
    formData.append("stdcode", countryCode);

    if (display) {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("p", "registration");

      axios({
        method: "POST",
        url: `${baseUrl}/customers/forgototp`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            setLoad(true)
            setShow(true)
            Alerts.SuccessNormal("OTP sent to your email address.")
          } else if (response.data.code === 0) {
            Alerts.ErrorNormal("Incorrect OTP , please try again.")
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
      return false
    }
    axios({
      method: "POST",
      url: `${baseUrl}/customers/signup`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          var variable = "Signup successfully."
          Alerts.SuccessNormal(variable)

          localStorage.setItem("userid", JSON.stringify(response.data.id));
          localStorage.setItem(
            "userNameId",
            JSON.stringify(response.data.user_id)
          );
          localStorage.setItem("name", JSON.stringify(response.data.name));
          props.history.push("/customer/dashboard");
        } else if (response.data.code === 0) {
          console.log("res -", response.data.result);
          setLoad(false);
          Alerts.ErrorNormal("Error.")
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  //setotp
  const setOtp = () => {
    setDisplay(false)
  }

  //get OTP
  const getOtp = () => {
    setDisplay(true)
  }


  return (
    <>
      <Header cust_sign="cust_sign" />
      <div className="container">

        <div className="form">
          <div className="heading">
            <h2>Customer Register</h2>
          </div>
          <>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">

                    <div className="mb-3">
                      <label className="form-label">Name<span className="declined">*</span></label>
                      <input
                        type="text"
                        name="p_name"
                        ref={register({ required: true })}
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
                        name="p_email"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email,
                        })}
                        onChange={(e) => emailHandler(e)}
                        onBlur={emailValidation}
                        placeholder="Enter Your Password"
                        ref={register({ required: true })}
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
                        ref={register({ required: true })}
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
                        ref={register({ required: true })}
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
                        ref={register({ required: true })}
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
                        ref={register({ required: true })}
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
                          ref={register({ required: true })}
                        >
                          <option>
                            {showPlus ? "+" + countryCode : null}
                          </option>
                        </select>
                        <input
                          type="text"
                          className={classNames("form-control", {
                            "is-invalid": errors.p_phone,
                          })}
                          name="p_phone"
                          ref={register({ required: true })}
                          placeholder="Mobile number"
                          onChange={(e) => phoneHandler(e)}
                          onBlur={phoneValidation}
                        />

                      </div>
                      {indNumError ? <p className="declined">{indNumError}</p> : <>
                        {
                          numAvail ?
                            <p className="completed"> {numAvail}
                            </p>
                            :
                            <p className="declined">{numExist}</p>
                        }
                      </>}
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
                        ref={register({ required: true })}
                        placeholder="Enter Zipcode"
                        onChange={(e) => zipValue(e)}
                        onBlur={zipVali2}
                      />
                    </div>
                    <p className="declined">{zipError}</p>
                  </div>

                  <div class="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Password<span className="declined">*</span></label>
                      <input
                        type={password ? "text" : "password"}
                        ref={register({ required: true })}
                        onCopy={(e) => {
                          e.preventDefault();
                          return false
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false
                        }}
                        name="p_password"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_password,
                        })}
                        placeholder="Enter Your Password"
                        onChange={(e) => valiPassword(e)}
                      />
                      <i
                        className={`fa ${password ? "fa-eye-slash" : "fa-eye"} password-icon`}
                        onClick={togglePasssword}
                      />
                      <p className="declined">{passError}</p>
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
                          required: true,
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

                  {
                    show ?
                      <div class="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">OTP<span className="declined">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="p_otp"
                            ref={register}
                            placeholder="Enter your OTP"
                          />
                          <small class="text-center">
                            Note: OTP is valid for {time} seconds.
                          </small>
                        </div>
                      </div>
                      : null
                  }
                  <div class="col-md-6">
                    {
                      show ?
                        <button type="submit" className="btn btn-primary" onClick={() => setOtp()}>Submit</button>
                        :
                        <button type="submit" class="btn btn-success" onClick={() => getOtp("otp")}>Get OTP</button>
                    }
                  </div>
                </div>
              </form>

              {
                disabled ?
                  <ResendOtp setDisabled={setDisabled} getTime={getTime} 
                  email={email} phone={phone} setLoad={setLoad} />
                  :
                  null
              }
              <Mandatory />
            </div>
          </>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;


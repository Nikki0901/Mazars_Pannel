import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import classNames from "classnames";
import Swal from "sweetalert2";
import { Spinner } from "reactstrap";
import Alerts from "../../common/Alerts";

const Schema = yup.object().shape({
  p_name: yup.string().required("required name"),
  p_email: yup.string().email("invalid email").required("required email"),
  p_profession: yup.string().required("required proffesion"),
  p_state: yup.string().required("required state"),
  p_city: yup.string().required("required city"),
  p_phone: yup
    .string()
    .required("required phone no")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(20, "max 20 digits"),
  p_password: yup
    .string()
    .required("required password")
    .min(5, "at least 5 digits")
    .max(20, "max 20 digits"),
  cp_password: yup.string().when("p_password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("p_password")],
      "Both password need to be the same"
    )
  })
    .required("required password")
});

function SignUp(props) {
  const alert = useAlert();
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [name, setName] = useState("");
  const [load, setLoad] = useState(false);
  const [store, setStore] = useState(0);



  const [password, setPassword] = useState(false);
  const togglePasssword = () => {
    setPassword(!password)
  };


  const [repassword, setRepassword] = useState(false);
  const togglePasssword2 = () => {
    setRepassword(!repassword)
  };


 


  useEffect(() => {
    const getStates = () => {
      // console.log(`${baseUrl}/customers/getState`)
      axios.get(`${baseUrl}/customers/getState`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setStates(res.data.result);
        }
      });
    };
    getStates();
  }, []);

  useEffect(() => {
    const getCity = () => {
      axios
        .get(`${baseUrl}/customers/getCity?state_id=${store}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setCity(res.data.result);
          }
        });
    };

    getCity();
  }, [store]);


  const onSubmit = (value) => {
    console.log("value :", value);

    // setLoad(true);

    let formData = new FormData();
    formData.append("name", value.p_name);
    formData.append("email", value.p_email);
    formData.append("phone", value.p_phone);
    formData.append("occupation", value.p_profession);
    formData.append("state", value.p_state);
    formData.append("city", value.p_city);
    formData.append("password", value.p_password);
    // formData.append("confirmpassword", value.conformpass);

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
          props.history.push("/customer/questionnaire-page");
        } else if (response.data.code === 0) {
          console.log("res -", response.data.result);
          setLoad(false);
          Swal.fire(
            "Oops",
            `error :        
          ${response.data.message[0] ? response.data.message[0] : ""} 

          ${response.data.message[0] && response.data.message[1] ? "and" : ""} 

            ${response.data.message[1] ? response.data.message[1] : ""} 
            `,
            "error"
          );
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  const getID = (key) => {
    setStore(key);

    states.filter((data) => {
      if (data.id == key) {
        console.log("Name", data.name);
        setName(data.name);
      }
    });
  };



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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6">

                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_name,
                      })}
                      name="p_name"
                      ref={register}
                      placeholder="Enter Name"
                    />
                    {errors.p_name && (
                      <div className="invalid-feedback">
                        {errors.p_name.message}{" "}
                      </div>
                    )}
                  </div>

                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_email,
                      })}
                      name="p_email"
                      ref={register}
                      placeholder="Enter Email"
                    />
                    {errors.p_email && (
                      <div className="invalid-feedback">
                        {errors.p_email.message}{" "}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Phone number</label>
                    <input
                      type="text"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_phone,
                      })}
                      name="p_phone"
                      ref={register}
                      placeholder="Phone number"
                    />
                    {errors.p_phone && (
                      <div className="invalid-feedback">
                        {errors.p_phone.message}{" "}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Occupation/ Profession</label>
                    <br />
                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.p_profession,
                      })}
                      name="p_profession"
                      aria-label="Default select example"
                      ref={register}
                    >
                      <option value="">--select--</option>
                      {professionName.map((p, index) => (
                        <option key={index} value={p.city}>
                          {p.city}
                        </option>
                      ))}
                    </select>
                    {errors.p_profession && (
                      <div className="invalid-feedback">
                        {errors.p_profession.message}{" "}
                      </div>
                    )}
                  </div>
                </div>

                <div class="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Password</label>


                    <input
                      // type="password"
                      type={password ? "text" : "password"}
                      className={classNames("form-control", {
                        "is-invalid": errors.p_password,
                      })}
                      name="p_password"
                      ref={register}
                      placeholder="Enter Password"
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
                    <label className="form-label">Re-Type Password</label>

                    <input
                      type={repassword ? "text" : "password"}
                      className={classNames("form-control", {
                        "is-invalid": errors.cp_password,
                      })}
                      ref={register}
                      name="cp_password"
                      placeholder="Enter Password"
                    />
                    <i
                      className={`fa ${repassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
                      onClick={togglePasssword2}
                    />


                    {errors.cp_password && (
                      <div className="invalid-feedback">
                        {errors.cp_password.message}
                      </div>
                    )}


                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">State</label>
                    <select
                      id="state"
                      name="p_state"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_state,
                      })}
                      ref={register}
                      onChange={(e) => getID(e.target.value)}
                    >
                      <option value="">--select--</option>
                      {states.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    {errors.p_state && (
                      <div className="invalid-feedback">
                        {errors.p_state.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">City</label>

                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.p_city,
                      })}
                      name="p_city"
                      ref={register}
                    >
                      <option value="">--select--</option>
                      {city.map((p, index) => (
                        <option key={index} value={p.city}>
                          {p.city}
                        </option>
                      ))}
                    </select>
                    {errors.p_city && (
                      <div className="invalid-feedback">
                        {errors.p_city.message}
                      </div>
                    )}
                  </div>
                </div>




              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;

const professionName = [
  { city: "CA" },
  { city: "NON-CA" },
  { city: "CFO" },
  { city: "CEO" },
  { city: "FINANCE HEAD" },
  { city: "ACCOUNTS MANAGER" },
  { city: "ACCOUNTANT" },
  { city: "TAX PROFESSIONAL" },
  { city: "OTHERS" },
];

// Swal.fire(
//   'Oops...',
//   "Errorr : <br/>"
//  +response.data.message[0]+
//   "<br/>"
//   +response.data.message[1] ,
//   'error')

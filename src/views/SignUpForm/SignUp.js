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

// const Schema = yup.object().shape({
//   p_name: yup.string().required("required name"),
//   p_email: yup.string().email("invalid email").required("required email"),
//   p_profession: yup.string().required("required proffesion"),
//   p_state: yup.string().required("required state"),
//   p_city: yup.string().required("required city"),
//   p_phone: yup
//     .string()
//     .required("required phone no")
//     .matches(/^[0-9]+$/, "Must be only digits")
//     .min(10, "Must be exactly 10 digits")
//     .max(20, "max 20 digits"),
//   p_password: yup
//     .string()
//     .required("required password")
//     .min(5, "at least 5 digits")
//     .max(20, "max 20 digits"),
// });

function SignUp(props) {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();

  // const [error, setError] = useState("");
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [name, setName] = useState('');

  const [store, setStore] = useState(0);

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
      axios.get(`${baseUrl}/customers/getCity?state_id=${store}`).then((res) => {
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
    console.log("value :", value.p_state);

    let formData = new FormData();
    formData.append("name", value.p_name);
    formData.append("email", value.p_email);
    formData.append("phone", value.p_phone);
    formData.append("occupation", value.p_profession);
    formData.append("state", name);
    formData.append("city", value.p_city);
    formData.append("password", value.p_password);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/signup`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);

        if (response.data.code === 1) {
          alert.success("signup successfully !");
          localStorage.setItem("userid", JSON.stringify(response.data.id));
          localStorage.setItem("userNameId", JSON.stringify(response.data.user_id));
          localStorage.setItem("name", JSON.stringify(response.data.name));
          props.history.push("/customer/questionnaire-page");
          reset();
        } else if (response.data.code === 0) {
          console.log(response.data.result);
          // setError(response.data.message);
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


const getID = (key) =>{
  setStore(key)

  states.filter((data)=>{
    if(data.Id == key){
      console.log('Name', data.name);
      setName(data.name)
      // document.getElementById('state').value=data.Name;
    }
  })
}

  return (
    <>
      <Header cust_sign="cust_sign" />
      <div className="container">
        <div className="form">
          <div className="heading">
            <h2>Customer Register</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="p_name"
                    ref={register}
                    placeholder="Enter Name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="p_email"
                    ref={register}
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Phone number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="p_phone"
                    ref={register}
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Occupation/ Profession</label>
                  <br />
                  <select
                    className="form-select form-control"
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
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">State</label>
                  <select
                    id="state"
                    name="p_state"
                    className="form-control"
                    ref={register}
                    // onClick={(e) => storeValue(e.target.value)}
                    onChange={(e) =>getID(e.target.value)}                         
                  >
                    <option value="">--select--</option>
                    {states.map((p) => (
                      <option key={p.Id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">City</label>

                  <select className="form-control" name="p_city" ref={register}>
                    <option value="">--select--</option>
                    {city.map((p, index) => (
                      <option key={index} value={p.city}>
                        {p.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div class="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="p_password"
                    ref={register}
                    placeholder="Enter Password"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
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

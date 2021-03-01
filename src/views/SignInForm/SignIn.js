import { useForm } from "react-hook-form";
import React , {useState , useEffect} from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";



function SignIn(props) {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();

  const [error, setError] = useState('');

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("user_id", value.p_name);
    formData.append("password", value.password);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/login`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("Login successfully !");
          localStorage.setItem(
            "userid",
            JSON.stringify(response.data.user_id)
          );
          localStorage.setItem(
            "name",
            JSON.stringify(response.data.name)
          );
          props.history.push("/customer/dashboard");  
        }
        else if (response.data.code === 0) {
          console.log(response.data.result)
          setError(response.data.result)
          }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <>
        <Header cust_sign="cust_sign"/>
      <div className="container">
        <div className="form">
          <div className="heading">
            <h2>Customer Login</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
        
            <div className="row">
              <div className="col-md-12">
              <div className="mb-3">
                  <label className="form-label">User Id</label>
                  <input
                    type="text"
                    className="form-control"
                    name="p_name"
                    ref={register}
                    placeholder="Enter Email"
                  />
                 
                </div>
                
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter Password"
                    ref={register}
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

export default SignIn;

{
  /* <div className="mb-3">
                <label className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="phone_no"
                  placeholder="Phone Number"
                  ref={register}
                />
                <p className="error">
                  {errors.phone_no && errors.phone_no.message}
                </p>
              </div> */
}

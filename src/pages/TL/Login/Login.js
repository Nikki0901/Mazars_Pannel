import React,{useState} from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";

// const Schema = yup.object().shape({
//   p_email: yup.string().email("invalid email").required("required email"),
//   password: yup
//     .string()
//     .required("required password")
//     .min(5, "at least 5 digits")
//     .max(20, "max 20 digits"),
// });


function Login(props) {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();

  const [error, setError] = useState('');

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("id", value.p_email);
    formData.append("password", value.password);
    formData.append("type", "tl");

    axios({
      method: "POST",
      url: `${baseUrl}/auth/taxleader`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);     
        if (response.data.code === 1) {
          alert.success("Login successfully !");
          localStorage.setItem(
            "tlkey",
            JSON.stringify(response.data.userid)
          );
          props.history.push("/teamleader/dashboard");  
        } else
         if (response.data.code === 0) {
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
      <Header mtl="mtl"/>
      <div className="container">
        <div className="form">
          <div className="heading">
            <h2>MTL Login</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>    
         
            <div className="row">
              <div className="col-md-12">
              <div className="mb-3">
                  <label className="form-label">User Id</label>
                  <input
                    type="text"
                    className="form-control"
                    name="p_email"
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

export default Login;

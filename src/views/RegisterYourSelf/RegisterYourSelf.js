import { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import { Button, Typography } from "@material-ui/core";
import './style.css';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../../config/config";
import VerifyOTP from "./VerifyOTP";


const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required("mandatory"),
  p_password: yup.string().required("mandatory"),
});


function LoginForm() {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [uid, setUid] = useState('')

  const [isPasswordShow, setPasswordShow] = useState(false);
  const togglePasssword = () => {
    setPasswordShow(!isPasswordShow)
  };



  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("user_id", value.p_email);
    formData.append("password", value.p_password);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/login`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setShow(true)
          setEmail(response.data.name)
          setUid(response.data.user_id)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <>
      <Header cust_sign="cust_sign" />

      <h1 style={{ "textAlign": "center", "margin": "55px 0 30px 0" }}>
        Would you like to post a query
      </h1>


      <div className="StartPage">
        <div className="mainContent">
          <div className="signIn">
            <div className="signBtn">
              <div className="boxOverlay">
                <p style={{ "color": "white", "fontSize": "22px" }}>
                  For new Customers
                </p>
                <Button color="primary" variant="contained">
                  <Link
                    to={{
                      pathname: "/customer/signup",
                    }}
                  >
                    Sign Up
                  </Link>
                </Button>
              </div>

            </div>
          </div>
          <div className="signUp">
            <Typography variant="h4" style={{ "margin": "0 0 15px 0" }}>
              Existing Customers
            </Typography>

            {
              show ? <div>
                <VerifyOTP email={email} uid={uid}/>
              </div>
                :
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="p_email"
                      ref={register}
                      placeholder="Enter Email"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password *</label>
                    <input
                      type={isPasswordShow ? "text" : "password"}
                      className="form-control"
                      name="p_password"
                      placeholder="Enter Password"
                      ref={register}
                    />
                    <i
                      className={`fa ${isPasswordShow ? "fa-eye-slash" : "fa-eye"} password-icon-login`}
                      onClick={togglePasssword}
                    />

                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-sm">
                      Get OTP
                    </button>
                  </div>
                </form>
            }

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginForm;




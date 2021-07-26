import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Alerts from "../../common/Alerts";



// import './style.css';
function RegisterYourSelf(props) {

  const inc = useRef(null);
  const intervalRef = useRef(null);
  const [timer, setTimer] = useState("00:00")
  var otime = 180;
  const [otpTime, setotpTime] = useState(otime);
  const register = useRef(null)
  const [otp, setOtp] = useState("")
  const [loginfild, setloginfild] = useState({})
  const [userid, setuserid] = useState("")
  const [otowrong, setotowrong] = useState("")


  const myFun = () => {
    if (otime == 0) {
      setotowrong("1")
    } else {
      let x = otime - 1
      otime = x
      setotpTime(x)
    }
  }
  // const getTimeRemaining = (endtime) => {
  //   const total = Date.parse(endtime) - Date.parse(new Date());
  //   const seconds = Math.floor((total / 1000) % 60);
  //   const minutes = Math.floor((total / 1000 / 60) % 60);
  //   const hours = Math.floor((total / 1000 * 60 * 60) % 24);
  //   const days = Math.floor(total / (1000 * 60 * 60 * 24));
  //   return {
  //     total, days, hours, minutes, seconds
  //   };
  // }
  var b = null;
  // const startTimer = (deadline) => {
  //   let { total, days, hours, minutes, seconds } = getTimeRemaining(deadline);
  //   if (total >= 0) {
  //     setTimer(
  //       (hours > 9 ? hours : "0" + hours) + ":" +
  //       (minutes > 9 ? minutes : "0" + minutes) + ":" +
  //       (seconds > 9 ? seconds : "0" + seconds)
  //     )
  //   }
  //   else {
  //     clearInterval(intervalRef.current);
  //   }
  // }
  const getOtp = () => {
    setInterval(function () {
      myFun();
    }, 1000);
  }
  async function logindata(name, e) {
    let newdata = { ...loginfild, [name]: e }
    setloginfild(newdata)

    // let result = await fetch("https://mazarsapi.multitvsolution.com/mazarapi/v1/customers/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify(inputdata)
    // })
    //   .then(res => res.json.stringify())
    //   .then(result => {
    //     console.log(result)
    //   })
    console.log(loginfild)
  }

  const verifyotp = () => {
    if (otp == "") {
      alert("fill otp")
    } else {
      let formData = new FormData();
      formData.append("email", loginfild.user_id);
      formData.append("otp", otp);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/verifyloginotp`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code == 1) {
            Alerts.SuccessLogin()
            localStorage.setItem("userid", response.data.user_id)
            window.location.replace("/#/customer/dashboard")
          } else {
            Alerts.WrongOTP()
            setotowrong("1")
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }

  }

  const regenrateotp = () => {
    // otime = 180
    // getOtp()
    if (otp == "") {
      alert("fill otp")
    } else {
      let formData = new FormData();
      formData.append("email", loginfild.user_id);
      formData.append("uid", userid);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/regenrateotp`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
  }

  const login = () => {

    if (loginfild.user_id == null || loginfild.password == null) {
      alert("Please fild fill")
    } else {

      getOtp()

      let formData = new FormData();
      formData.append("user_id", loginfild.user_id);
      formData.append("password", loginfild.password);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/login`,
        data: formData,
      })
        .then(function (response) {
          setuserid(response.data.user_id)
          if (response.data.code == 1) {
            Alerts.Otpsend()
          } else {
            Alerts.WrongOTP()
          }

          console.log(userid)
          console.log("res-", response.data);

          // alert(response.data.otp)
          // setOtp(response.data.otp)

        })
        .catch((error) => {
          console.log("erroror - ", error);
        });

    }
  }

  //Testing for error
  return (
    <>
      <Header cust_sign="cust_sign" />
      <div className="StartPage">
        <div className="mainContent">
          <div className="signIn">
            <div className="signBtn">
              <div className="boxOverlay">
                <p style={{ "color": "white", "fontSize": "22px" }}>
                  For new Customers


                </p>

                <Button color="primary" variant="contained">Sign Up</Button>
              </div>

            </div>
          </div>
          <div className="signUp">

            <Typography variant="h4">
              Existing Customers
            </Typography>
            <form>

              <div className="form-group">
                <label htmlFor="userName">Email</label>
                {/* <input type="text" className="form-control" name="userName" id="username" /> */}
                <input type="text" className="form-control" placeholder="Name" id="username" onChange={(e) => logindata("user_id", e.target.value)} /> <br />
              </div>

              <div className="form-group">
                <label htmlFor="userPass">Password</label>
                {/* <input type="password" className="form-control" name="userPass" id="userpass" /> */}
                <input type="text" className="form-control" placeholder="Password" id="userpass" onChange={(e) => logindata("password", e.target.value)} />  <br />
              </div>
              {userid ?
                <>

                  <div className="form-group" style={{ "display": "flex" }}>
                    <input
                      type="number"
                      // ref={register}
                      // name="getOtp"
                      value={otp}
                      // disabled style={{ "margin": "0 10px 0 0" }}

                      onChange={(e) => { setOtp(e.target.value) }}

                    />
                    <Button variant="contained" size="small" onClick={e => verifyotp()} style={{ fontSize: "14px" }}> Verify Otp</Button>

                  </div>
                  <p style={{ display: "block" }}>{otpTime}</p>
                </>
                : " "
              }



              {/* <Button variant="contained" color="primary"> Log In</Button> */}
              {otowrong ? <Button variant="contained" size="small" onClick={e => regenrateotp()} style={{ fontSize: "14px" }}>Re Send Otp</Button> : ""}


              {userid ? "" : <Button variant="contained" color="primary" onClick={e => login()} style={{ fontSize: "14px" }}> Log In</Button>}
              <div>


              </div>
            </form>
          </div>
        </div>
      </div>


      <Footer />
    </>
  );
}

export default RegisterYourSelf;
{/* <h1 style={{ color: "#2b345f",textDecoration:"none" }}>
          <Link to="/customer/signup">
            PLEASE REGISTER YOURSELF
            </Link>
        </h1> */}

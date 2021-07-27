import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Alerts from "../../common/Alerts";
import './style.css';


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

  var b = null;
  const getOtp = () => {
    setInterval(function () {
      myFun();
    }, 1000);
  }

  async function logindata(name, e) {
    let newdata = { ...loginfild, [name]: e }
    setloginfild(newdata)
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

  return (
    <>
      <Header cust_sign="cust_sign" />
      <h2 style={{ margingTop: "18px", marginLeft: "15px" }}>Would you like to post a Query ?</h2>
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
                <input type="text" className="form-control" placeholder="Name" id="username" onChange={(e) => logindata("user_id", e.target.value)} /> <br />
              </div>

              <div className="form-group">
                <label htmlFor="userPass">Password</label>
                <input type="text" className="form-control" placeholder="Password" id="userpass" onChange={(e) => logindata("password", e.target.value)} />  <br />
              </div>
              {userid ?
                <>
                  <div className="form-group" style={{ "display": "flex" }}>
                    <input
                      type="number"
                      value={otp}
                      onChange={(e) => { setOtp(e.target.value) }}
                    />
                    <Button variant="contained" size="small" onClick={e => verifyotp()} style={{ fontSize: "14px" }}> Verify Otp</Button>
                  </div>
                  <p style={{ display: "block" }}>{otpTime}</p>
                </>
                : " "
              }
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



// import { Link } from "react-router-dom";
// import "../../assets/css/style.css";
// import "../../assets/css/media.css";
// import Header from "../../components/Header/Header";
// import Footer from '../../components/Footer/Footer'


// function RegisterYourSelf() {
//   return (
//     <>
//       <Header cust_sign="cust_sign" />

//       <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "140px", }}>

//         <div style={{
//           height: "200px", width: "300px", border: "2px solid blue", textAlign: "center",
//           paddingTop: "80px"
//         }}>
//           <Link to="/customer/signin">
//             <button type="button" class="btn btn-outline-primary btn-lg"
//               style={{ borderRadius: "25px" }}>
//               Signin
//             </button>
//           </Link>

//           <p style={{ marginLeft: "100px", marginTop: "45px", fontSize: "20px" }}>
//             Existing Customers
//           </p>
//         </div>


//         <div style={{
//           height: "200px", width: "300px", border: "2px solid blue", textAlign: "center",
//           paddingTop: "80px"
//         }}>
//           <Link to="/customer/signup">
//             <button type="button" class="btn btn-outline-primary btn-lg"
//               style={{ borderRadius: "25px" }}>
//               SignUp
//             </button>
//           </Link>
//           <p style={{ marginLeft: "100px", marginTop: "45px", fontSize: "20px" }}>
//             For New Customers
//           </p>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default RegisterYourSelf;



// /nksxjjfldkfhk
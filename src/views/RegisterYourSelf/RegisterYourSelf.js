import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import { useRef , useState} from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import {Button , Typography } from "@material-ui/core";



import './style.css';
function RegisterYourSelf() {
  var otime = 180;
const [otpTime, setotpTime] = useState(otime);
 const register = useRef(null)
 


const myFun = () => {
  setInterval(
    setotpTime(otpTime - 1), 1000
   )
}
 const getOtp = () => {
myFun();
 }
  return (
    <>
      <Header cust_sign="cust_sign" />
      <h1 style={{"textAlign" : "center", "margin" : "20px 0"}}>
  Would you like to post a query
</h1>
      <div className="StartPage">

        <div className="mainContent">
          <div className="signIn">
          <div className="signBtn">
            <div className="boxOverlay">
            <p style={{"color" : "white", "fontSize" : "22px"}}>
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
               <input type="text" className="form-control" name="userName" id="username"/>
             </div>
             <div className="form-group">
               <label htmlFor="userPass">Password</label>
               <input type="password" className="form-control" name="userPass" id="userpass"/>
             </div>
             <div className="form-group" style={{"display" : "flex"}}>
              
            <input 
            type="text"
            ref = {register}
            name="getOtp"
            disabled style={{"margin" : "0 10px 0 0"}}
            
            />
            
              <Button variant="contained"  size="small"  onClick={getOtp}> Get Otp</Button>
          
             </div>
             <p>{otpTime}</p>
             <Button variant="contained" color="primary"> Log In</Button>
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
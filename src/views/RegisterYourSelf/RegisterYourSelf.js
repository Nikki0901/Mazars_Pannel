import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import { useEffect, useRef , useState} from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import {Button , Typography } from "@material-ui/core";
import './style.css';
function RegisterYourSelf() {
  const  [showResult, setShowResult] = useState(false)

 const register = useRef(null);
 const inc = useRef(null);
 const intervalRef = useRef(null);
 const [timer, setTimer] = useState("00:00")
 function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total/1000) % 60);
  const minutes = Math.floor((total/1000/60) % 60);
  const hours = Math.floor((total/1000*60*60) % 24);
  const days = Math.floor(total/ (1000*60*60*24));
  return{
    total, days, hours, minutes, seconds
  };
}
var b = null;
function startTimer(deadline) {
  let {total, days, hours, minutes, seconds} = getTimeRemaining(deadline);
  if(total>= 0){
    setTimer(
      (hours > 9 ? hours : "0"+ hours) + ":" +
      (minutes > 9 ? minutes : "0" + minutes) + ":" +
      (seconds > 9 ? seconds : "0" + seconds)
    )
  }
  else{
    clearInterval(intervalRef.current);
  }
}

function clearTimer(endtime) {
  setTimer("03:60")

if(intervalRef.current) clearInterval(intervalRef.current);
const id = setInterval(() => {
  startTimer(endtime)
}, 1000)
intervalRef.current = id;
}
function getDeadlineTime () {
  let deadline = new Date();
  deadline.setSeconds(deadline.getSeconds()+180);
  return deadline
}
useEffect(() => {
  clearTimer(getDeadlineTime())
  return () => {
    if(intervalRef.current) clearInterval(intervalRef.current)
  }
}, [])
const  onClickResetButton =  () => {
setShowResult(true)
  clearTimer(getDeadlineTime())
 

}
  return (
    <>
      <Header cust_sign="cust_sign" />
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
            
              <Button variant="contained"  size="small"  onClick={onClickResetButton}> Get Otp</Button>
          
             </div>
           
             <h2 style={{"textAlign" :"center"}}>{showResult ? timer: ""}</h2>
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

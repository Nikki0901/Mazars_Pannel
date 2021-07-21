import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import {Button , Typography } from "@material-ui/core";



import './style.css';
function RegisterYourSelf() {
 
  return (
    <>
      <Header cust_sign="cust_sign" />
      <div className="StartPage">
        <div className="mainContent">
          <div className="signIn">
          <div className="signBtn">
            <div className="boxOverlay">
            <p style={{"color" : "white", "fontSize" : "22px"}}>
             New  User
              
            
               </p>
             
               <Button color="primary" variant="contained">Sign Up</Button>
            </div>
         
          </div>
          </div>
          <div className="signUp">
          
         <Typography variant="h4">
         MTL Login
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
             <div className="form-group">
               <a href="#" style={{"display" : "block"}}>Terms & Conditions</a>
            <div className="form-group">
            <input type="checkbox" name="terms"/>
              <label htmlFor="terms" style={{"margin" : "5px 10px"}}>I Agree</label>
            </div>
             </div>
             <div>
               <Button variant="contained"> Log In</Button>
              
              
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
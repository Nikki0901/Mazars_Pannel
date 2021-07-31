import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import classNames from "classnames";
import Swal from "sweetalert2";
import { Spinner } from "reactstrap";
import { professionName, country, states } from './data';
import { cities } from './city';
import './index2.css';
import Alerts from "../../common/Alerts";
import { ResponsiveEmbed } from "react-bootstrap";

 const SignUp = () => {

  const alert = useAlert();
  const { handleSubmit, register, errors, getValues } = useForm();


  const [otpMsg, setOtpMsg] = useState();
  const [load, setLoad] = useState(false);
  const [store, setStore] = useState(0);
  const [disabled, setDisbutton] = useState(true);
  const [disabled2, setDisbutton2] = useState(false);

  const [password, setPassword] = useState(false);
  
  const [repassword, setRepassword] = useState(false);
  const [passData, setPassData] = useState([])
  const [valiPhone, setValiphone] = useState([]);


  const [State, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [countryCode, setCountryCode] = useState([])
  const [showPlus, setShowPlus] = useState(false)
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [valiEmail, setValiemail] = useState(null)
  const [invalid, setInvalid] = useState(null)
  const [numExist, setNumExist] = useState(null)
  const [numAvail, setNumAvail] = useState(null)
  const [countryId, setCountryId] = useState(null)
  const [indNumError, setIndNumError] = useState(null)
  const [zipCode, setZipCode] = useState('')
  const [zipError, setZipError] = useState(null)
  const [value, setValue] = useState()
  const [suggestions, setSuggestions] = useState([])
  const [passData1, setPassData1] = useState([])
  const [passError, setpassError] = useState()
   const design = {
     "display" : "flex",
     "maxWidth" : "1000px",
     "width" : "100%",
     "justifyContent" : "center",
     "flexWrap" : "wrap",
     "alignItems" : "center",
     "padding" : "10px 20px", 
     "border" : "1px solid black", 
     "borderRadius" : "10px", 
     "lineHeight" : "35px",
     "backgroundColor" : "#fff",
     "letterSpacing" : "0.03em"
   }
   const CountryNumStyle= {
    "display" : "flex", 
    "width" : "76px", 
    "textAlign" : "center",
    "alignItems" : "2.5rem"
  }



   // function 

   // Get Country 
   const getcountry = (key) => {
    setShowPlus(true)
   console.log(key)
if(key == 101){
 setCountryId(key)
}
else{
  setCountryId("")
}

var arrayState = []
    states.filter((data) => {
      if (data.country_id == key) {
        arrayState.push(data)
      }
    });
    setState(arrayState)

    country.filter((data) => {
      if (key == data.id) {
        setCountryCode(data.phoneCode)
  }
 })
};


// Get City function

const getCity = (key) => {
  var arrayCity = []

  cities.filter((data) => {
    if (data.state_id === key) {
      arrayCity.push(data)
    }
  });
  setCity(arrayCity)
}


//eamil onchange
const emailHandler = (e) => {
  setEmail(e.target.value);
};
//email validaation with api
const emailValidation = (key) => {

  var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(validRegex)) {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("type", 1);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/validateregistration`,
      data: formData,
    })
      .then(function (response) {
        console.log("resEmail-", response);
        if (response.data.code === 1) {
          setValiemail(response.data.result)
          setInvalid('')
        } else if (response.data.code === 0) {
          setInvalid(response.data.result)
          setValiemail('')
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  }
  else {
    console.log("error")
  }

}


   return(
    <>
    <div className="custom_form">
    <form style={design} autoComplete="off">
      <div className="form-group customStyle">
        <label>Name</label>
      <input type="text"
      className="form-control" 
      name="c_name"
       placeholder="Pleae enter your name" />
      </div>


    <div className="form-group customStyle">
      <label>Email</label>
      <input type="email"
       name="p_email"
       onChange={(e) => emailHandler(e)}
       onBlur={emailValidation}
       className={classNames("form-control", {
         "is-invalid": errors.p_email,
       })}
      placeholder="Please enter your email"/>
      {
                      valiEmail ?
                        <p className="completed">
                          {valiEmail}
                        </p>
                        :
                        <p className="declined">{invalid}</p>
                    }
    </div>


    <div className="form-group customStyle">
      <label>Occupation/ Profession*</label>
     <select
     name="Profession"
     className="form-control"
     placeholder="Please enter your profession">
       {professionName.map((element, index) => <option key={index}>{element.city}</option>)}
     </select>
    </div>


    <div className="form-group customStyle">
      <label>Country*</label>
     <select
     name="country"
     placeholder="Please enter your country name"
     id="state"
     name="p_country"
     className={classNames("form-control", {
     "is-invalid": errors.p_country,
     })}
     onChange={(e) => getcountry(e.target.value)}>
         <option>Please select country</option>
       {country.map((element) => <option key={element.id} value={element.id}>{element.name}</option>)} 
     </select>
    </div>


    <div className="form-group customStyle">
      <label>State*</label>
     <select
     name="state"
     className={classNames("form-control", {
      "is-invalid": errors.p_state,
    })}
    onChange={(e) => getCity(e.target.value)}
     placeholder="Please enter your state">
         <option>Please select State</option>
      {State.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
     </select>
    </div>


    <div className="form-group customStyle">
      <label>City*</label>
     <select
     name="city"
     className="form-control"
     placeholder="Please enter your city">
       <option>Please select city</option>
       {city.map((p, index) => (
        
                        <option key={index} value={p.city}>
                          {p.name}
                        </option>
                      ))}
       
     </select>
    </div>
  
    <div className="form-group customStyle customPhone">
    <select
                        name="p_code"
                        disabled={true}
                        style={CountryNumStyle}
                       
                      >
                        <option>
                          {showPlus ? "+" + countryCode : null}
                        </option>
                      </select>
       <span>
       <label>Mobile Number</label>
      <input type="text" 
      name="mobileNumber"
      className="form-control"
       placeholder="Pleae enter your name" />
         </span>
      </div>

      <div className="form-group customStyle">
        <label>Zipcode</label>
      <input type="text" 
       className="form-control"
      name="c_zipCode"
       placeholder="Pleae enter your name" />
      </div>
      <div className="form-group customStyle">
        <label>Password</label>
      <input type="password" 
      name="c_password"
      className="form-control"
       placeholder="Pleae enter your name" />
      </div>
      <div className="form-group customStyle">
        <label>Confirm Password</label>
      <input type="password" 
       className="form-control"
      name="confirmPassword"
       placeholder="Pleae enter your name" />
      </div>
      <div className="form-group customStyle">
        <button>Get Otp</button>
      </div>
    </form>   
    </div>
   
    </>
  )
}
export default SignUp;
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from "../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import Alerts from "../../common/Alerts";


const Schema = yup.object().shape({
    p_otp: yup.string().required("mandatory"),
});


function VerifyOTP({ email, uid }) {
    const { handleSubmit, register, errors, reset } = useForm({
        resolver: yupResolver(Schema),
    });

    const history = useHistory();
    const [time, setTime] = useState('');
    const [disabled, setDisabled] = useState(false)
    const [num, changeNum] = useState(false);

    useEffect(() => {
        console.log("call useEffect button")
        var timerOn = true;
        function timer(remaining) {
            var s = remaining % 60;
            s = s < 10 ? '0' + s : s;
            setTime(s)
            remaining -= 1;
            if (remaining >= 0 && timerOn) {
                setTimeout(function () {
                    timer(remaining);
                }, 1000);
                return;
            }
            setDisabled(true)

        }
        timer(60);
    }, [num]);

    useEffect(() => {
        console.log("call useEffect")
        var timerOn = true;
        function timer(remaining) {
            var s = remaining % 60;
            s = s < 10 ? '0' + s : s;
            setTime(s)
            remaining -= 1;
            if (remaining >= 0 && timerOn) {
                setTimeout(function () {
                    timer(remaining);
                }, 1000);
                return;
            }
            setDisabled(true)

        }
        timer(60);
    }, []);

    const validOtp = (e) => {
        if (isNaN(e.target.value)) {
            Alerts.ErrorNormal("Please enter number only")
        }
    }

    const onSubmit = (value) => {
        console.log("value :", value);

        let formData = new FormData();
        formData.append("email", email);
        formData.append("otp", value.p_otp);

        axios({
            method: "POST",
            url: `${baseUrl}/customers/verifyloginotp`,
            data: formData,
        })
            .then(function (response) {
                console.log("res-", response);
                console.log("res-", response.data["otp "]);

                if (response.data.code == 1) {
                    Alerts.SuccessLogin()
                    localStorage.setItem("userid", JSON.stringify(response.data.user_id));
                    localStorage.setItem("name", JSON.stringify(response.data.name));
                    history.push("/customer/dashboard");
                } else {
                    Alerts.ErrorNormal("Incorrect OTP")
                    reset();
                }
            })
            .catch((error) => {
                console.log("erroror - ", error);
            });
    }


    const resendOtp = () => {
        changeNum(true)
        let formData = new FormData();
        formData.append("email", email);
        formData.append("uid", uid);

        axios({
            method: "POST",
            url: `${baseUrl}/customers/regenrateotp`,
            data: formData,
        })
            .then(function (response) {
                console.log("res-", response);
                if (response.data.code === 1) {
                    Alerts.SuccessNormal("An OTP sent to your mail")
                    setDisabled(false)
                }
                else if (response.data.code === 0) {
                    Alerts.ErrorNormal("Some thing went wrong, please try again")
                }
            })
            .catch((error) => {
                console.log("erroror - ", error);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    disabled ?
                        null
                        :
                        <div className="form-group">
                            <label className="form-label">Enter Your OTP <span className="declined">*</span></label>
                            <input
                                type="text"
                                className={classNames("form-control", {
                                    "is-invalid": errors.p_otp,
                                })}
                                name="p_otp"
                                ref={register}
                                placeholder="Enter your OTP"
                                onChange={(e) => validOtp(e)}
                            />
                            <small class="text-center">
                                Note: OTP is valid for {time} seconds.
                            </small>
                        </div>
                }


                <div className="form-group">
                    {
                        disabled ?
                            <button type="submit" class="btn btn-success btn-sm" onClick={resendOtp}>RESEND OTP</button>
                            :
                            <button type="submit" className="btn btn-primary btn-sm">
                                Login
                            </button>
                    }
                </div>
            </form>
        </div>
    );
}


export default VerifyOTP;

// import React, { useEffect, useState } from 'react'
// import Header from "../../components/Header/Header";
// import Footer from '../../components/Footer/Footer'
// import axios from 'axios'
// import { baseUrl } from "../../config/config";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import classNames from "classnames";
// import { useHistory } from "react-router-dom";
// import Alerts from "../../common/Alerts";


// const Schema = yup.object().shape({
//     p_otp: yup.string().required("mandatory"),
// });

// function VerifyOTP({ email, uid }) {
//     const { handleSubmit, register, errors, reset } = useForm({
//         resolver: yupResolver(Schema),
//     });

//     const history = useHistory();
//     const [time, setTime] = useState('')
//     const [disabled, setDisabled] = useState(false)


//     useEffect(() => {
//         console.log("call useEffect")
//         var timerOn = true;
//         function timer(remaining) {
//             var s = remaining % 60;
//             s = s < 10 ? '0' + s : s;
//             setTime(s)
//             remaining -= 1;
//             if (remaining >= 0 && timerOn) {
//                 setTimeout(function () {
//                     timer(remaining);
//                 }, 1000);
//                 return;
//             }
//             setDisabled(true)
//         }
//         timer(60);
//     }, []);



//     const onSubmit = (value) => {
//         console.log("value :", value);

//         let formData = new FormData();
//         formData.append("email", email);
//         formData.append("otp", value.p_otp);

//         axios({
//             method: "POST",
//             url: `${baseUrl}/customers/verifyloginotp`,
//             data: formData,
//         })
//             .then(function (response) {
//                 console.log("res-", response);
//                 console.log("res-", response.data["otp "]);

//                 if (response.data.code == 1) {
//                     Alerts.SuccessLogin()
//                     localStorage.setItem("userid", JSON.stringify(response.data.user_id));
//                     localStorage.setItem("name", JSON.stringify(response.data.name));
//                     history.push("/customer/dashboard");
//                 } else {
//                     Alerts.ErrorOTP()
//                     reset();
//                 }
//             })
//             .catch((error) => {
//                 console.log("erroror - ", error);
//             });
//     }


//     const resendOtp = () => {
//         let formData = new FormData();
//         formData.append("email", email);
//         formData.append("uid", uid);

//         axios({
//             method: "POST",
//             url: `${baseUrl}/customers/regenrateotp`,
//             data: formData,
//         })
//             .then(function (response) {
//                 console.log("res-", response);
//                 if (response.data.code === 1) {
//                     setDisabled(false)
//                 }
//             })
//             .catch((error) => {
//                 console.log("erroror - ", error);
//             });
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 {
//                     disabled ?
//                         null
//                         :
//                         <div className="form-group">
//                             <label className="form-label">Enter Your OTP *</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="p_otp"
//                                 ref={register}
//                                 placeholder="Enter your otp"
//                             />
//                             <small class="text-center">
//                                 Note: OTP is valid for {time} seconds.
//                             </small>
//                         </div>
//                 }


//                 <div className="form-group">
//                     {
//                         disabled ?
//                             <button type="submit" class="btn btn-success" onClick={resendOtp}>RESEND OTP</button>
//                             :
//                             <button type="submit" className="btn btn-primary btn-sm">
//                                 Login
//                             </button>
//                     }
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default VerifyOTP;
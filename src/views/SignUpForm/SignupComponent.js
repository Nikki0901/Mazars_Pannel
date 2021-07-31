import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from "../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";



const Schema = yup.object().shape({
    p_otp: yup.string().required("mandatory"),
});



function SignupComponent() {
    const { handleSubmit, register, errors, reset } = useForm({
        resolver: yupResolver(Schema),
    });

    
    const [time, setTime] = useState('')
    const [disabled, setDisabled] = useState(false)


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
        timer(10);
    }, []);



    const onSubmit = (value) => {
        console.log("value :", value);
    }


    const resendOtp = () => {
        console.log("resendOtp")
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label className="form-label">Enter Your OTP <span className="declined">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        name="p_otp"
                        ref={register}
                    />
                    <small class="text-center">
                        Note: OTP is valid for {time} seconds.
                    </small>
                </div>



                <div className="form-group">
                    {
                        disabled ?
                            <button type="submit" class="btn btn-success" onClick={resendOtp}>RESEND OTP</button>
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


export default SignupComponent;


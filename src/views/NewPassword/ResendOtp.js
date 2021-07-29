import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";



function ResendOtp({ id, setDisabled }) {

    const { handleSubmit, errors, reset } = useForm();

    const onSubmit = (value) => {
        // console.log("value :", value);

        let formData = new FormData();
        formData.append("email", id);
        formData.append("p", "forgot");

        axios({
            method: "POST",
            url: `${baseUrl}/customers/forgototp`,
            data: formData,
        })
            .then(function (response) {
                console.log("res-", response);
                if (response.data.code === 1) {
                    setDisabled(false)
                }
            })
            .catch((error) => {
                console.log("erroror - ", error);
            });
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="heading">
                    {/* <h2>Resend Otp</h2> */}
                    <button type="submit" class="btn btn-success">RESEND OTP <span className="declined">*</span></button>
                </div>
            </form>
        </>
    );
}

export default ResendOtp;
import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Alerts from "../../../common/Alerts";



function ResendOtp({ id, setDisabled, getTime }) {

    const { handleSubmit, errors, reset } = useForm();

    const onSubmit = (value) => {

        let formData = new FormData();
        formData.append("email", id);
      
        axios({
            method: "POST",
            url: `${baseUrl}/tl/forgototp`,
            data: formData,
        })
            .then(function (response) {
                console.log("res-", response);
                if (response.data.code === 1) {
                    Alerts.SuccessNormal("As per your request , OTP has been sent to your email address.")
                    setDisabled(false)
                    getTime();
                }
            })
            .catch((error) => {
                console.log("erroror - ", error);
            });
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ paddingTop: "10px" }}>
                    <button type="submit" class="btn btn-success">SEND OTP</button>
                </div>
            </form>
        </>
    );
}

export default ResendOtp;
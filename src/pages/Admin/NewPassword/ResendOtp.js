import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";



function ResendOtp({ id, setDisabled, getTime }) {

    const { handleSubmit, errors, reset } = useForm();

    const onSubmit = (value) => {

        let formData = new FormData();
        formData.append("email", id);
      
        axios({
            method: "POST",
            url: `${baseUrl}/admin/forgototp`,
            data: formData,
        })
            .then(function (response) {
                console.log("res-", response);
                if (response.data.code === 1) {
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
                    <button type="submit" class="btn btn-success">RESEND OTP</button>
                </div>
            </form>
        </>
    );
}

export default ResendOtp;
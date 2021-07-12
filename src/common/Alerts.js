import Swal from "sweetalert2";

// SuccessLogin
const SuccessLogin = () => {
    return (
        Swal.fire(
            'Success',
            'Login Successfully',
            'success'
        )
    )
}


// ErrorLogin
const ErrorLogin = () => {
    return (
        Swal.fire(
            "Oops...",
            "Errorr : Incorrect Email OR Password",
            "error"
        )
    )
}


// Success
const SuccessMsg = (variable, key) => {
    return (
        Swal.fire(
            'Success',
            ` ${variable} </br> </br> ${key}`,
            'success'
        )
    )
}


// SuccessNormal
const SuccessNormal = (variable) => {
    return (
        Swal.fire(
            'Success',
            ` ${variable} </br> `,
            'success'
        )
    )
}




export default {
    SuccessLogin,
    ErrorLogin,
    SuccessMsg,
    SuccessNormal
};




// Swal.fire(`oops : ${response.data.result}`)
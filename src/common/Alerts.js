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
            "Error : Incorrect Email OR Password",
            "error"
        )
    )
}


// Success
const SuccessMsg = (variable, key) => {
    return (
        Swal.fire(
            'Success',
            ` ${variable} </br> </br> ${key.faill} </br></br>  ${key.success}`,
            'success'
        )
    )
}


// Success
const SuccessReport = (variable, key) => {
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


// ErrorLogin
const ErrorDelete = () => {
    return (
        Swal.fire(
            "Error",
            "You have not permission to delete scheduled call.",
            "error"
        )
    )
}

// ErrorLogin
const ErrorEdit = () => {
    return (
        Swal.fire(
            "Error",
            "You have not permission to edit scheduled call.",
            "error"
        )
    )
}



export default {
    SuccessLogin,
    ErrorLogin,
    SuccessMsg,
    SuccessNormal,
    SuccessReport,
    ErrorDelete,
    ErrorEdit,
};




// Swal.fire(`oops : ${response.data.result}`)
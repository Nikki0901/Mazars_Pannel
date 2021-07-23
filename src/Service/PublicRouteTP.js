import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";


const PublicRoutesTP = ({ component: Component, ...rest }) => {

    const location = useLocation();
    
    return (
        <Route
            {...rest}
            component={(props) => {
                const token = window.localStorage.getItem("tpkey");

                if (token) {
                    return (
                        <>
                            <Redirect to={"/taxprofession/dashboard"} />
                        </>
                    )
                } else {
                    return (
                        <>
                            <Component {...props} />
                        </>
                    )
                }
            }}
        />
    );
};


export default PublicRoutesTP;



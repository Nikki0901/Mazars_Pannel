import React from 'react';
import { Route, Redirect } from "react-router-dom";
// import { checkLoginToken } from '../../helpers/login'

export const TlAuth = ({ component: Component, auth, ...rest }) => {
    const [storagecheck, setstoragecheck] = React.useState(localStorage.getItem('tlkey'));
    return (
        <Route
            {...rest} render={props => {
                if (storagecheck == null) {
                    return (<Redirect to="/teamleader/login" />)
                }
                else {
                    return (<Component {...props} />)
                }
            }
            } />
    )

}
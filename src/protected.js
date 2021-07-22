import React from 'react';
import { Route, Redirect } from "react-router-dom";
// import { checkLoginToken } from '../../helpers/login'

export const CostumerAuth = ({ component: Component, auth, ...rest }) => {
    const [storagecheck, setstoragecheck] = React.useState(localStorage.getItem('userid'));
    return (
        <Route
            {...rest} render={props => {
                if (storagecheck == null) {
                    return (<Redirect to='/customer/register-yourself' />)
                }
                else {
                    return (<Component {...props} />)
                }
            }
            } />
    )

}
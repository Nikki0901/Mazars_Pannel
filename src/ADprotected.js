import React from 'react';
import { Route, Redirect } from "react-router-dom";
// import { checkLoginToken } from '../../helpers/login'

export const AdminAuth = ({ component: Component, auth, ...rest }) => {
    const [storagecheck, setstoragecheck] = React.useState(localStorage.getItem('adminkey'));
    return (
        <Route
            {...rest} render={props => {
                if (storagecheck == null) {
                    return (<Redirect to='/admin/login' />)
                }
                else {
                    return (<Component {...props} />)
                }
            }
            } />
    )

}
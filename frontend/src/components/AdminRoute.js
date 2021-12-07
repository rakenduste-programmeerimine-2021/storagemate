import React, { useContext } from "react"
import { Context } from "../store";
import { Redirect, Route } from 'react-router-dom'

const AdminRoute = ({ component: Component, ...rest }) => {
    const [state,] = useContext(Context);   
    const isLoggedIn = state?.auth?.user?.isAdmin;
    
   
    


    return (
        <Route
        {...rest}
        render={props =>
            isLoggedIn ? (
            <Component />
            ) : (
            <Redirect to={{ pathname: '/adminlogin', state: { from: props.location } }} />
            )
        }
        />
    )
}

export default AdminRoute;
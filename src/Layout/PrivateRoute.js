import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({component: Component, ...rest}) => (

    <Route
        {...rest}
        render={
            props =>
            !localStorage.getItem('isAuthenticated') 
                ? <Redirect to='/Login' />
                : <Component {...props} />
        }
    />
    //like this it will use computedMAtch
    // return localStorage.getItem('isAuthenticated') 
    //         ? <Component {...props}/> 
    //         : <Redirect to={'/Login'}/>
);
import React from 'react'
import { Redirect } from 'react-router-dom'

export const PrivateRoute = ({component: Component, ...props}) => {

    return localStorage.getItem('isAuthenticated') 
            ? <Component {...props}/> 
            : <Redirect to={'/Login'}/>
}
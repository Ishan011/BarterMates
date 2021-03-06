// Setting component for Public Routes
import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PublicRoute = ({component : Component,...rest})=>{
    const { isAuthenticated } = useContext(AuthContext);

    return(
        <Route {...rest} render={props =>{
            if(isAuthenticated)
                // granting access to authenticated user 
                return <Redirect to={{ pathname: '/profile', 
                                       state : {from : props.location}}}/>
                                       
            return <Component {...props}/>
        }}/> 
    )
}

export default PublicRoute;

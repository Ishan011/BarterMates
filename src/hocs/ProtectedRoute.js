import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const ProtectedRoute = ({component : Component, roles, ...rest})=>{
    const { isAuthenticated, user, setModalState} = useContext(AuthContext);

    return(
        <Route exact {...rest} render={props =>{
            if(!isAuthenticated){
                // setting modalstate to login and unauthorize user to login page
                setModalState('login')
                return <Redirect to={{ pathname: '/', 
                            state : {from : props.location}}}/>
            }
            return <Component {...props}/>
        }}/>
    )
}

export default ProtectedRoute;

import React,{createContext, useState, useEffect} from 'react'
import {
    isAuthenticatedCheck
} from '../Services/auth-service';

export const AuthContext = createContext();
// Initializing user model state
export default ({children})=>{
    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [modalState, setModalState] = useState(false);

    useEffect(()=>{
        console.log("auth context called")
        isAuthenticatedCheck().then(data =>{
            console.log("from context", data)
            setUser(data.user);
            if(data.isAuthenticated){
                setIsAuthenticated(data.isAuthenticated);
                setModalState(false)
            }
            setIsLoaded(true);
        })
    },[]);

    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> : 
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated, modalState, setModalState}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
}
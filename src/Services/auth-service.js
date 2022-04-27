// Sending authentication request and handling responses
const axios = require('axios')

const googleLogin = async(data)=>{
    try{
        const response = await axios.post("/api/auth/google-login",data);
        return response;
    }catch(err){
        console.log(err)
        return false
    }
}

// check authentication status 
const isAuthenticatedCheck = async()=>{
    try{
        const response = await axios.get("/api/auth/is-authenticated")
         return response.data;
    }catch(err){
        console.log(err)
        return false;
    }
}

const logout = async()=>{
    try{
        const response = await axios.get("/api/auth/logout")
        return response.data;
    }catch(err){
        console.log(err);
        return false;
    }
}

const loginUser = async(data)=>{
    try{
        const response = await axios.post("/api/auth/login",data);
        return response;
    }catch(err){
        console.log(err)
        return false
    }
}


const registerUser = async(data)=>{
    try{
        const response = await axios.post("/api/auth/register",data);
        return response;
    }catch(err){
        console.log(err)
        return false
    }
}


export{
    googleLogin,
    isAuthenticatedCheck,
    logout,
    loginUser,
    registerUser
}
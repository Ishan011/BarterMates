// Responsible for creation of tokens 
const {
    OAuth2Client
} = require('google-auth-library');
const UserModel = require('../models/users-model')

const jwt = require('jsonwebtoken')
   
const client = new OAuth2Client("")

const getSignedToken = (id) =>{
    const jwtToken = jwt.sign({
        id
    },"jwt_secret");
    return jwtToken;
}

const googleLogin = async(idToken)=>{
    const data = await client.verifyIdToken({idToken, audience:""})

    if(data && data.payload){
        const {
            email,
            hd,
            sub,
            given_name,
            family_name
        } = data.payload;
        
        let user = await UserModel.findOne({
            email
        })
        
        if(!user){
            user = new UserModel({
                email,
                hd,
                sub,
                name:given_name +" " + family_name
            })
            await user.save();
        }

        const jwtToken = jwt.sign({
            userId: user._id,
            hd,
            email  
        },"jwt_secret")
        return {
            jwtToken,
            user: {
                userId: user._id,
                hd,
                email  
            }
        };
    }

    return false;
}

const verifyJwt = (token)=>{
    try{
        const payload = jwt.verify(token, "jwt_secret");
        return payload;
    }catch(err){
        return false;
    }
}

module.exports ={
    googleLogin,
    verifyJwt,
    getSignedToken
}
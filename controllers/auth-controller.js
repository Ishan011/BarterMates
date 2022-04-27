// This controller is responsible for Authentication
const authHelper = require('../helpers/auth-helper'); 
const User = require('../models/users-model');

// For signing in users using google authentication
const googleLogin = async(req, res)=>{
    try{    
        const {
            tokenId
        } = req.body;

        const data = await authHelper.googleLogin(tokenId);

        res.cookie("AUTH_TOKEN", data.jwtToken)
        
        return res.send({
            user: data.user,
            isAuthenticated:true
        })
    }catch(err){
        console.log(err)
        return res.send(false)
    }
}

// For registering users into the platform
const register = async(req,res)=>{
    try{
        const {
            email,
            password,
            name
        } = req.body;

        // Checking whether the email exists in the database
        let user = await User.findOne({
            email
        });
        if(user){
            return res.status(500).json({
                status: false,
                msg: "email already exist"
            })
        }
        user = new User({
            email,
            password,
            name
        })
        // console.log(user)
        await user.save();

        const token = authHelper.getSignedToken(user._id);
        res.cookie("access-token", token,{httpOnly: true, sameSite: true});
        return res.status(200).json({
            status: true,
            msg: "Account created"
        })
    }catch(err){
        // console.log(err);
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

// Sending asynchronous request for letting users login into the platform
const login = async(req,res)=>{
    try{
    
        // console.log(req.body)

            // searching for credentials to be matched in database
            const user  = await User.findOne({
                email: req.body.email,
                password: req.body.password
            })
            
            if(!user){
                return res.status(500).json({
                    status: false,
                    msg: "Something went wrong"
                })
            }

            // Assigning JWD token to further authorization
            const token = authHelper.getSignedToken(user._id);
            // console.log(token)

            const {
                email,
                name
            } = user;

            res.cookie("access-token", token,{httpOnly: true, sameSite: true});
            return res.status(200).json({
                status: true,
                isAuthenticated: true,
                user: {
                    email,
                    name
                }
            })
    }catch(err){
        // console.log(err);
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

// Allowing users to signout from their respective accounts
const logout = (req,res)=>{
    try{
        console.log("call for logout")
        res.clearCookie("access-token");
        return res.json({
            status: true,
            user: {
                email: "",
                name: ""
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

// Checking whether the user is authenticated by verifying the exist token
const isAuthenticated = async(req, res)=>{
    try{
        console.log("checking auth")
        const authToken =  req.cookies["access-token"];

        if(!authToken){
            return res.send({
                user:{},
                isAuthenticated: false
            })
        }
        const payload = authHelper.verifyJwt(authToken);

        console.log(payload)

        if(payload.id){
            const user = await User.findById(payload.id)
            console.log(user)
            if(user){
                return res.status(200).json({
                    user:{
                        name: user.name,
                        email: user.email
                    },
                    isAuthenticated: true
                })
            }
        }
        return res.send({
            user:{
                name: "",
                email: ""
            },
            isAuthenticated: false
        })
    }catch(err){
        console.log(err);
        return res.send({
            user:{
                name: "",
                email: ""
            },
            isAuthenticated: false
        })
    }
}

module.exports ={
    googleLogin,
    isAuthenticated,
    logout,
    register,
    login
}
const jwt = require('jsonwebtoken');

// Using middleware to check login
const authorize = async(req, res, next)=>{
    try{
        if(!req.cookies["access-token"]){
            return res.redirect('/login');
        }
        jwt.verify(req.cookies["access-token"], "jwt_secret", (err, payload)=>{
            if(err){
                return res.redirect('/login');
            }else{
                req.id = payload.id
                next();
            }
        })
    }catch(err){
        return res.redirect('/login')
    }
}


module.exports ={
    authorize
}
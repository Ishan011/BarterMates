// User data model 
// create schema for user

// Tutorial followed to learn mongoose 
// https://www.youtube.com/watch?v=DZBGEVgL2eE&ab_channel=WebDevSimplified

const mongoose =require('mongoose') 


const UserSchema = new mongoose.Schema({
     // specifying type of variables
    name: String,
    email: String,
    password: String,
    bio: String
},{
    timestamps:true
})


module.exports = mongoose.model('User', UserSchema);
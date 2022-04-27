// User data model 
// create schema for chatrooms

// Tutorial followed to learn mongoose 
// https://www.youtube.com/watch?v=DZBGEVgL2eE&ab_channel=WebDevSimplified

const mongoose = require('mongoose');
const {
    ObjectId
} = mongoose.Schema.Types;

const ChatRoomSchema = new mongoose.Schema({
    user1: {
        type: ObjectId,
        ref: "User"
    },
    user2: {
        type: ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("ChatRoom", ChatRoomSchema)
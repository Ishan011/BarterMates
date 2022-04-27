// Retrieving chat room for a user

const ChatRoomModel = require('../models/chat-room-model');

const getChatRoom = async(user1, user2)=>{
    try{

        // Trying to find chatroom for the required users
        let chatRoom = await ChatRoomModel.findOne({
            user1,
            user2
        })
        if(!chatRoom){
            chatRoom = await ChatRoomModel.findOne({
                user1: user2,
                user2: user1
            })
        }
        return chatRoom

    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports ={
    getChatRoom
}

// This controller is responsible for Chat function
const chatRoomHelper = require('../helpers/chat-room-helper');
const ChatRoomModel = require('../models/chat-room-model');


// For creating new chat room between two parties
const getChatRoom = async(req,res) =>{
    try{
        const {
            user2
        } = req.body;



        const user1 = req.id;

        if(user1 == user2){
            return res.status(200).json({
                status: false,
                msg: "Something went wrong"
            })
        }


        let chatRoom = await chatRoomHelper.getChatRoom(user1, user2);

        if(!chatRoom){
            chatRoom = new ChatRoomModel({
                user1,
                user2,
            })
            await chatRoom.save();
        }
        return res.status(200).json({
            status: true,
            chatRoom
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }   
}


module.exports= {
    getChatRoom
}


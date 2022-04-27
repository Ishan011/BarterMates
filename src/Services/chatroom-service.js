// Sending chatroom request and handling responses
const axios = require('axios');

const getChatRoom = async(data)=>{
    try{
        const response = await axios.post("/api/chat-room/get-chatroom",data);
        return response.data;
    }catch(err){
        console.log(err)
        return false
    }
}

export {
    getChatRoom
}
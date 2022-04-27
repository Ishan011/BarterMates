// Creating component for chat 
import React,{useEffect, useState} from 'react';

import {
    getChatRoom
} from '../../Services/chatroom-service';
import {db} from '../../firebase';
import SendMessage from './SendMessage';
import { Alert } from 'reactstrap';



const ChatRoom = (props) =>{

    const [user1Id, setUser1Id] = useState("");
    const [chatRoomId, setChatRoomId] = useState("");
    const [messages, setMessages] = useState([])


    useEffect( () =>{
        console.log(chatRoomId)
        db.collection("messages")
        .where("chatRoomId", "==", chatRoomId)
        .orderBy('createdAt')
        .limit(50 ).onSnapshot((snapshot)=>{
            console.log(snapshot.docs.map(doc=>doc.data()))
            setMessages(snapshot.docs.map(doc=>doc.data()))
        })
    },[chatRoomId])

    const user2Id = props.match.params.id;
    useEffect(()=>{
        (async()=>{
            const response = await getChatRoom({
                user2: user2Id
            })
            if(response && response.status){

                setChatRoomId(response.chatRoom._id)

                if(response.chatRoom.user2  ==  user2Id){
                    setUser1Id(response.chatRoom.user1)
                }else{
                    setUser1Id(response.chatRoom.user2)
                }
            }
        })()
    },[])

    return<>
        Chat
        {
            messages.map(element =>(
                <>
                    {
                        element.fromUser === user1Id?
                        <Alert color='primary'>    
                            {element.message}
                        </Alert>
                        :<Alert style={{backgroud: "#999"}}>    
                            {element.message}
                        </Alert>
                    }
                    
                </>
                
            ))
        }
        <SendMessage
            fromUser={user1Id}
            toUser = {user2Id}
            chatRoomId = {chatRoomId}
        />
    </>
}

export default ChatRoom;
// Creating component for chat message
import React, {useEffect, useState} from 'react';
import {db} from '../../firebase';
import SendMessage from './SendMessage';

const Chat = (props) =>{
    const [messages, setMessages] = useState([])

    useEffect( () =>{
        db.collection("messages")
        .where("message", "==","message2")
        .limit(50 ).onSnapshot((snapshot)=>{
            setMessages(snapshot.docs.map(doc=>doc.data()))
        })
    },[])

    return<>
        Chat
        {
            messages.map(element =>(
                <p>{element.message}</p>
            ))
        }
        <SendMessage/>
    </>
}


export default Chat;
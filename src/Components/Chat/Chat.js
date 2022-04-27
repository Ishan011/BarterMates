// Creating component for chat message
import React, {useEffect, useState} from 'react';

// importing firebase database
import {db} from '../../firebase';
import SendMessage from './SendMessage';

// Using useEffect and useState hooks
const Chat = (props) =>{
    const [messages, setMessages] = useState([])

    useEffect( () =>{
        db.collection("messages")
        .where("message", "==","message2")
        .limit(50 ).onSnapshot((snapshot)=>{
            setMessages(snapshot.docs.map(doc=>doc.data()))
        })
    },[])

      // rendering JSX
    return<>
        Chat
        {
            messages.map(element =>(
                <p>{element.message}</p>
            ))
        }
        {/* Using sendmessage component */}
        <SendMessage/>
    </>
}


export default Chat;
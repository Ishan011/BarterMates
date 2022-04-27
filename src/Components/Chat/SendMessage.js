// Component responsible for seding messages
import { useState } from "react";

// importing reactstrap components
import { Input, Form, Button, Container } from "reactstrap";

// importing firebase database
import { db, auth } from "../../firebase";
import firebase from "firebase/compat";

const SendMessage = (props) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // Adding messages into firebase datastore
  const handleSubmit = async (event) => {
    event.preventDefault();
    await db.collection("messages").add({
      message,
      fromUser: props.fromUser,
      toUser: props.toUser,
      chatRoomId: props.chatRoomId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Input
            name="message"
            id="message"
            onChange={handleInputChange}
            value={message}
          />
          <button type="submit" className="sendMesg">Send Message</button>
        </Form>
      </Container>
    </>
  );
};

export default SendMessage;

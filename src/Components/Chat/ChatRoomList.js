// Component to show list of open rooms for any given user
import { getChatRoomList } from "../../Services/user-services";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import "./ChatRoom.css";

const ChatroomList = (props) => {
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getChatRoomList();
      if (response && response.status) {
        console.log("response", response);
        setRoomList([...response.rooms]);
      }
    })();
  },[]);

  return (
    <Container>
      <div className="chatBlock card shadow-sm">
        <p className="h4">Your opened chats</p>

        {roomList.map((room) => (
          <Link to={"/chat/" + (room.user2 && room.user2._id?room.user2._id :room.user1._id)} className="chatProfileLink">
            <div className="chatProfile">
              <div>
                <div className="chatProfileImg"></div>
              </div>
              <div className="chatProfileName">
                  {room.user1 && room.user1.name
                    ? room.user1.name
                    : room.user2 && room.user2.name
                    ? room.user2.name
                    : "User"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default ChatroomList;

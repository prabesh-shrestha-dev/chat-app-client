import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useSocket from "../hooks/useSocket";
import { useAuth } from "../context/authContext";
import { useChatContext } from "../context/chatContext";
import { useSocketContext } from "../context/socketContext";

const ChatList = () => {

  const [chats, setChats] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { setCurrentChatId } = useChatContext();
  const socket = useSocketContext();

  useEffect(() => {
    const getChatList = async () => {
      try {
        const response = await axiosPrivate.get("/chats");
        setChats(response.data.chats);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    getChatList();
  }, []);

  useSocket("chat-created", (newChat) => {
    setChats(prev => [newChat, ...prev]);
  });


  return (
    <div>
      <span>ChatList</span>
      { chats.length !== 0 ?
        chats.map((chat, index) => {
          const otherUser = chat.users.find(user => user._id !== auth.userId);
          const { firstName, middleName, lastName, phoneNumber } = otherUser;
          return (
            <button 
              key={index}
              onClick={() => {
                setCurrentChatId(chat._id)
                socket.emit('join-room', chat._id);
              }}
            >
              {`${phoneNumber}, ${firstName}`}
            </button>
          )
      }) : <div>No chats</div> }
    </div>
  )
};

export default ChatList;
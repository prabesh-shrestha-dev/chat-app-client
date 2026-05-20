import { useMemo } from "react";
import { useAuth } from "../context/authContext";
import { useChatContext } from "../context/chatContext";
import { useSocketContext } from "../context/socketContext";
import "./ChatListItem.css";

const ChatListItem = ({ chat }) => {

  const { currentChatId, setCurrentChatId, setChatStatus } = useChatContext();
  const socket = useSocketContext();
  const { auth } = useAuth();

  const isSelected = currentChatId === chat._id;

  const otherUser = useMemo(() => {
    return chat.users.find(user => user._id !== auth.userId);
  }, [chat.users, auth.userId]);

  const fullName = [
    otherUser?.firstName,
    otherUser?.middleName,
    otherUser?.lastName
  ]
    .filter(Boolean)
    .join(" ");

  const phoneNumber = otherUser?.phoneNumber;

  const latestMessageTime = useMemo(() => {
    if (!chat.latestMessageAt) return "";

    return new Date(chat.latestMessageAt).toLocaleDateString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [chat.latestMessageAt]);

  const latestMessageText = useMemo(() => {
    if (!chat.latestMessage) {
      return { content: "Chat created..." };
    }

    const isMine = 
      chat.latestMessage?.sender?._id === auth.userId;

    return {
      isMine,
      content: chat.latestMessage.content
    };
  }, [chat.latestMessage, auth.userId]);

  const handleChatSelect = () => {
    if (isSelected) {
      socket.emit("leave-room", chat._id);
      setCurrentChatId('');
      setChatStatus(false);
      return;
    }

    if (currentChatId) {
      socket.emit("leave-room", currentChatId);
    }

    socket.emit("join-room", chat._id);
    setCurrentChatId(chat._id);
    setChatStatus(true);
  }

  return (
    <article
      className={`chat-item ${
        isSelected ? "selected-chat-item" : ""
      }`}
      onClick={handleChatSelect}
    >
      <section className="chat-item-header">
        <div className="chat-user-info">
          <h4 className="chat-user-name">
            {fullName || phoneNumber}
          </h4>

          {fullName && phoneNumber ? 
            <p className="chat-user-phone"> 
              {phoneNumber}
            </p> : null}
        </div>
        <span className="chat-time">
          {latestMessageTime}
        </span>
      </section>
      
      <section className="chat-item-message">
          <p>
            {latestMessageText.isMine && <strong>You: </strong>}
            {latestMessageText.content}
          </p>
      </section>
    </article>
  )
};

export default ChatListItem;
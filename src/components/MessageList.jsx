import { useEffect, useLayoutEffect, useRef } from "react";
import { useChatContext } from "../context/chatContext";
import './MessageList.css';
import Message from "./Message";
import { useAuth } from "../context/authContext";
import { useSocketContext } from "../context/socketContext";


const MessageList = ({ messages,showTyping, otherUserId, latestMessageSeenId }) => {

  const bottomRef = useRef(null);
  const firstLoad = useRef(true);

  const { currentChatId } = useChatContext();
  const { auth } = useAuth();
  const socket = useSocketContext();

  useEffect(() => {
    if (!messages.length) return;

    if (firstLoad.current) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
      firstLoad.current = false;
      return;
    }

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showTyping]);

  useEffect(() => {
    firstLoad.current = true;
  }, [currentChatId]);

  useEffect(() => {
    socket.emit("seen", currentChatId, auth?.userId);
  }, [socket, currentChatId, auth?.userId]);
  
  return (
    <>
      {messages.length !== 0 
        ? 
        <>
          {messages.map((message, index) => {

            const currentDate = new Date(message.createdAt).toDateString();

            const previousDate =
              index > 0
                ? new Date(messages[index - 1].createdAt).toDateString()
                : null;

            const showDate = currentDate !== previousDate;

            const isLatestSeen = latestMessageSeenId === message._id

            return (
              <div key={message._id}>
                
                {showDate && (
                  <div className="date-separator">
                    {currentDate}
                  </div>
                )}

                <Message index={index} message={message} />

                {isLatestSeen && (
                  <div className="seen-indicator-wrapper">
                    <span className="seen-indicator">Seen</span>
                  </div>
                )}
              </div>
            );
          })}

          {showTyping && (
            <div className="typing-indicator-wrapper">
              <div className="typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>
        </>
        : (
          <div className="chat-placeholder">
            <div className="placeholder-box">
              <h3>Welcome 👋</h3>
              <p>Select a conversation from the left to start chatting</p>
            </div>
          </div>
        )}
    </>
  )
};

export default MessageList;
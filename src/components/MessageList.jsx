import { useEffect, useLayoutEffect, useRef } from "react";
import { useAuth } from "../context/authContext";
import { useChatContext } from "../context/chatContext";
import './MessageList.css';


const MessageList = ({ messages }) => {

  const { auth } = useAuth();
  const bottomRef = useRef(null);
  const firstLoad = useRef(true);

  const { currentChatId } = useChatContext();

  useEffect(() => {
    if (!messages.length) return;

    if (firstLoad.current) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
      firstLoad.current = false;
      return;
    }

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    firstLoad.current = true;
  }, [currentChatId]);
  
  return (
    <>
      {messages.length !== 0 
        ? 
        <>
          {messages.map((message, index) => {

            const isMine = message.sender === auth?.userId;
            // console.log(isMine);
            // console.log(message);
            return (
              <div
                key={message._id}
                className={`message-container ${
                  isMine ? "own-message-container" : ""
                }`}
              >
                <span className="message">
                  {message.content}
                </span>
              </div>
            );
          })}

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
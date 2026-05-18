import { useEffect, useLayoutEffect, useRef } from "react";
import { useAuth } from "../context/authContext";
import './MessageList.css';


const MessageList = ({ messages }) => {

  const { auth } = useAuth();
  const bottomRef = useRef(null);
  const firstLoad = useRef(true);

  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "auto"
    });
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages])
  
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
        : <div>No Messages yet</div>}
    </>
  )
};

export default MessageList;
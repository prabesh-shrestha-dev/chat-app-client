
import { useAuth } from "../context/authContext";
import "./Message.css";

const Message = ({ index, message }) => {

  const { auth } = useAuth();

  const isMine = message.sender === auth?.userId;

const date = new Date(message.createdAt);

const time = date.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

  return (
  <div
    key={message._id}
    className={`message-container ${
      isMine ? "own-message-container" : ""
    }`}
  >
    <div className="message">
      <div className="message-content">
        {message.content}
      </div>

      <div className="message-footer">
        <span className="message-time">
          {time}
        </span>
      </div>
    </div>

    
  </div>
  )
};

export default Message;
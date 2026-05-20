import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useChatContext } from "../context/chatContext";
import useSocket from "../hooks/useSocket";
import "./ChatInput.css";

const ChatInput = ({ setMessages }) => {

  const [message, setMessage] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const { currentChatId } = useChatContext();

  useSocket("receive-message", (newMessage, chatId) => {
    if (chatId === currentChatId) {
      setMessages(prev => [...prev, newMessage])
    }
  })

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await axiosPrivate.post('/message', {
        chatId: currentChatId, message
      });
      setMessage('');
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className="chat-input-button"
        onClick={sendMessage}
        disabled={!message}
      >
        Send
      </button>
    </div>
  )
};

export default ChatInput;
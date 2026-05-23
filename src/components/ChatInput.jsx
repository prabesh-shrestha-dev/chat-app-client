import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useChatContext } from "../context/chatContext";
import useSocket from "../hooks/useSocket";
import "./ChatInput.css";
import { useSocketContext } from "../context/socketContext";
import { useAuth } from "../context/authContext";

const ChatInput = ({ setMessages, setShowTyping, setLatestMessageSeenId, otherUserId }) => {

  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { currentChatId } = useChatContext();
  const socket = useSocketContext();
  const { auth } = useAuth();

  useSocket("receive-message", (newMessage, chatId) => {
    if (chatId === currentChatId) {
      setMessages(prev => [...prev, newMessage]);
      setShowTyping(false);

      socket.emit("seen", chatId, auth?.userId);
    }
  });

  useSocket("seen-message", (messageId) => {

    setMessages(prevMessages => {
      return prevMessages.map(message => {
        if (message._id !== messageId) return message;

        if (message.readBy.includes(otherUserId)) {
          return message;
        }

        return {
          ...message,
          readBy: [...message.readBy, otherUserId]
        };
      })
    });
    
    setLatestMessageSeenId(messageId);
  });

  useSocket("receive-typing", () => {
    setShowTyping(true);
  });

  useSocket("receive-not-typing", () => {
    setShowTyping(false);
  });

  useEffect(() => {
    if (typing) {
      socket.emit('typing', currentChatId);
    } else {
      socket.emit('not-typing', currentChatId);
    }
  }, [typing, currentChatId, socket]);

  useEffect(() => {
    if (message) {
      setTyping(true);
    }

    const timeoutId = setTimeout(() => setTyping(false), 2000)
    
    return () => {
      clearTimeout(timeoutId);
    }
  }, [message])

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
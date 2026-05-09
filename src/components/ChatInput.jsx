import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useChatContext } from "../context/chatContext";
import useSocket from "../hooks/useSocket";


const ChatInput = ({ setMessages }) => {

  const [message, setMessage] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const { currentChatId } = useChatContext();

  const sendMessage = async () => {
    try {
      const response = await axiosPrivate.post('/message', {
        chatId: currentChatId, message
      });
      console.log(response.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  useSocket("receive-message", (newMessage, chatId) => {
    if (chatId === currentChatId) {
      setMessages(prev => [...prev, newMessage])
    }
  })

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  )
};

export default ChatInput;
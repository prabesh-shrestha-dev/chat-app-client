import { createContext, useCallback, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {

  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState('');
  const [chatStatus, setChatStatus] = useState(false);
  const [createChatStatus, setCreateChatStatus] = useState(false);

  return (
    <ChatContext.Provider value={{ 
      chats,
      setChats,
      currentChatId, 
      setCurrentChatId, 
      chatStatus, 
      setChatStatus,
      createChatStatus,
      setCreateChatStatus 
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {

  const [currentChatId, setCurrentChatId] = useState('');
  const [chatStatus, setChatStatus] = useState(false);

  return (
    <ChatContext.Provider value={{ currentChatId, setCurrentChatId, chatStatus, setChatStatus }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useSocket from "../hooks/useSocket";
import ChatListItem from "./ChatListItem";
import "./ChatList.css";
import { useChatContext } from "../context/chatContext";

const ChatList = () => {

  const { chats, setChats, setCreateChatStatus } = useChatContext();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getChatList = async () => {
      try {
        const response = await axiosPrivate.get("/chats");
        setChats(response.data.chats);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    getChatList();
  }, []);

  useSocket("chat-created", (newChat) => {
    setChats(prev => [newChat, ...prev]);
  });

  useSocket("chat-updated", (chatId, latestMessage) => {
    setChats(prevChats => {
      const filteredChats = prevChats.filter(chat => chat._id !== chatId);
      const targetedChat = prevChats.find(chat => chat._id === chatId);
      if (!targetedChat) return prevChats;

      const updatedChat = {
        ...targetedChat,
        latestMessage,
        latestMessageAt: latestMessage.createdAt
      };

      return [updatedChat, ...filteredChats];
    });
  });

  return (
    <main className="chat-list-layout">
      <section className="top-section">
        <span className="app-name">ChatApp</span>

        <button 
          className="add-chat" 
          onClick={() => setCreateChatStatus(true)}
        >+</button>
      </section>

      <section className="chat-list">
        { 
          chats.length !== 0 ?
            chats.map((chat, index) => (
              <ChatListItem 
                key={chat._id}
                chat={chat}
              />
            )) : 
            <div>No chats</div> 
        }
      </section>
    </main>
  )
};

export default ChatList;
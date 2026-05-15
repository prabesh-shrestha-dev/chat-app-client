import Chat from "../components/Chat";
import CreateChat from "../components/CreateChat";
import ChatList from "../components/ChatList";
import { useChatContext } from "../context/chatContext";
import "./Home.css";
import { useState } from "react";

function Home() {

  const { chatStatus } = useChatContext();
  const [mobileCreateChat, setMobileCreateChat] = useState(false); 

  return (
    <main className="home-layout">
      <div className={`sidebar ${chatStatus ? 'mobile-hidden' : ''}`}>
        {!mobileCreateChat ? <ChatList setMobileCreateChat={setMobileCreateChat} /> : <CreateChat setMobileCreateChat={setMobileCreateChat} />}
      </div>

      <div className={`content ${!chatStatus ? 'mobile-hidden' : ''}`}>
        {chatStatus ? <Chat /> : <CreateChat />}
      </div>
    </main>
  )
}

export default Home
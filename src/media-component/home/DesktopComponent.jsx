import Chat from "../../components/Chat";
import ChatList from "../../components/ChatList";
import CreateChat from "../../components/CreateChat";
import { useChatContext } from "../../context/chatContext";
import "./DesktopComponent.css";

const DesktopComponent = () => {

  const { chatStatus, createChatStatus } = useChatContext();
  
  return (
    <>
      <aside className="sidebar">
        {!createChatStatus ? <ChatList /> : <CreateChat />}
      </aside>

      <main className="content">
        {chatStatus ? <Chat /> : <div>Select a chat</div>}
      </main>
    </>
  )
};

export default DesktopComponent;
import Chat from "../../components/Chat";
import ChatList from "../../components/ChatList";
import CreateChat from "../../components/CreateChat";
import { useChatContext } from "../../context/chatContext";
import "./MobileComponent.css";

const MobileComponent = () => {

  const { chatStatus, createChatStatus } = useChatContext();

  return (
    <div className="mobile-layout">
      {chatStatus ? (
        <Chat />
      ) : createChatStatus ? (
        <CreateChat />
      ) : (
        <ChatList />
      )}
    </div>
  )
};

export default MobileComponent;
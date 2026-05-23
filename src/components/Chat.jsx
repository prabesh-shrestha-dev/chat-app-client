import { useEffect, useMemo, useState } from 'react';
import { useChatContext } from '../context/chatContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ChatInput from './ChatInput';
import { useAuth } from '../context/authContext';
import './Chat.css';
import MessageList from './MessageList';

const Chat = () => {

  const { currentChatId, setChatStatus, setCurrentChatId } = useChatContext();
  const axiosPrivate = useAxiosPrivate();
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [latestMessageSeenId, setLatestMessageSeenId] = useState(null);
  const { auth } = useAuth();
  const { chats } = useChatContext();

  const chat = chats.find(chat => chat._id === currentChatId);

  const otherUser = useMemo(() => {
    return chat.users.find(user => user._id !== auth.userId);
  }, [chat?.users, auth.userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axiosPrivate.get(`/message/${currentChatId}`);
        setMessages(response.data.messages);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }
    if (currentChatId) {
      getMessages();
    }
  }, [currentChatId, axiosPrivate]);

  useEffect(() => {
    if (!messages?.length || !auth?.userId) return;

    const filteredMessages = messages.filter(message =>
      message.sender === auth?.userId &&
      message.readBy?.includes(otherUser?._id)
    );

    if (!filteredMessages.length) return;

    const latestMessageSeen = filteredMessages.reduce((latest, msg) => {
        return new Date(msg.createdAt) > new Date(latest?.createdAt)
          ? msg
          : latest;
      }, filteredMessages[0]);

    setLatestMessageSeenId(latestMessageSeen._id);
  }, [messages, auth?.userId, otherUser?._id]);

  const fullName = [
    otherUser?.firstName,
    otherUser?.middleName,
    otherUser?.lastName
  ]
    .filter(Boolean)
    .join(" ");

  const phoneNumber = otherUser?.phoneNumber;

  const closeChat = () => {
    setChatStatus(false);
    setCurrentChatId('');
  }
  
  return (
    <article className="chat-layout">
      <section className="chat-header">
        <div className="chat-user-info">
          <h4 className="chat-user-name">
            {fullName || phoneNumber}
          </h4>

          {fullName && phoneNumber ? 
            <p className="chat-user-phone"> 
              {phoneNumber}
            </p> : null}
        </div>

        <button 
          className="chat-close-btn"
          onClick={closeChat}
        >X</button>
      </section>

      <main className="messages-layout">
        {currentChatId 
          ? <MessageList 
              messages={messages}
              showTyping={showTyping}
              otherUserId={otherUser._id}
              latestMessageSeenId={latestMessageSeenId}
            /> 
          : <div>Chat not found</div>
        }
      </main>

      <section className="chat-footer">
        <ChatInput 
          setMessages={setMessages}
          setShowTyping={setShowTyping}
          setLatestMessageSeenId={setLatestMessageSeenId}
          otherUserId={otherUser._id}
        />
      </section>
    </article>
  )
}

export default Chat
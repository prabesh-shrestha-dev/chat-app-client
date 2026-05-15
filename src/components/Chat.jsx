import { useEffect, useState } from 'react';
import { useChatContext } from '../context/chatContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ChatInput from './ChatInput';

const Chat = () => {

  const { currentChatId, setChatStatus, setCurrentChatId } = useChatContext();
  const axiosPrivate = useAxiosPrivate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axiosPrivate.get(`/message/${currentChatId}`);
        console.log(response.data.messages);
        setMessages(response.data.messages);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }
    if (currentChatId) {
      getMessages();
    }
  }, [currentChatId, axiosPrivate])
  
  return (
    <main>
      <span>Chat</span>
      <button onClick={() => {
        setChatStatus(false);
        setCurrentChatId('');
      }}>X</button>
      {currentChatId ? <div>{messages.length !== 0 ? <div>{messages.map((message, index) => {
        return (<div key={index}>{message.content}</div>)
      })}</div>: <div>No Messages yet</div>}</div> : <div>Empty</div>}
      <ChatInput setMessages={setMessages} />
    </main>
  )
}

export default Chat
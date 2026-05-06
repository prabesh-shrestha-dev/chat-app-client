import { useRef, useState } from "react";
import { useSocketContext } from "../context/socketContext"
import useSocket from "../hooks/useSocket"
import useRefreshToken from "../hooks/useRefreshToken";
import { replace, useNavigate } from "react-router-dom";

const Chat = () => {
  const socket = useSocketContext();
  const socketIdRef = useRef(null);
  const refresh = useRefreshToken();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState('');

  useSocket('connect', () => {
    socketIdRef.current = socket.id;
    console.log('You are connected with: ', socket.id)
  })

  useSocket('disconnect', () => {
    console.log('You are disconnected from: ', socketIdRef.current)
  })

  useSocket("receive-message", (message) => {
    console.log(message);
  })

  useSocket("token-expired", async (...args) => {
    try {
      const newAccessToken = await refresh();
      socket.auth = { token: newAccessToken };
      socket.connect();
      socket.emit(...args);
    } catch (err) {
      console.log("REFRESH FAILED -> logout user");
      socket.disconnect();
      navigate('/login');
    }
    
  })

  if (!socket) return <div>Loading socket...</div>

  return (
    <main>
      <span>Chat</span>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={() => {
        if (socket?.connected) {
          socket.emit('send-message', message, roomId);
          console.log('message sent');
        }
      }}>Send</button>
      <input 
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
      />
      <button onClick={() => {
        if (socket?.connected) {
          socket.emit('join-room', roomId);
          console.log(`Room ${roomId} joined.`);
        }
      }}>Join</button>
    </main>
  )
}

export default Chat
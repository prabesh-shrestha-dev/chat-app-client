import { useEffect, useRef, useState } from "react"
import { axiosAuth } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuth } from "../context/authContext";
import useLogout from "../hooks/useLogout";
import Chat from "../components/Chat";
import CreateChat from "../components/CreateChat";
import ChatList from "../components/ChatList";
import useSocket from "../hooks/useSocket";
import useRefreshToken from "../hooks/useRefreshToken";
import { useSocketContext } from "../context/socketContext"

function Home() {

  const [phoneNumber, setPhoneNumber] = useState('999');
  const [firstName, setFirstName] = useState('Null');
  const { accessToken, setAccessToken } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();
  const refresh = useRefreshToken();
  const socket = useSocketContext();
  const socketIdRef = useRef(null);

  useEffect(() => {
    const loadHome = async () => {
      try {
        const response = await axiosPrivate.get('/home');
        setPhoneNumber(response.data.phoneNumber);
        setFirstName(response.data.firstName);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }

    loadHome();
  }, []);

  const handleLogout = async () => {
    logout();
  };

  useSocket('connect', () => {
    socketIdRef.current = socket.id;
    console.log('You are connected with: ', socket.id)
  })

  useSocket('disconnect', () => {
    console.log('You are disconnected from: ', socketIdRef.current)
  })

  useSocket("token-expired", async (...args) => {
    try {
      const newAccessToken = await refresh();
      socket.auth = { token: newAccessToken };
      socket.connect();
      socket.emit(...args);
      console.log('reemmision');
    } catch (err) {
      console.log("REFRESH FAILED -> logout user");
      socket.disconnect();
      navigate('/login');
    }
    
  });

  return (
    <div>
      {phoneNumber}: {firstName}
      <button onClick={handleLogout}>Logout</button>
      <CreateChat />
      <ChatList />
      <Chat />
    </div>
  )
}

export default Home
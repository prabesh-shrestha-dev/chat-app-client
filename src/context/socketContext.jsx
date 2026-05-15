import { createContext, useContext, useEffect, useRef } from "react";
import { socket } from "../socket/socket";
import { useAuth } from "./authContext";
import { useChatContext } from "./chatContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

  const { auth } = useAuth();
  const { currentChatId } = useChatContext();
  const chatRef = useRef(currentChatId);

  useEffect(() => {
    chatRef.current = currentChatId;
  }, [currentChatId]);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected: ", socket.id);
      if (chatRef.current) {
        socket.emit("join-room", chatRef.current);
      }
    };

    const handleDisconnect = () => {
      console.log("Disconnected");
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  useEffect(() => {
    if (auth?.accessToken) {
      const tokenChanged = socket.auth?.token !== auth.accessToken;
      socket.auth = { token: auth.accessToken }

      if (!socket.connected) {
        socket.connect();
      } else if (tokenChanged) {
        socket.disconnect().connect();
      }
    } else {
      socket.disconnect();
    }
  }, [auth?.accessToken]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
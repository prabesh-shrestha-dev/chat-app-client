import { createContext, useContext, useEffect } from "react";
import { socket } from "../socket/socket";
import { useAuth } from "./authContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.accessToken) {
      socket.auth = { token: auth.accessToken }
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [auth]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext"

const useSocket = (event, callback) => {
  const socket = useSocketContext();

  useEffect(() => {
    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    }
  }, [event, callback, socket])
}

export default useSocket
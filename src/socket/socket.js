import { io } from "socket.io-client";

// const SOCKET_ORIGIN =
//   window.location.hostname === "localhost"
//     ? "http://localhost:3000"
//     : "http://192.168.18.136:3000";

const SOCKET_ORIGIN = import.meta.env.VITE_API_URL;

export const socket = io(SOCKET_ORIGIN, {
  autoConnect: false
})
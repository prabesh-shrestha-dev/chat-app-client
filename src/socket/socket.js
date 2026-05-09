import { io } from "socket.io-client";

const SOCKET_ORIGIN =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "http://192.168.18.136:3000";

export const socket = io(SOCKET_ORIGIN, {
  autoConnect: false
})
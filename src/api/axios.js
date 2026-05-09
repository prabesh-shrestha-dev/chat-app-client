import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "http://192.168.18.136:3000";

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});
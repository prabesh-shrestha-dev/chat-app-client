import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext";

const RequireAuth = () => {

  const { accessToken } = useAuth();
  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default RequireAuth
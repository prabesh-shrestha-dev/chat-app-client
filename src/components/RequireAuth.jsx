import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext";

const RequireAuth = () => {

  const { auth } = useAuth();
  if (!auth.accessToken) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default RequireAuth
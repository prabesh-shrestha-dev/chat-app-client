import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";


const PersistLogin = () => {

  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);  
  }, [auth, refresh])

  if (isLoading) {
    return <div>Loading...</div>
  }

return <Outlet />

};

export default PersistLogin;
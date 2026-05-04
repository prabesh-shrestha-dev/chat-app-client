import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";


const PersistLogin = () => {

  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuth();
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

    !accessToken ? verifyRefreshToken() : setIsLoading(false);  
  }, [accessToken, refresh])

  if (isLoading) {
    return <div>Loading...</div>
  }

return <Outlet />

};

export default PersistLogin;
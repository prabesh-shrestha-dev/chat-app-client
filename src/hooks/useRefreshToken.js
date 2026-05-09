import { useAuth } from "../context/authContext";
import { axiosAuth } from "../api/axios";

const useRefreshToken = () => {

  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axiosAuth.get('/refresh');
      const { accessToken, userId } = response.data;
      setAuth({ 
        accessToken,
        userId
      });
      return accessToken;

    } catch (err) {
      throw err;
    }
  }

  return refresh;
};

export default useRefreshToken;
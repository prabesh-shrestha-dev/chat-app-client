import { useAuth } from "../context/authContext";
import { axiosAuth } from "../api/axios";

const useRefreshToken = () => {

  const { setAccessToken } = useAuth();

  const refresh = async () => {
    try {
      const response = await axiosAuth.get('/refresh');
      const accessToken = response.data.accessToken;
      setAccessToken(accessToken);
      return accessToken;

    } catch (err) {
      throw err;
    }
  }

  return refresh;
};

export default useRefreshToken;
import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../api/axios";
import { useAuth } from "../context/authContext";
import { useChatContext } from "../context/chatContext";

const useLogout = () => {

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {setChatStatus, setCreateChatStatus} = useChatContext();

  const logout = async () => {
    try {
      const response = await axiosAuth.get('/logout');
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setAuth({});
      setChatStatus(false);
      setCreateChatStatus(false);
      navigate('/login', { replace: true });
    }
  }

  return logout;
}

export default useLogout;
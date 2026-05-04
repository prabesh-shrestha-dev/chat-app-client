import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../api/axios";
import { useAuth } from "../context/authContext";


const useLogout = () => {

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axiosAuth.get('/logout');
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setAuth({});
      navigate('/login', { replace: true });
    }
  }

  return logout;
}

export default useLogout;
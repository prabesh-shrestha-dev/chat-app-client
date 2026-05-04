import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { axiosPrivate } from "../api/axios"
import useRefreshToken from "./useRefreshToken";
import useLogout from "./useLogout";

const useAxiosPrivate = () => {

  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const logout = useLogout();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use((config) => {
      if (!config.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;

          try {
            const newAccessToken = await refresh();
            prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest)
          } catch (err) {
            console.log("REFRESH FAILED → LOGOUT");
            await logout();
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [auth, refresh, logout])

  return axiosPrivate;
};

export default useAxiosPrivate;
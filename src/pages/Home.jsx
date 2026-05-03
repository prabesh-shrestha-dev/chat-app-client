import { useEffect, useState } from "react"
import { axiosAuth } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuth } from "../context/authContext";

function Home() {

  const [phoneNumber, setPhoneNumber] = useState('999');
  const [firstName, setFirstName] = useState('Null');

  const { accessToken, setAccessToken } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const loadHome = async () => {
      try {
        const response = await axiosPrivate.get('/home');
        setPhoneNumber(response.data.phoneNumber);
        setFirstName(response.data.firstName);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }

    loadHome();
  }, []);

  return (
    <div>
      {phoneNumber}: {firstName}
    </div>
  )
}

export default Home
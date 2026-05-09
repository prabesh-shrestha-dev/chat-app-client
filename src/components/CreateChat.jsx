import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const CreateChat = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const axiosPrivate = useAxiosPrivate();

  const createChat = async () => {
    try {
      const response = await axiosPrivate.post('/createChat', {
        phoneNumber
      });
      console.log(response.data);
      
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  return (
    <div>
      <input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={createChat}>Create Chat</button>
    </div>
  )
}

export default CreateChat
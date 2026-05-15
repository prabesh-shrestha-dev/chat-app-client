import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";


const CreateChat = ({ setMobileCreateChat }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const axiosPrivate = useAxiosPrivate();

  const createChat = async () => {
    try {
      const response = await axiosPrivate.post('/chats', {
        phoneNumber
      });
      console.log(response.data);
      
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  const logout = useLogout();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div>
      <button className="comp-hidden" onClick={() => setMobileCreateChat(false)}>X</button>
      <input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={createChat}>Create Chat</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default CreateChat
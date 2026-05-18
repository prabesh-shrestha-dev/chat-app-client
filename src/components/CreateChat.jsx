import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";
import "./CreateChat.css";
import { useChatContext } from "../context/chatContext";

const CreateChat = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { setCreateChatStatus } = useChatContext();
  const logout = useLogout();

  useEffect(() => {
    setError("");
  }, [phoneNumber])

  const createChat = async () => {

    if (isCreating) return;
    setIsCreating(true);

    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return;
    } 

    if (isNaN(phoneNumber)) {
      setError("A valid number is required");
      return;
    }

    try {
      const response = await axiosPrivate.post('/chats', {
        phoneNumber
      });
      console.log(response.data);
      setIsCreatingChat(false);
      
    } catch (err) {
      if (err.response?.status === 500) {
        setError("Server Error");
        return;
      }
      setError(err.response?.data.message || err.message || "Failed to create chat");

    } finally {
      setIsCreating(false);
    }
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="create-chat-wrapper">
      <article className="create-chat-layout">
        <section className="create-chat-header">
          <h2>Create Chat</h2>

          <button
            onClick={() => setCreateChatStatus(false)}
          >
            X
          </button>
        </section>

        {error && (
          <div className="create-chat-error">
            <span className="error-symbol">ⓘ </span>
            {error}
          </div>
        )}

        <main className="create-chat">
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <button
            onClick={createChat}
          >
            Create
          </button>
        </main>



        <button 
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </article>
    </div>
  );
};

export default CreateChat;
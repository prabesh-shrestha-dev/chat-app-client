import { useState, useRef, useEffect } from 'react';
import './Login.css';
import { axiosAuth } from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Login() {
  const phoneInputRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    phoneInputRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosAuth.post('/login', { phoneNumber, password });
      setAuth({ 
        accessToken: response.data.accessToken,
        userId: response.data.userId
      });

      navigate('/');

    } catch (err) {
      setError(JSON.stringify(err.response?.data) || err.message);
      console.error(err.response?.data || err.message);
    }
  }

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <span>{error}</span>
      <label htmlFor="phone-number-input">
        Phone No:
      </label>

      <input 
        id="phone-number-input"
        type="text"
        required
        ref={phoneInputRef}
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
      />

      <label htmlFor="password-input">
        Password:
      </label>

      <input 
        id="password-input"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button
        type="submit"
      >Login</button>

      <Link to="/register" id="register-link">
        Need an account?
      </Link>
    </form>
  )
}

export default Login
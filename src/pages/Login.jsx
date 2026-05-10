import { useState, useRef, useEffect } from 'react';
import { axiosAuth } from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './Login.css';

function Login() {
  const phoneInputRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    phoneInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (error) setError('');
  }, [phoneNumber, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const payload = {
        phoneNumber: phoneNumber.trim(),
        password
      }
      const response = await axiosAuth.post('/login', payload);
      setAuth({ 
        accessToken: response.data.accessToken,
        userId: response.data.userId
      });

      navigate('/');

    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response?.data.message);
      } else if (err.response?.status === 404) {
        setError('Number not registered.');
      } else if (err.response?.status === 401) {
        setError('Incorrect password.');
      } else if (err.response?.status === 500) {
        setError('Server Error');
      } else {
        setError(err.response?.data?.message || err.message || "Something went wrong");
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      {error && (
        <span id="error-text">
          <span id="error-symbol">ⓘ </span>
          {error}
        </span>
      )}

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
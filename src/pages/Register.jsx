import { useState, useEffect, useRef } from "react";
import './Register.css'
import api from "../api/axios";

function Register() {
  const phoneInputRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await api.post('/register', { phoneNumber, password, firstName, middleName, lastName });
    console.log(response.data);

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  useEffect(() => {
    phoneInputRef.current.focus();
  }, [])


  return (
    <form id="login-form" onSubmit={handleSubmit}>
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
      <label htmlFor="first-name-input">
        First Name:
      </label>
      <input 
        id="first-name-input"
        type="text"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <label htmlFor="middle-name-input">
        Middle Name:
      </label>
      <input 
        id="middle-name-input"
        type="text"
        value={middleName}
        onChange={e => setMiddleName(e.target.value)}
      />
      <label htmlFor="last-name-input">
        Last Name:
      </label>
      <input 
        id="last-name-input"
        type="text"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <button
        type="submit"
      >Register</button>
    </form>
  )
}

export default Register
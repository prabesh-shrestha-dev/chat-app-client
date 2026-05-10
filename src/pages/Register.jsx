import { useState, useEffect, useRef } from "react";
import './Register.css'
import { axiosAuth } from "../api/axios";
import { Link } from "react-router-dom";

function Register() {
  const phoneInputRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    phoneInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (error) setError('');
  }, [phoneNumber, password, firstName, middleName, lastName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
    const payload = {
      phoneNumber: phoneNumber.trim(),
      password,
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      lastName: lastName.trim()
    }
    const response = await axiosAuth.post('/register', payload);
    setSuccess(true);

    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response?.data.message);
      } else if (err.response?.status === 409) {
        setError('This number is already registered.')
      } else if (err.response?.status === 500) {
        setError('Server Error');
      } else {
        setError(err.response?.data?.message || err.message || "Something went wrong");
      }

    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section id="registration-success">
        <span>Successful Registration.</span>

        <Link to="/login" className="login-link">
          Login
        </Link>
      </section>
    );
  }

  return (
    <form id="registration-form" onSubmit={handleSubmit}>
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
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />

      <button
        type="submit"
      >Register</button>

      <Link to="/login" className="login-link">
        Already have an account?
      </Link>
    </form>
  )
}

export default Register
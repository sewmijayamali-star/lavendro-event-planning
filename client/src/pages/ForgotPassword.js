import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, { email });

      setMessage(res.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setMessage('');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-backdrop"></div>
      
      <div className="glass-card">
        <div className="login-header">
          <h2>Reset Password</h2>
          <p>Enter your email to receive a reset link</p>
        </div>

        {message && <p style={{ color: 'green', textAlign: 'center', marginBottom: '10px' }}>{message}</p>}
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ paddingLeft: '15px' }} 
            />
          </div>

          <button type="submit" className="glass-btn">
            Send Reset Link
          </button>

          <p className="signup-link">
            Remembered your password? <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

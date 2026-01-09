import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const { resetToken } = useParams(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/resetpassword/${resetToken}`, { password });

      
      setMessage(res.data.data || 'Password updated successfully'); 
      setError('');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.data || err.response?.data?.error || 'Invalid or expired token');
      setMessage('');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-backdrop"></div>
      
      <div className="glass-card">
        <div className="login-header">
          <h2>New Password</h2>
          <p>Create a strong password for your account</p>
        </div>

        {message && <p style={{ color: 'green', textAlign: 'center', marginBottom: '10px' }}>{message}</p>}
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input 
              type="password" 
              placeholder="New Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingLeft: '15px' }}
            />
          </div>
          
          <div className="input-container">
            <input 
              type="password" 
              placeholder="Confirm New Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ paddingLeft: '15px' }}
            />
          </div>

          <button type="submit" className="glass-btn">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

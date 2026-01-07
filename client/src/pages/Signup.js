import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Person, Email, Lock } from '@mui/icons-material';
import axios from 'axios';
import '../styles/Login.css';

const Signup = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      if (res.data.userId) {
          navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-backdrop"></div>
      <div className="glass-card">
        <div className="login-header">
          <h2>Create Account</h2>
          <p>Join us to plan your events</p>
        </div>

        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <Person className="input-icon" />
            <input 
              type="text" 
              name="fullName" 
              placeholder="Full Name" 
              value={formData.fullName} 
              onChange={handleChange}
              required 
            />
          </div>
          <div className="input-container">
            <Email className="input-icon" />
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              value={formData.email} 
              onChange={handleChange}
              required 
            />
          </div>
          <div className="input-container">
            <Lock className="input-icon" />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="glass-btn">Sign Up</button>
          
          <p className="signup-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Email, Lock, Google, Facebook } from '@mui/icons-material';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      handleLoginSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        const res = await axios.post('http://localhost:5000/api/auth/google', {
          email: userInfo.data.email,
          fullName: userInfo.data.name,
          googleId: userInfo.data.sub,
        });

        handleLoginSuccess(res.data);
      } catch (err) {
        setError('Google login failed');
      }
    },
    onError: () => setError('Google login failed'),
  });

  return (
    <div className="login-wrapper">
      <div className="login-backdrop"></div>
      
      <div className="glass-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Plan your next magical event</p>
        </div>

        {error && <p style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
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

          <div className="form-footer">
            <label className="remember-box">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="glass-btn">
            Sign In
          </button>

          <div className="divider">Or continue with</div>

          <div className="social-row">
            <button type="button" className="social-glass" onClick={() => googleLogin()}>
              <Google fontSize="small" /> Google
            </button>
            <button type="button" className="social-glass">
              <Facebook fontSize="small" /> Facebook
            </button>
          </div>

          <p className="signup-link">
            New to Lavendro? <Link to="/signup">Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

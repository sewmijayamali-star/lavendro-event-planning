import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="1007259644864-1t6kn6rd93si75t80st444c4a4h4blbr.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();

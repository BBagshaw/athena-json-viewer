import React from 'react';
import { useMsal } from '@azure/msal-react';
import './Login.css';

const Login: React.FC = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup().catch(e => {
      console.error(e);
    });
  };

  return (
    <div className="container">
      <h1 className="header">Welcome to EHI Viewer</h1>
      <button className="button" onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default Login;

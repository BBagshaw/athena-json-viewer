import React from 'react';
import { useMsal } from '@azure/msal-react';
import './Login.css';

// Login component
/**
 * This file contains the Login component.
 * The Login component is responsible for rendering the login page
 * and handling the login functionality.
 */

const Login: React.FC = () => {
  const { instance } = useMsal();

  /**
   * Function to handle login.
   * Initiates the login process by calling the loginPopup method of the MSAL instance.
   * If an error occurs during the login process, it is logged to the console.
   */
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

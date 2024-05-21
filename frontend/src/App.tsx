import React, { useEffect } from 'react';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { PublicClientApplication, EventType, AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import DataViewer from './components/DataViewer';
import Login from './components/Login';
import './index.css';

const msalInstance = new PublicClientApplication(msalConfig);

const App: React.FC = () => {
  useEffect(() => {
    const callbackId = msalInstance.addEventCallback((event) => {
      if (
        (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
        event.payload && 'account' in event.payload
      ) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account as AccountInfo;
        msalInstance.setActiveAccount(account);
      }
    });

    return () => {
      if (callbackId) {
        msalInstance.removeEventCallback(callbackId);
      }
    };
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <AuthenticatedTemplate>
        <DataViewer />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
};

export default App;

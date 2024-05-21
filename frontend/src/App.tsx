import React, { useEffect } from 'react';
import { MsalProvider, useMsal, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { PublicClientApplication, EventType, AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import DataViewer from './components/DataViewer';

const msalInstance = new PublicClientApplication(msalConfig);

const SignInButton: React.FC = () => {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginPopup().catch(e => {
      console.error(e);
    });
  };

  return <button onClick={handleLogin}>Sign In</button>;
};

const AppContent: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated');
    } else {
      console.log('User is not authenticated');
    }
  }, [isAuthenticated]);

  return (
    <div>
      <AuthenticatedTemplate>
        <DataViewer />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignInButton />
      </UnauthenticatedTemplate>
    </div>
  );
};

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
      <h1>EHI Viewer</h1>
      <AppContent />
    </MsalProvider>
  );
};

export default App;
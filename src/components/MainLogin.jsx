
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from '../config/authConfigWeb';
import Main from "./Main";

const MainLogin = () => {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={msalInstance}>
      <Main />
    </MsalProvider>
  );
}

export default MainLogin;

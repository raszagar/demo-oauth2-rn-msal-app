import { createContext, useState } from "react";

export const Oauth2Context = createContext();

export const Oauth2Provider = ({ children }) => {
    const [datosAccount, setDatosAccount] = useState(null);
    const [authTokens, setAuthTokens] = useState(null);

    return (
        <Oauth2Context.Provider value={{
            datosAccount, 
            setDatosAccount,
            authTokens,
            setAuthTokens
        }}>
            {children}
        </Oauth2Context.Provider>
    );
}
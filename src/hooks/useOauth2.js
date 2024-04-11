import { useState, useEffect } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

/**
 * Este hook es para el login con MSAL, para web
 * 
 */

export const useOauth2 = () => {
    const [datosAccount, setDatosAccount] = useState(null);

    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        console.log('isAuthenticated', isAuthenticated);
        if(isAuthenticated) {
            console.log('Usuario autenticado');
            setDatosAccount(accounts[0]);
        } else {
            console.log('Usuario NO autenticado');
            setDatosAccount(null);
        }

        console.log('accounts', datosAccount);
    }, [isAuthenticated]);
    

    const loginUsuario = (onSuccess, onError) => {
        console.log('login');

        const loginRequest = {
            scopes: ["User.Read"]
        };

        instance.loginRedirect(loginRequest)
            .then(() => {
                onSuccess();
            }).catch((e) => {
                console.log('ERROR: ', e);
                onError(e);
            });
    }

    const logoutUsuario = (onSuccess, onError) => {
        console.log('logout');

        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        }).then(() => {
            console.log('Terminado logout')
            onSuccess();
        }).catch((e) => {
            console.log('ERROR: ', e);
            onError(e);
        });
    }

    const refreshToken = async (scope, onSuccess, onError) => {
        console.log('refrescarToken');

        if(datosAccount == null) {
            console.error('No cuenta, no se puede refrescar');
            return;
        }

        instance.acquireTokenSilent({
            scopes: [scope],
            account: datosAccount,
        }).then((response) => {
            console.log('response', response);
            console.log('Terminado refrescarToken')
            onSuccess(response.accessToken);
        }).catch((error) => {
            console.log('ERROR', error);
            onError(error);
        });
    }

    return { datosAccount, loginUsuario, logoutUsuario, refreshToken };

}
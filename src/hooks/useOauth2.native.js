import { useState, useEffect, useContext } from "react";
import { authorize, logout, refresh } from "react-native-app-auth";
import { authConfig } from "../config/authConfig";
import { Oauth2Context } from "./Oauth2Context";

//Estos 2 import son necesarios para decodificar el token
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";


/**
 * Este hook es para el login con react-native-app-auth, para native (android e ios)
 * 
 */

export const useOauth2 = () => {
    const { datosAccount, setDatosAccount, authTokens, setAuthTokens } = useContext(Oauth2Context)

    useEffect(() => {
        if(datosAccount) {
            console.log('Usuario autenticado');
        } else {
            console.log('Usuario NO autenticado');
        }

        console.log('accounts', datosAccount);
    }, [datosAccount]);

    const loginUsuario = (onSuccess, onError) => {
        console.log('login');

        const loginRequest = {
            scopes: ["User.Read"]
        };

        authorize(authConfig).then((handleAuth) => {
            console.log('handleAuth', handleAuth);
            setAuthTokens(handleAuth)

            const decodeToken = jwtDecode(handleAuth.accessToken);
            console.log('decodeToken', decodeToken);

            //Se añade campos como el token de MSAL
            decodeToken.username = decodeToken.unique_name;

            setDatosAccount(decodeToken);

            console.log('Terminado login')
            onSuccess();
        }).catch((error) => {
            console.log('error', error);
            onError(error);
        });
    }

    const logoutUsuario = (onSuccess, onError) => {
        console.log('logout');

        if(authTokens == null) {
            console.log('No cuenta, no hace falta hacer logout');
            onSuccess();
            return;
        }

        logout(authConfig, {
            idToken: authTokens.idToken,
            postLogoutRedirectUrl: 'es.jose.demooauth2rnmsalapp://logout', //esto no funciona, no vuelve a la app
        }).then(() => {
            console.log('Terminado logout')
            setDatosAccount(null);
            setAuthTokens(null);
            setAuthToken(null);

            onSuccess();
        }).catch((error) => {
            console.log('error', error);
            onError(error);
        });
    }

    const refreshToken = async (scope, onSuccess, onError) => {
        console.log('refrescarToken');

        if(datosAccount == null) {
            console.error('No cuenta, no se puede refrescar');
            return;
        }

        const config = {
            issuer: authConfig.issuer,
            clientId: authConfig.clientId,
            redirectUrl: authConfig.redirectUrl,
            scopes: [scope],
        };

        refresh(config, {
            refreshToken: authTokens.refreshToken,
        }).then((handleAuth) => {
            console.log('handleAuth', handleAuth);
            setAuthTokens(handleAuth)
            console.log('Terminado refrescarToken')
            onSuccess(handleAuth.accessToken);
        }).catch((error) => {
            console.log('error', error);
            onError(error);
        });
    }

    return { datosAccount, authTokens, loginUsuario, logoutUsuario, refreshToken };

}
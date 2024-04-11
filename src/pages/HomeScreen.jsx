import { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { getSaludo } from "../services/apiSaludoService";
import { getProfile } from "../services/graphService";
import { funcionPrueba } from './negocio';

import { environment } from "../config/environment";
import { useOauth2 } from "../hooks/useOauth2";

const HomeScreen = () => {
    const { datosAccount, loginUsuario, logoutUsuario, refreshToken } = useOauth2();
    const [accessToken, setAccessToken] = useState(null);

    const [textoProfile, setTextoProfile] = useState('');
    const [textoSaludo, setTextoSaludo] = useState('');

    const [estado, setEstado] = useState('iniciando app');

    const handleLogin = () => {
        setEstado('haciendo login');

        loginUsuario(() => {
            setEstado('Terminado login 2')
        }, (e) => {
            console.log('ERROR: ', e);
        });
    }

    const handleLogout = () => {
        console.log('logout');

        logoutUsuario(() => {
            setEstado('Terminado logout')
            //setUsuario(null);
        }, (e) => {
            console.log('ERROR: ', e);
        });
    }
    
    const handleRefrescarToken = async () => {
        console.log('refrescarToken');
        funcionPrueba();

        if(datosAccount == null) {
            console.log('No cuenta, no se puede refrescar');
            setEstado('No cuenta, no se puede refrescar');
            return;
        }

        refreshToken(environment.TOKEN_SCOPE_GRAPH, 
            (accessToken) => {
                console.log('accessToken -> ', accessToken);
                setAccessToken(accessToken);
                setEstado('Terminado refrescarTokenGraph')
            }, (error) => {
                console.log('ERROR', error);
            });
    }

    const obtenerPefilGraph = async () => {
        console.log('obtenerPefilGraph');

        if(accessToken == null) {
            console.log('No token, no se puede obtener el perfil');
            setTextoProfile('No token, no se puede obtener el perfil');
            return;
        }

        getProfile(accessToken)
            .then((response) => {
                console.log('res perfil', response);
                if (!response.ok) { throw response }

                response.json().then((data) => {
                    console.log('data', data);
                    setTextoProfile(data);
                });
            }).catch((error) => {
                if(error.status === 401) {
                    setTextoProfile('Error perfil: 401 no autenticado');
                    console.log('Error perfil: 401 no autenticado');
                } else {
                    setTextoProfile('Error perfil: ', error.status, error.statusText);
                    console.log('Error perfil: ', error.status, error.statusText);
                }
            });
    }

    const handleRefrescarTokenSaludo = async () => {
        console.log('refrescarTokenSaludo');
        funcionPrueba();

        if(datosAccount == null) {
            console.log('No cuenta, no se puede refrescar saludo');
            setEstado('No cuenta, no se puede refrescar saludo');
            return;
        }

        refreshToken(environment.TOKEN_SCOPE_API, 
            (accessToken) => {
                console.log('accessToken -> ', accessToken);
                setAccessToken(accessToken);
                setEstado('Terminado refrescarTokenSaludo')
            }, (error) => {
                console.log('ERROR', error);
            });

    }

    const obtenerSaludo = async () => {
        console.log('obtenerSaludo');

        if(usuario == null) {
            console.log('No token, no se puede obtener el saludo');
            setTextoSaludo('No token, no se puede obtener el saludo');
            return;
        }

        getSaludo(accessToken)
            .then((response) => {
                console.log('res saludo', response);
                if (!response.ok) { throw response }

                response.json().then((data) => {
                    console.log('data', data);
                    setTextoSaludo(data);
                });
            }).catch((error) => {
                console.log('tengo un error: ', error);
                if(error.status === 401) {
                    setTextoSaludo('Error saludo: 401 no autenticado');
                    console.log('Error saludo: 401 no autenticado');
                } else {
                    setTextoSaludo('Error saludo: ', error.status, error.statusText);
                    console.log('Error saludo: ', error.status, error.statusText);
                }
            });
    }


    return (
        <View style={{ width: '100%', padding: 20 }}>
            <Text style={{ marginVertical: 15 }}>Home</Text>
            <Button
                title="Login"
                onPress={handleLogin} />
            { 
                datosAccount 
                    ? <Text style={{ marginVertical: 15 }}>Usuario Autenticado ({ datosAccount.name })</Text>
                    : <Text style={{ marginVertical: 15 }}>Usuario NO Autenticado</Text>
            }
            <Button
                title="Logout"
                onPress={handleLogout} />
            <Text style={{ marginVertical: 15 }}>Estado: {estado}</Text>
            <Button
                title="Refrescar token"
                onPress={handleRefrescarToken} />
            <Text style={{ marginVertical: 10 }}> </Text>
            <Button
                title="Profile"
                onPress={obtenerPefilGraph}
            />
            <Text style={{ marginVertical: 20 }}>{JSON.stringify(textoProfile, null, 2)} </Text>
            <Button
                title="Refrescar token saludo"
                onPress={handleRefrescarTokenSaludo} />
            <Text style={{ marginVertical: 10 }}> </Text>
            <Button
                title="Saludo"
                onPress={obtenerSaludo}
            />
            <Text style={{ marginVertical: 20 }}>{JSON.stringify(textoSaludo, null, 2)} </Text>
            
        </View>
    );
}

export default HomeScreen;

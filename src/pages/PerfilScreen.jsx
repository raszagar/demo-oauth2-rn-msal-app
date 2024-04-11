import { useState } from "react";
import { Button, Text } from "react-native";
import { useOauth2 } from "../hooks/useOauth2";
import { environment } from "../config/environment";
import { getProfile } from "../services/graphService";

export const PerfilScreen = () => {
    const { datosAccount, refreshToken } = useOauth2();
    const [textoProfile, setTextoProfile] = useState('');

    console.log('datosAccount', datosAccount);

    const obtenerPefilGraph = async () => {
        console.log('obtenerPefilGraph');

        if(datosAccount == null) {
            console.log('No cuenta, no se puede obtener el perfil');
            setTextoProfile('No cuenta, no se puede obtener el perfil');
            return;
        }

        refreshToken(environment.TOKEN_SCOPE_GRAPH, 
            (accessToken) => {
                console.log('accessToken -> ', accessToken);

                getProfile(accessToken)
                    .then((response) => {
                        console.log('res perfil', response);
                        if (!response.ok) { throw response }

                        response.json().then((data) => {
                            console.log('data', data);
                            setTextoProfile(data);
                        });
                    }).catch((error) => {
                        if (error.status === 401) {
                            setTextoProfile('Error perfil: 401 no autenticado');
                            console.log('Error perfil: 401 no autenticado');
                        } else {
                            setTextoProfile('Error perfil: ', error.status, error.statusText);
                            console.log('Error perfil: ', error.status, error.statusText);
                        }
                    });

            }, (error) => {
                console.log('ERROR', error);
            });

        
    }

    return (
        <>
        {
         datosAccount 
            ? 
                <>
                <Text>Usuario autenticado: { datosAccount.name}</Text>
                <Text>Username: { datosAccount.username}</Text>
                <Text>Nombre: { datosAccount.given_name}</Text>
                <Text>Apellidos: { datosAccount.family_name}</Text>

                <Button
                    title="Profile"
                    onPress={obtenerPefilGraph}
                />
                <Text style={{ marginVertical: 20 }}>{JSON.stringify(textoProfile, null, 2)} </Text>
                </>

            : <Text>Usuario no autenticado</Text>
        }
        </>
    )
}
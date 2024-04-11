import { environment } from "../config/environment";

export function getTest(token) {
    return fetch(environment.baseUrlSaludo + environment.apiSaludoTest, {
        method: "GET",
        "headers": {
            "authorization": `Bearer ${token}`
        }
    });
}

export function getSaludo(token) {
    console.log('estoy en getSaludo');
    console.log('url: ' + environment.baseUrlSaludo + environment.apiSaludoSaludar);
    console.log('token: ' + token);
    
    return fetch(environment.baseUrlSaludo + environment.apiSaludoSaludar, {
        method: "GET",
        "headers": {
            "authorization": `Bearer ${token}`
        }
    });
}

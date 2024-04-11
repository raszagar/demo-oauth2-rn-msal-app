import { environment } from "../config/environment";

export function getProfile(token) {
    return fetch(environment.baseUrlGraph + environment.apiGraphMe, {
        method: "GET",
        "headers": {
            "authorization": `Bearer ${token}`
        }
    });
}
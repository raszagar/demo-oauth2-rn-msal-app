import { environment } from "./environment";

export const authConfig = {
    issuer: environment.authTenantID,
    clientId: environment.authClientID,
    redirectUrl: environment.authRedirectUriNative,
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    additionalParameters: {
        display: 'wap', //no hace falta
        prompt: 'select_account',
    },
};

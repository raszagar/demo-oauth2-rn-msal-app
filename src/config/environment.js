
export const environment = {
    //Auth config
    authClientID: '********-16ec-45b6-851f-b2042ee928be',
    authTenantID: 'https://login.microsoftonline.com/********-3bb7-4f38-b6c4-0813abdc2139/v2.0',
    authRedirectUri: 'http://localhost:8081',
    authRedirectUriNative: 'es.jose.demooauth2rnmsalapp://home',
    
    //Auth scopes
    //TOKEN_SCOPE_GRAPH: "https://graph.microsoft.com/.default",
    TOKEN_SCOPE_GRAPH: "user.read",
    TOKEN_SCOPE_API: "api://********-16ec-45b6-851f-b2042ee928be/ApiPrueba",
  
    //Api Graph
    baseUrlGraph: 'https://graph.microsoft.com/v1.0/',
    apiGraphMe: 'me',
  
    //Api Saludo
    baseUrlSaludo: 'http://10.22.179.95:4000/demo-oauth2/',
    apiSaludoTest: 'ws/test',
    apiSaludoSaludar: 'ws/saludo'
  
  };

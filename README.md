# Ejemplo de autenticacion con Oauth2 con react-native-app-auth (Android, IOS) y msal (Web)

Ejemplo de autenticacion con React native, usando MSAL de Microsoft  
<https://learn.microsoft.com/es-es/entra/identity-platform/tutorial-single-page-app-react-prepare-spa?tabs=visual-studio-code>

Ejemplo de autenticación Oauth2 en reat native, con la libreria react-native-app-auth  
<https://github.com/FormidableLabs/react-native-app-auth>

## Pasos para crear la aplicación
~~~
npx create-expo-app demo-oauth2-rn-msal-app
cd demo-oauth2-rn-msal-app

(Para web)
npx expo install react-native-web react-dom @expo/metro-runtime
~~~

## Preparo development build
~~~
npx expo prebuild
(Pongo package es.jose.demooauth2rnmsalapp)
(Usar openjdk 17, en JAVA_HOME)

npx expo run:android
~~~

## Instalar libreria 
~~~
npm install react-native-app-auth
~~~

Hay que poner en 'android/app/build.gradle':
~~~
android {
  defaultConfig {
    manifestPlaceholders = [
      appAuthRedirectScheme: 'aqui.el.package'
    ]
  }
}
~~~

En 'android/app/src/main/AndoidManifest.xml'
Solo hay que dejar el scheme en este activity (crearlo)
~~~
    <activity android:name="net.openid.appauth.RedirectUriReceiverActivity">
      <intent-filter>
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <category android:name="android.intent.category.BROWSABLE"/>
        <data android:scheme="aqui.el.package"/>
      </intent-filter>
    </activity>
~~~

## Instalar libreria MSAL
~~~
npm install @azure/msal-browser @azure/msal-react
~~~


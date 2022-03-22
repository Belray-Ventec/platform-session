# geslub-platform-session

Librería de manipulación de sesión de usuario entre subdominios de Geslub.

## Instalación

En terminal:

    npm install git+https://github.com/Belray-Ventec/platform-session.git

## Uso

```js
import {
  setSession,
  getSession,
  isSessionActive,
  removeSession,
  goToLoginWebsite,
} from "platform-session";

/* Para establecer una sesión de usuario (login) */
setSession({ userId: "user-id", authToken: "user-token" }); // => void

/* Para obtener los datos de la sesión de usuario */
getSession(); // => { userId: string, authToken: string } | undefined

/* Para conocer si existe o no una sesión de usuario activa */
isSessionActive(); // => true | false

/* Para remover una sesión de usuario (cerrar de sesión) */
removeSession(); // => void

/* Para redirir al usuario a la pagina de login */
goToLoginWebsite(); // => void
```

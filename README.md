# geslub-platform-session

Librería de manipulación de sesión de usuario entre subdominios de Geslub.

## Instalación

En terminal:

    npm install git+https://github.com/Belray-Ventec/geslub-platform-session.git

## Uso

### Crear instancia

```js
import GeslubSession from "geslub-platform-session";

const Session = new GeslubSession(); // Ver sección de configuraciones para parametros
```

### Verificación de sesión existente

```js
if (Session.isSession()) {
    // Si existe una sesión de usuario activa...

    const session = Session.getSession(); // Se obtienen los datos de la sesión

    const user = await Session.getUser(); // Se obtienen los datos del usuario con la sesión activa

} else {
    // Si no existe una sesión de usuario activa...

    window.location.href = Session.getLoginURL({ shouldRedirect = true }); // Se redirige al usuario al login de Geslub
}
```

### Cierre de sesión

```js
// Se remueve la sesión
Session.removeSession();

// Se redirige al usuario a Geslub
window.location.href = Session.getLoginURL();
```

## Configuraciones

```js
const Session = new GeslubSession(

    // 'id' es la id de la sesion
    id: "geslub-session" // default

    // 'domain' es el dominio en el que participa la sesión
    domain: "geslub.cl" // default

    // 'apiURL' es la URL base del sistema de apis
    apiURL: "https://api.geslub.cl" // default

    // 'loginURL' es la URL del inicio de sesión
    loginURL: "https://geslub.cl" // default

    // 'redirect' es la URL indicada para redirigir al usuario cuando inicie sesión
    redirect: "" // default

    // 'dev' para crear una sesión con un usuario generico, SOLO PARA DESARROLLO
    // true para usar un usuario por defecto
    // object para pasar un usuario customizado
    devSession: false // default
);
```

## Métodos

```js
const Session = new GeslubSession();

// Crea una sesión de usuario
Session.setSession(name, data, domain);

// Obtiene los datos de la sesión de usuario si es que existe
Session.getSession(); // => { authToken: string; userId: string;} | undefined

// Valida si existe o no una sesión de usuario
Session.isSession(); // => true | false

// Remueve la sesión de usuario
Session.removeSession();

// Obtiene los datos del usuario de la sesión
Session.getUser(); // {...}

// Obtiene la URL del login del sistema Geslub
Session.getLoginURL({ shouldRedirect = true }); // => 'https://...'
```

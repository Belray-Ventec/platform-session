import Cookies from "universal-cookie";

const ID = "geslub-platform-session";

/**
 * La cookie se escribe siempre en la raíz. Sin `path` explícito el navegador
 * usa el default-path (el directorio de la URL actual), así que la sesión
 * quedaba atada a la ruta donde se guardó: al cambiar de zona en
 * `/activities/scheduled-activities` la cookie nacía con `Path=/activities` y
 * dejaba de leerse en el resto de la app.
 */
const PATH = "/";

const MAX_AGE = 60 * 60 * 24 * 365 * 100;

const cookies = new Cookies();

export interface Session {
  userId: string;
  authToken: string;
  zone?: string | null;
}

/**
 *
 * @returns {string} - Returns the main domain like "localhost" or "geslub.com" (without subdomains)
 */
export const getMainDomain = (): string => {
  const domain = window.location.hostname;
  return domain.split(".").slice(-2).join(".");
};

/**
 * @returns {string} - Dominio con el que se escribe y borra la cookie
 */
const getCookieDomain = (): string => {
  const domain = getMainDomain();

  // Si el dominio es web.app(Por si es en preview), devolvemos el subdominio completo
  if (domain === "web.app") return window.location.hostname;

  return domain;
};

/**
 * Rutas anidadas de la URL actual donde una versión anterior pudo dejar una
 * cookie duplicada. Para `/activities/scheduled-activities` devuelve
 * `["/activities/scheduled-activities", "/activities"]`.
 */
const getLegacyPaths = (): string[] => {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const paths: string[] = [];

  let path = "";
  for (const segment of segments) {
    path += `/${segment}`;
    paths.push(path);
  }

  return paths;
};

/**
 * Set the session in the cookies
 */
export const set = (data: Session): void => {
  cookies.set(ID, data, {
    domain: getCookieDomain(),
    path: PATH,
    maxAge: MAX_AGE,
  });
};

/**
 * Get the session from the cookies
 */
export const get = (): Session | undefined => {
  return cookies.get(ID);
};

/**
 * Check if the session is active
 */
export const isSessionActive = (): boolean => {
  return Boolean(get());
};

/**
 * Elimina las cookies duplicadas que quedaron en rutas anidadas y deja una sola
 * sesión en la raíz. Al ser más específicas, esas cookies le ganan a la de `/`
 * al parsear `document.cookie`, así que hay que limpiarlas o el problema
 * persiste en los navegadores que ya las tienen guardadas.
 *
 * Leemos antes de borrar a propósito: `get()` justo después de un `remove()`
 * depende del caché interno de universal-cookie, y así además conservamos la
 * zona que la app venía mostrando en esa ruta, que es la última que el usuario
 * eligió ahí.
 */
export const normalizePath = (): void => {
  const legacyPaths = getLegacyPaths();

  if (legacyPaths.length === 0) return;

  const session = get();
  const domain = getCookieDomain();

  for (const path of legacyPaths) {
    cookies.remove(ID, { domain, path });
  }

  if (session) set(session);
};

/**
 * Remove the session from the cookies
 */
export const remove = (): void => {
  const domain = getCookieDomain();

  cookies.remove(ID, { domain, path: PATH });

  // Limpiamos también los duplicados en rutas anidadas: si no, el logout deja
  // una sesión viva en la ruta donde se guardó.
  for (const path of getLegacyPaths()) {
    cookies.remove(ID, { domain, path });
  }
};

/**
 * Get the user id from the session
 */
export const getUser = (): string | undefined => {
  const session = get();
  return session?.userId;
};

export const SessionStorage = {
  set,
  get,
  remove,
  getUser,
  isSessionActive,
  normalizePath,
};

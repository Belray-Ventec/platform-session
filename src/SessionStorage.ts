import Cookies from "universal-cookie";

const ID = "geslub-platform-session";

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

  const mainDomain = domain.split(".").slice(-2).join(".");

  // Si el dominio es web.app(Por si es en preview), devolvemos el subdominio completo
  if (mainDomain === "web.app") {
    return domain;
  }

  return mainDomain;
};

/**
 * Set the session in the cookies
 */
export const set = (data: Session): void => {
  const domain = getMainDomain();

  cookies.set(ID, data, {
    domain,
    maxAge: 60 * 60 * 24 * 365 * 100,
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
 * Remove the session from the cookies
 */
export const remove = (): void => {
  const domain = getMainDomain();
  cookies.remove(ID, { domain });
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
};

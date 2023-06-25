import Cookies from "universal-cookie";

const GESLUB_DOMAIN = "geslub.com";
const ID = "geslub-platform-session";

const cookies = new Cookies();

export interface Session {
  userId: string;
  authToken: string;
  zoneSelected?: {
    id: string;
    name: string;
  } | null;
}

/**
 * Set the session in the cookies
 */
export const set = (data: Session): void => {
  const domain =
    window.location.hostname === "localhost" ? "localhost" : GESLUB_DOMAIN;

  cookies.set(ID, data, { domain });
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
  const domain =
    window.location.hostname === "localhost" ? "localhost" : GESLUB_DOMAIN;

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

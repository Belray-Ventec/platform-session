import Cookies from "universal-cookie";

const ID = "geslub-platform-session";
const DOMAIN = window.location.hostname;
const LOGIN_URL =
  DOMAIN === "localhost"
    ? "http://localhost:3000/login"
    : "https://geslub.com/login";

const cookies = new Cookies();

interface SessionData {
  userId: string;
  authToken: string;
}

export const setSession = (data: SessionData): void => {
  cookies.set(ID, data, { domain: DOMAIN });
};

export const getSession = (): SessionData | undefined => {
  return cookies.get(ID);
};

export const isSessionActive = (): boolean => {
  return Boolean(getSession());
};

export const removeSession = (): void => {
  cookies.remove(ID, { domain: DOMAIN });
};

export const goToLoginWebsite = (redirect?: string | null) => {
  const url =
    typeof redirect === "string"
      ? `${LOGIN_URL}?redirect=${redirect}`
      : LOGIN_URL;

  window.location.href = url;
};

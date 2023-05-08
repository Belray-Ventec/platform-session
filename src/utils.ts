import Cookies from "universal-cookie";

const GESLUB_DOMAIN = "geslub.com";
const ID = "geslub-platform-session";

const cookies = new Cookies();

export interface Session {
  userId: string;
  authToken: string;
}

export const setSession = (data: Session): void => {
  const domain =
    window.location.hostname === "localhost" ? "localhost" : GESLUB_DOMAIN;

  cookies.set(ID, data, { domain });
};

export const getSession = (): Session | undefined => {
  return cookies.get(ID);
};

export const isSessionActive = (): boolean => {
  return Boolean(getSession());
};

export const removeSession = (): void => {
  const domain =
    window.location.hostname === "localhost" ? "localhost" : GESLUB_DOMAIN;

  cookies.remove(ID, { domain });
};

export const goToLoginWebsite = (redirect: boolean | string = true): void => {
  const domain = window.location.hostname;
  const loginUrl =
    domain === "localhost"
      ? "http://localhost:3000/login"
      : "https://geslub.com/login";

  if (redirect === true) redirect = window.location.href;

  const url = redirect ? `${loginUrl}?redirect=${redirect}` : loginUrl;
  window.location.href = url;
};

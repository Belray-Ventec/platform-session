import Cookies from "universal-cookie";

const ID = "geslub-platform-session";

const cookies = new Cookies();

export interface Session {
  userId: string;
  authToken: string;
}

export const setSession = (data: Session): void => {
  const domain = window.location.hostname;
  cookies.set(ID, data, { domain });
};

export const getSession = (): Session | undefined => {
  return cookies.get(ID);
};

export const isSessionActive = (): boolean => {
  return Boolean(getSession());
};

export const removeSession = (): void => {
  const domain = window.location.hostname;
  cookies.set(ID, undefined, { domain, maxAge: -1 });
};

export const goToLoginWebsite = (
  redirect: boolean | string | null | undefined = true
): void => {
  const domain = window.location.hostname;
  const loginUrl =
    domain === "localhost"
      ? "http://localhost:3000/login"
      : "https://geslub.com/login";

  /**
   * Se redirige al path completo
   */
  if (redirect === true) redirect = window.location.href;

  const url = redirect ? `${loginUrl}?redirect=${redirect}` : loginUrl;

  window.location.href = url;
};

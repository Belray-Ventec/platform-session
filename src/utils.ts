import { SessionStorage, getMainDomain } from "./SessionStorage";

/**
 * @description Redirects to login page
 * @param {boolean | string} redirect - Redirects to the given url
 * @returns {void}
 * @example
 * goToLogin();
 * goToLogin("https://geslub.com/login");
 */
export const goToLogin = (redirect: boolean | string = true): void => {
  const domain = getMainDomain();
  const loginUrl =
    domain === "localhost"
      ? "http://localhost:3300/login"
      : `https://${domain}/login`;

  if (redirect === true) redirect = window.location.href;

  const url = redirect ? `${loginUrl}?redirect=${redirect}` : loginUrl;
  window.location.href = url;
};

export const logout = ({
  redirect = true,
}: {
  redirect?: boolean | string;
} = {}): void => {
  SessionStorage.remove();
  goToLogin(redirect);
};

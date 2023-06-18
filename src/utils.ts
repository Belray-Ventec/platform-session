/**
 * @description Redirects to login page
 * @param {boolean | string} redirect - Redirects to the given url
 * @returns {void}
 * @example
 * goToLogin();
 * goToLogin("https://geslub.com/login");
 */
export const goToLogin = (redirect: boolean | string = true): void => {
  const domain = window.location.hostname;
  const loginUrl =
    domain === "localhost"
      ? "http://localhost:3000/login"
      : "https://geslub.com/login";

  if (redirect === true) redirect = window.location.href;

  const url = redirect ? `${loginUrl}?redirect=${redirect}` : loginUrl;
  window.location.href = url;
};

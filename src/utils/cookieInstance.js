import { Cookies } from "react-cookie";

const cookieInstance = new Cookies();

export const getBrowserCookie = (name, options) => {
  return cookieInstance.get(name, options);
};

export const setBrowserCookie = (name, value, options) => {
  const defaultOptions = {
    path: "/",
  };

  return cookieInstance.set(
    name,
    value,
    typeof options !== "undefined"
      ? { ...defaultOptions, ...options }
      : defaultOptions
  );
};

export const removeBrowserCookie = (name, options) => {
  const defaultOptions = {
    path: "/",
  };

  return cookieInstance.remove(
    name,
    typeof options !== "undefined"
      ? { ...defaultOptions, ...options }
      : defaultOptions
  );
};

export default cookieInstance;

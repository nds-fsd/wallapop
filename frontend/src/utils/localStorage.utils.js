export const getStorageObject = (key) => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
};

export const setStorageObject = (key, object) => {
  if (object !== undefined) {
    return localStorage.setItem(key, JSON.stringify(object));
  }
};

export const deleteStorageObject = (key) => {
  localStorage.removeItem(key);
};

export const getUserToken = () => {
  const session = getStorageObject("user-session");
  console.log("Me das el token porfi? ", session);
  if (session) {
    return session;
  } else {
    return false;
  }
};
export const getUserData = () => {
  const session = getStorageObject("user");
  if (session) {
    return session;
  }
  return null;
};

export const setUserDataLocalStorage = (sessionData) => {
  setStorageObject("user", sessionData);
};

export const setUserSession = (sessionData) => {
  setStorageObject("user-session", sessionData);
};

export const removeSession = () => {
  deleteStorageObject("user-session");
  deleteStorageObject("user");
};

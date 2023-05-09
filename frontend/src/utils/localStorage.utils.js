export const getStorageObject = (key) => {
  const item = localStorage.getItem(key);
  if (item !== null) {
    return JSON.parse(item);
  }
  return null;
};

export const setStorageObject = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const deleteStorageObject = (key) => {
  localStorage.removeItem(key);
};

export const getUserToken = () => {
  const session = getStorageObject("user-session");

  if (session) {
    return session;
  }
  return false;
};
export const getUserData = () => {
  const session = getStorageObject("user");
  if (session) {
    return session;
  }
  return null;
};

export const setUserSession = (sessionData) => {
  setStorageObject("user-session", sessionData);
};

export const removeSession = () => {
  deleteStorageObject("user-session");
};

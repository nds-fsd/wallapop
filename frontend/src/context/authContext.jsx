import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createUser, loginUser } from "../utils/apiAuth";
import {
  getUserData,
  removeSession,
  setUserDataLocalStorage,
  setUserSession,
} from "../utils/localStorage.utils";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      setUserSession(data.data.token);
      setUserData(data.data);
      setUserDataLocalStorage(data.data.user);
      navigate("/");
    },
    onError: (e) => {
      setLoginError(
        e.response.data.error.login ||
          e.response.data.error.password ||
          e.response.data.error.email ||
          e.response.data.error.register
      );
    },
  });

  const register = useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: (data) => {
      setUserSession(data.token);
      setUserData(data.user);
      setUserDataLocalStorage(data.user);
      navigate("/");
    },
    onError: (e) => {
      console.log("register error", e.response.data.error.register);
    },
  });

  useEffect(() => {
    setUserData(getUserData);
  }, []);

  const handleAuth = (data) => {
    if (!data.phone) {
      login.mutate(data);
    } else {
      register.mutate(data);
    }
  };

  const handleLogout = () => {
    removeSession();
    setUserData(null);
    navigate("/");
  };
  const data = {
    handleAuth,
    handleLogout,
    userData,
    loginError,
    registerError,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

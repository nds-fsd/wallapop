import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/apiAuth";
import { getUserData, removeSession, setUserDataLocalStorage, setUserSession } from "../utils/localStorage.utils";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  console.log('esto es userData', userData)

  const navigate = useNavigate();
  const login = useMutation(["user"], loginUser);
  const register = useMutation(["user"], createUser);

  useEffect(() => {
    setUserData(getUserData);
  }, []);

  const handleAuth = (data) => {
    login.mutate(data, {
      onSuccess: (data) => {
        setUserSession(data.token);
        setUserData(data.user);
        setUserDataLocalStorage(data.user)
        navigate("/");
      },
    });
  };

  const handleLogout = () => {
    removeSession();
    navigate("/");
  };
  const data = { handleAuth, handleLogout, userData };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

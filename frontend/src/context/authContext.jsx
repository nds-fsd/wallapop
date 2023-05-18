import { createContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createUser, loginUser } from "../utils/apiAuth";
import {
  getUserData,
  removeSession,
  setUserDataLocalStorage,
  setUserSession,
} from "../utils/localStorage.utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const login = useMutation(["user"], loginUser);
  const register = useMutation(["user"], createUser);

  useEffect(() => {
    setUserData(getUserData);
  }, []);

  const handleAuth = (data) => {
    console.log("esta es la data que recibo del formulario de registro", data);
    if (!data.phone) {
      login.mutate(data, {
        onSuccess(data) {
          setUserSession(data.token);
          setUserData(data);
          setUserDataLocalStorage(data.user);
          navigate("/");
        },
      });
    } else {
      console.log("paso por aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      register.mutate(data, {
        onSuccess(data) {
          console.log("esto es data en registeru", data);
          setUserSession(data.token);
          setUserData(data);
          setUserDataLocalStorage(data.user);
          navigate("/");
        },
      });
    }
  };
  console.log(userData);

  const handleLogout = () => {
    removeSession();
    navigate("/");
  };
  const data = { handleAuth, handleLogout, userData };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

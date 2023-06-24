import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  createUser,
  loginUser,
  modUser,
  deleteUser,
  getInfoUser,
} from "../utils/apiAuth";
import {
  removeSession,
  setUserDataLocalStorage,
  setUserSession,
} from "../utils/localStorage.utils";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: userDataProfile, refetch } = useQuery(["user"], getInfoUser, {
    onSuccess: (data) => {
      //para rellenar los campos con la info del usuario
      setUserData(data);
    },
  });

  useEffect(() => {
    refetch();
  }, [isLoggedin, refetch, isUpdating]);

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUserData(data.user);
      setUserSession(data.token);
      setUserDataLocalStorage(data.user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setIsLoggedin(!isLoggedin);
      navigate("/");
    },
  });

  const register = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      setUserSession(data.token);
      setUserDataLocalStorage(data.user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setIsLoggedin(!isLoggedin);
      navigate("/");
    },
  });

  const update = useMutation({
    mutationFn: modUser,
    onSuccess: (data) => {
      setUserSession(data.token);
      setUserDataLocalStorage(data.user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setIsUpdating(!isUpdating);
    },
  });

  const userDelete = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      setUserSession(data.token);
      setUserDataLocalStorage(data.user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setIsLoggedin(!isLoggedin);
      navigate("/");
    },
  });

  // FUNCION LOGIN
  const handleAuthLogin = (data) => {
    login.mutate(data);
  };

  // FUNCION REGISTRO
  const handleAuthRegister = (data) => {
    register.mutate(data);
  };

  // FUNCION MODIFICAR
  const handlerAuthUpdate = (data) => {
    update.mutate(data);
  };

  // FUNCION DELETE
  const handlerAuthDelete = (data) => {
    // windows alert para avisar
    userDelete.mutate(data);
  };

  const handleLogout = () => {
    removeSession();
    setUserData(null);
    navigate("/");
  };

  //PARA QUE SE ABRA EL CLAUDINARY Y CARGAR IMAGEN
  const showUploadWidget = cloudinary.createUploadWidget(
    {
      cloudName: "dvogntdp2",
      uploadPreset: "kysnseyx",
      sources: ["local", "url", "image_search", "google_drive"],
      googleApiKey: "<image_search_google_api_key>",
      showAdvancedOptions: true,
      cropping: true,
      multiple: false,
      defaultSource: "local",
      styles: {
        palette: {
          window: "#FFFFFF",
          windowBorder: "#90A0B3",
          tabIcon: "#EBA905",
          menuIcons: "#5A616A",
          textDark: "#000000",
          textLight: "#FFFFFF",
          link: "#EBA905",
          action: "#39428D",
          inactiveTabIcon: "#0E165C",
          error: "#F44235",
          inProgress: "#EBA905",
          complete: "#20B832",
          sourceBg: "#FCF7E3",
        },
        fonts: { default: null, "sans-serif": { url: null, active: true } },
      },
    },
    (err, result) => {
      if (!err && result.event === "success") {
        setImage(result.info.secure_url);
      }
    }
  );

  const [images, setImages] = useState([]);
  const multipleUploadWidget = cloudinary.createUploadWidget(
    {
      cloudName: "dvogntdp2",
      uploadPreset: "kysnseyx",
      // sources: ["local", "url", "image_search", "google_drive"],
      sources: ["local"],
      googleApiKey: "<image_search_google_api_key>",
      // showAdvancedOptions: true,
      // cropping: true,
      defaultSource: "local",
      styles: {
        palette: {
          window: "#FFFFFF",
          windowBorder: "#90A0B3",
          tabIcon: "#EBA905",
          menuIcons: "#5A616A",
          textDark: "#000000",
          textLight: "#FFFFFF",
          link: "#EBA905",
          action: "#39428D",
          inactiveTabIcon: "#0E165C",
          error: "#F44235",
          inProgress: "#EBA905",
          complete: "#20B832",
          sourceBg: "#FCF7E3",
        },
        fonts: { default: null, "sans-serif": { url: null, active: true } },
      },
    },
    (err, result) => {
      if (!err && result.event === "success") {
        console.log("esto es result multiple", result);
        // imagesForUpload.push(result.info.secure_url);
        // setImages(imagesForUpload);
        setImages((prevImages) => [...prevImages, result.info.secure_url]);
      }
    }
  );

  // const imgProfilInfo = { showUploadWidget, image };
  const data = {
    // handleAuth,
    handleLogout,
    handleAuthLogin,
    handleAuthRegister,
    handlerAuthUpdate,
    handlerAuthDelete,
    userData,
    setUserData,
    showUploadWidget,
    multipleUploadWidget,
    image,
    images,
    setImages,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

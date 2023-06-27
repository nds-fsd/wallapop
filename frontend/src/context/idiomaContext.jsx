import React, { createContext, useState, useEffect } from "react";

export const LangContext = createContext();

const LangProvider = ({ children }) => {
  const [esLang, setEsLang] = useState(localStorage.getItem("lang") === "true");

  const toggleEsLang = () => {
    setEsLang(!esLang);
  };

  useEffect(() => {
    localStorage.setItem("lang", esLang.toString());
  }, [esLang]);

  const langVariables = esLang
    ? {
        buttonNavFav: "FAVORITO",
        buttonNavTu: "TÚ",
        buttonNavBuzon: "BUZÓN",
        buttonNavProd: "SUBIR UN PRODUCTO",
      }
    : {
        buttonNavFav: "FAVORITE",
        buttonNavTu: "YOU",
        buttonNavBuzon: "MAILBOX",
        buttonNavProd: "UPLOAD A PRODUCT",
      };

  return (
    <LangContext.Provider value={{ esLang, toggleEsLang, langVariables }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;

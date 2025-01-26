import { createContext, useState, useContext } from "react";

export const AppContext = createContext({
  userSearchValue: "",
  setUserSearchValue: () => {},
  ipResponse: {},
  setIpResponse: () => {},
  showErrorPage: false,
  setShowErrorPage: () => {},
});

export const AppProvider = ({ children }) => {
  const [userSearchValue, setUserSearchValue] = useState("");
  const [ipResponse, setIpResponse] = useState({});
  const [showErrorPage, setShowErrorPage] = useState(false);

  const value = {
    userSearchValue,
    setUserSearchValue,
    ipResponse,
    setIpResponse,
    showErrorPage,
    setShowErrorPage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

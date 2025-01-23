import { createContext, useState, useContext } from "react";

export const AppContext = createContext({
  userSearchValue: "",
  setUserSearchValue: () => {},
  ipResponse: {},
  setIpResponse: () => {},
});

export const AppProvider = ({ children }) => {
  const [userSearchValue, setUserSearchValue] = useState("");
  const [ipResponse, setIpResponse] = useState({});

  const value = {
    userSearchValue,
    setUserSearchValue,
    ipResponse,
    setIpResponse,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

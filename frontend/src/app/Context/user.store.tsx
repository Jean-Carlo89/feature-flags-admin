"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

export type user = {
  id: string;
  name: string;
  token: string;
};
interface ContextProps {
  user: user;
  setUser: Dispatch<SetStateAction<user>>;
  //data: DataType[];
  // setData: Dispatch<SetStateAction<DataType[]>>;
}

const GlobalContext = createContext<ContextProps>({
  user: {
    id: "",
    name: "",
    token: "",
  },
  setUser: (): user => {
    return { id: "", name: "", token: "" };
    // data: [],
    //setData: (): DataType[] => [],
  },
});

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState<user>({
    id: "",
    name: "",
    token: "",
  });

  return <GlobalContext.Provider value={{ user, setUser }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);

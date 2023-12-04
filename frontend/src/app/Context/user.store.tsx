"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type DataType = {
  firstName: string;
};

export type user = {
  id: string;
  name: string;
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
  },
  setUser: (): user => {
    return { id: "", name: "" };
    // data: [],
    //setData: (): DataType[] => [],
  },
});

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState<user>({
    id: "",
    name: "",
  });
  const [data, setData] = useState<[] | DataType[]>([]);

  return <GlobalContext.Provider value={{ user, setUser }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);

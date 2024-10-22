import { getUserDetails } from "@/helpers/auth";
import { Log } from "@/types/Logs";
import { User } from "@/types/User";
import React, { createContext, useContext, useState, useEffect } from "react";

interface GlobalContextType {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  updateAuth: () => void;
  logs: Log[];
  setLogs: (logs: Log[]) => void;
  addLog: (log: Log) => void;
}

const GlobalContext = createContext<GlobalContextType | null>(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [logs, setLogs] = useState<Log[]>([]);

  const updateAuth = async () =>
    getUserDetails().then((res) => {
      if (res) {
        setUser(res);
        setLoggedIn(true);
        setLoading(false);
      } else {
        setUser(null);
        setLoggedIn(false);
        setLoading(false);
      }
    });

  const addLog = (log: Log) => {
    log.id = logs.length + 1;
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  useEffect(() => {
    updateAuth();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
        user,
        setUser,
        updateAuth,
        logs,
        setLogs,
        addLog,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

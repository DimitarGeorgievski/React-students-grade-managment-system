import React, { createContext, useState, useContext, ReactNode } from "react";

interface AppContextType {
  isLoggedIn: boolean;
  role: string;
  studentName: string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setStudentName: React.Dispatch<React.SetStateAction<string>>;
}
const AppContext = createContext<AppContextType | undefined>(undefined);
interface AppProviderProps {
  children: ReactNode;
}
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        role,
        studentName,
        setIsLoggedIn,
        setRole,
        setStudentName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

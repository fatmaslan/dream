// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type UserType = {
  id: number;
  email: string;
  username: string;
};

type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access");
    }
    return null;
  });

  useEffect(() => {
    // Sayfa yenilendiğinde localStorage'dan geri yükle
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("access");
    if (storedUser && storedAccessToken) {
      setAccessToken(storedAccessToken);
      setUser(JSON.parse(storedUser));
      
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

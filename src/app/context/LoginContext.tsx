"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";


type LoginContextType = {
  loginUser: (formData: { email: string; password: string }) => Promise<void | unknown>;
  loading: boolean;
  error: string | null;
  success: boolean;
};

const LoginContext = createContext<LoginContextType>({
  loginUser: async () => {},
  loading: false,
  error: null,
  success: false,
});

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { setUser, setAccessToken } = useAuth(); // Global context’ten kullanıcı setter'ları al

  const loginUser = async (formData: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);

      const { access, refresh, user } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setAccessToken(access);

      setSuccess(true);
      return response.data;
    } catch (err: unknown) {
      setError(err.response?.data || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContext.Provider value={{ loginUser, loading, error, success }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

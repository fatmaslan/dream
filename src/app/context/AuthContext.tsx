"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";


type RegisterContextType = {
  registerUser: (formData: { username: string; email: string; password: string }) => Promise<void | any>;
  loading: boolean;
  error: string | null;
  success: boolean;
};


const defaultValue: RegisterContextType = {
  registerUser: async () => {},
  loading: false,
  error: null,
  success: false,
};


const RegisterContext = createContext<RegisterContextType>(defaultValue);


export const RegisterProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const registerUser = async (formData: { username: string; email: string; password: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContext.Provider value={{ registerUser, loading, error, success }}>
      {children}
    </RegisterContext.Provider>
  );
};
// 5. Hook (dışa aktarım)
export const useRegister = () => useContext(RegisterContext);



//login


type LoginContextType = {
  loginUser: (formData: { email: string; password: string }) => Promise<void | any>;
  loading: boolean;
  error: string | null;
  success: boolean;
};

const defaultValues: LoginContextType = {
  loginUser: async () => {},
  loading: false,
  error: null,
  success: false,
};

const LoginContext = createContext<LoginContextType>(defaultValues);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const loginUser = async (formData: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", formData);
  
      const { access, user } = response.data; // JWT token ve kullanıcı bilgisi
  
      // LocalStorage’a token ve kullanıcıyı kaydet
      localStorage.setItem("access", access);
      localStorage.setItem("user", JSON.stringify(user));
  
      setSuccess(true);
      return response.data;
    } catch (err: any) {
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

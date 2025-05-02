"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// 1. Tip tanımı
type CartItem = {
  id: number;
  product: number;
  quantity: number;
  variant: number;
  price: number;
  image: string;
};

type CartContextType = {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
};

// 2. Varsayılan değer
const defaultValue: CartContextType = {
  cartItems: [],
  loading: false,
  error: null,
  fetchCart: async () => {},
  removeFromCart: async () => {},
};

// 3. Context oluştur
const CartContext = createContext<CartContextType>(defaultValue);

// 4. Props tipi tanımla
type CartProviderProps = {
  children: ReactNode;
};

// 5. Provider bileşeni
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access"); // Token’ı al
      const response = await axios.get("http://127.0.0.1:8000/api/carts/", {
        headers: {
          Authorization: `Bearer ${token}`, // Header’a ekle
        },
      });
      setCartItems(response.data.items); // veya response.data, API yapına göre
      console.log("Cart API response", response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Sepet verisi alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);


  const removeFromCart = async (itemId: number) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access");
      await axios.delete(`http://127.0.0.1:8000/api/carts/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (err: any) {
      setError(err.response?.data || "Ürün sepetten silinemedi.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <CartContext.Provider value={{ cartItems, loading, error, fetchCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 6. Context hook'u
export const useCart = () => useContext(CartContext);


//DETAY
const CartDetailContext = createContext<CartContextType>(defaultValue);


export const CartDetailProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/carts/");
      setCartItems(response.data);
    } catch (err: any) {
      setError(err.response?.data || "Sepet verisi alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartDetailContext.Provider value={{ cartItems, loading, error, fetchCart }}>
      {children}
    </CartDetailContext.Provider>
  );
};

// 6. Context hook'u
export const useDetailCart = () => useContext(CartDetailContext);

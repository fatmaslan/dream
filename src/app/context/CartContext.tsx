"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

type ProductVariantType = {
  id: number;
  name: string;
  stock: number;
  description:string;
  color:string;
  size:number;
  length:number;
  map:number;
};
const defaultCart: CartType = {
  id: 0,
  user: 0,
  items: [],
  reduce: "",
};
type CartItemType = {
  id: number;
  variants: ProductVariantType;

  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description:string;
    indirimli_fiyat:number;
    variants: ProductVariantType;
  };
  images:string;
  quantity: number;
};

type CartType = {
  id: number;
  user: number;
  items: CartItemType[];
  reduce:string;
  
};

type CartContextType = {
  cart: CartType | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, variantId: number, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  loading: boolean;
  error: string | null;
};

const CartContext = createContext<CartContextType>({
  cart: defaultCart,
  fetchCart: async () => {},
  addToCart: async () => {},
  removeFromCart: async () => {},
  loading: false,
  error: null,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  const fetchCart = async () => {
    if (!accessToken) return; 
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/cart/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCart(res.data);
    } catch (err: any) {
      setError("Sepet yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (accessToken) {
      fetchCart();
    }
  }, [accessToken]);

  const addToCart = async (productId: number, variantId: number, quantity: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/cart/add_item/",
        {
          product_id: productId,
          variant_id: variantId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCart(res.data);
      
    } catch (err: any) {
      setError("Ürün sepete eklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cart/${cartItemId}/remove_item/`, {
        
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      await fetchCart(); 
      // console.log("Silinmek istenen item.id:", cartItemId);
    } catch (err: any) {
      setError("Ürün silinemedi.");
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <CartContext.Provider
      value={{ cart, fetchCart, addToCart, removeFromCart, loading, error }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

"use client"
import { useEffect, useState } from "react";
import axios from "axios";

interface ProductImage {
  id: number;
  image_url: string;
  product_id: number;
  images: string;
  
}

interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  images: ProductImage[] ;
  
}

export const useHeadCategories = () => {
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/headcategories/");
        setProducts(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Bilinmeyen bir hata oluştu.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
export const useCarousel = () => {
  const [carousel, setProducts] = useState<ProductProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/carousals/2/");
        setProducts(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Bilinmeyen bir hata oluştu.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { carousel, loading, error };
};
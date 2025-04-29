"use client";
import React from "react";
import { useCategoryDetail } from "../../../../actions/get";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

const CategoryDetail = () => {
  const params = useParams();
  const categoryId = params.id as string;
  const { category, error, loading } = useCategoryDetail(categoryId);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!category || category.length === 0) {
    return (
      <div className="mt-44 text-center text-gray-600 text-lg font-semibold">
        Kategoriye ait ürün bulunamadi!
      </div>
    );
  }
  return (
    <div className="p-3 flex flex-row items-center justify-center w-full max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.map((product) => {
          const image_url = product.image
            ? `http://localhost:8000${product.image}`
            : "http://localhost:8000/media/placeholder.png";

          //  console.log("Görsel URL:", product.image);
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="relative group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative w-60 h-90 p-2">
                <Image
                  src={image_url}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  unoptimized
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-0 left-0 bg-gray-400 bg-opacity-50 text-white text-xs px-3 py-1 rounded transition-opacity duration-300">
                {product.sezon}
              </div>
              <div className="p-4 text-center">
                <h2 className="text-sm font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                  {product.name}
                </h2>
                <span className="flex flex-row gap-6 "> 
                <p className="text-sm font-bold text-pink-600 text-start mt-2 line-through">
                  {product.price} ₺
                </p>
                <p className="text-sm font-bold text-pink-600 text-start mt-2">{product.indirimli_fiyat}₺</p>
               
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryDetail;

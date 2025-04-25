"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCategories } from "../../../actions/get";

const Categories = () => {
  const { categories, error, loading } = useCategories();

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!categories || categories.length === 0) return <p>Kategori bulunamadı.</p>;

  return (
    <div className="mt-10 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-8 px-4 w-full max-w-[1200px] mx-auto">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`}>
          <div className="relative md:w-[150px] md:h-[150px] w-[75px] h-[75px] ">
            {category.images && category.images.length > 0 ? (
              <Image
                src={category.images[0].image}
                alt={category.name}
                width={100}
                height={100}
                className="object-cover rounded-full w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-[100px] h-[100px] flex items-center justify-center bg-gray-200 rounded-full">
                Resim yok
              </div>
            )}
          </div>
          <span className="flex items-center justify-center text-center">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;

"use client";
import React from "react";
import { useSubCategories } from "../../../actions/get";
import Image from "next/image";


const SubCategories = () => {
  const { subCategories, error, loading } = useSubCategories();

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!subCategories || subCategories.images.length === 0) return <p>Kategori bulunamadı.</p>;

  return (
    <div className="p-4 w-full max-w-[1200px] mx-auto md:mt-25 mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
      
      {subCategories.images.map((img) => (
          <div key={img.id} className="relative md:w-[230px] md:h-[400px] w-[150px] h-[400px] ">
            <Image
              src={img.image}
              alt={subCategories.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
   
  );
};

export default SubCategories;

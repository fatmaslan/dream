"use client"
import React from 'react'
import { useApps } from '../../../actions/get'
import Link from 'next/link';
import Image from 'next/image';


const Browsers = () => {
    const { apps, error, loading } = useApps();


    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>Hata oluştu: {error}</p>;
    if (!apps || apps.length === 0) return <p>Kategori bulunamadı.</p>;
  return (
    <div  className="w-full overflow-hidden h-[250px] mt-10">
    {apps.map((index) => (
      <Link key={index.id} href={`/category/${index.id}`}>
        <div className="w-full max-w-[1500px] md:h-[250px] h-[150px] mx-auto">
          {index.images && index.images.length > 0 ? (
            <Image
              src={index.images[0].image}
              alt={index.name}
              width={900}
              height={900}
              className=" w-full h-full p-0 "
            />
          ) : (
            <div className="w-[100px] h-[100px] flex items-center justify-center bg-gray-200 rounded-full">
              Resim yok
            </div>
          )}
        </div>

      </Link>
    ))}
  </div>
  )
}

export default Browsers

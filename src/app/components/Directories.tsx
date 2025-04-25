"use client"
import React from 'react'
import { useDirectories } from '../../../actions/get'
import Image from 'next/image';
import Link from 'next/link';


const Directories = () => {
    const { directories, error, loading } = useDirectories();


    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>Hata oluştu: {error}</p>;
    if (!directories || directories.length === 0) return <p>Kategori bulunamadı.</p>;
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 px-4 w-full max-w-[1200px] mx-auto">
      {directories.map((directory) => (
        <Link key={directory.id} href={`/category/${directory.id}`}>
          <div className="relative md:w-[550px] md:h-[200px] w-[300px] h-[100px] gap-8">
            {directory.images && directory.images.length > 0 ? (
              <Image
                src={directory.images[0].image}
                alt={directory.name}
                width={400}
                height={400}
                className="object-cover  w-full h-full transition-transform duration-300 group-hover:scale-105 p-2 rounded-xl"
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

export default Directories

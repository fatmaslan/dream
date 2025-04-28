"use client"
import React from 'react'
import { useBrowsers } from '../../../actions/get'
import Link from 'next/link';


const Browsers = () => {
    const { browsers, error, loading } = useBrowsers();


    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>Hata oluştu: {error}</p>;
    if (!browsers || browsers.length === 0) return <p>Kategori bulunamadı.</p>;
  return (
    <div className="mt-10 flex flex-wrap gap-8 px-4 w-full max-w-[1200px] mx-auto">
        
      {browsers.map((index) => (
        <Link key={index.id} href={`/category/${index.id}`}>
          <div className='px-4 py-2 border border-pink-300 rounded-md text-sm hover:bg-pink-100 hover:text-pink-600 transition'>
            {index.name}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Browsers

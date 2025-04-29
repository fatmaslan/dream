import Link from "next/link";
import Image from "next/image"; 
import React from "react";

const Footer = () => {
  return (
    <div className="bg-pink-100">
      <div className="w-full max-w-[1200px] mx-auto px-4 py-10">
        <h2 className="text-pink-600 font-bold text-3xl mb-8">dream</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left ">
          <div className="flex flex-col gap-3">
            <h3 className="text-pink-600 font-semibold mb-4 border-b">Popüler</h3>
            <Link className="hover:underline text-pink-500" href="#">Sütyen</Link>
            <Link className="hover:underline text-pink-500" href="#">Bralet</Link>
            <Link className="hover:underline text-pink-500" href="#">Jartiyer</Link>
            <Link className="hover:underline text-pink-500" href="#">Büstiyer</Link>
            <Link className="hover:underline text-pink-500" href="#">Mayo</Link>
            <Link className="hover:underline text-pink-500" href="#">Bikini</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-pink-600 font-semibold mb-4 border-b">Kurumsal</h3>
            <Link className="hover:underline text-pink-500" href="#">Mağazalarımız</Link>
            <Link className="hover:underline text-pink-500" href="#">Ödeme</Link>
            <Link className="hover:underline text-pink-500" href="#">Teslimat</Link>
            <Link className="hover:underline text-pink-500" href="#">İade Değişim</Link>
            <Link className="hover:underline text-pink-500" href="#">SSS</Link>
            <Link className="hover:underline text-pink-500" href="#">İnsan Kaynakları</Link>
          </div>

          <div className="flex flex-col gap-3 hidden md:flex ">
            <h3 className="text-pink-600 font-semibold mb-4 border-b">Sosyal Medya</h3>
            <Link className="hover:underline text-pink-500" href="#">Instagram</Link>
            <Link className="hover:underline text-pink-500" href="#">Facebook</Link>
            <Link className="hover:underline text-pink-500" href="#">Twitter</Link>
            <Link className="hover:underline text-pink-500" href="#">Youtube</Link>
            <Link className="hover:underline text-pink-500" href="#">LinkedIn</Link>
          </div>

          <div className="flex flex-col items-center gap-4 hidden md:flex">
            <h3 className="text-pink-600 font-semibold mb-2 text-center border-b">Uygulamamız</h3>
           
            <Link href="#" className="text-pink-600 hover:underline text-sm ">App Store</Link>
            <Link href="#" className="text-pink-600 hover:underline text-sm ">Google Play</Link>
            <Image 
              src="/qr.png" 
              alt="QR Code" 
              width={100} 
              height={100} 
              className="object-contain"
            />
          </div>

        </div>
        <div className="hidden md:block mt-10 border-t border-pink-300 pt-4 text-center ">
          <p className="text-pink-600">dream @2025 Tüm hakları saklıdır</p>
          <div className="flex items-center justify-center gap-4 mt-2"> 
          <Link href="#" className=" hover:underline text-sm text-pink-500 ">Kişisel Verilerin Korunmaası</Link>
          <Link href="#" className=" hover:underline text-sm text-pink-500">Çerez Politikası</Link>
          <Link href="#" className=" hover:underline text-sm text-pink-500">Gizlilik ve Güvenlik</Link>
          <Link href="#" className=" hover:underline text-sm text-pink-500">Kullanım Koşulları</Link>
          <Link href="#" className="hover:underline text-sm text-pink-500">Çerez Yönetimi</Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

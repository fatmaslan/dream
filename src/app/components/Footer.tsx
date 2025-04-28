import Link from "next/link";
import Image from "next/image"; 
import React from "react";

const Footer = () => {
  return (
    <div className="bg-pink-200">
      <div className="w-full max-w-[1200px] mx-auto px-4 py-10">
        <h2 className="text-pink-600 font-bold text-3xl mb-8">dream</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-pink-600 font-semibold mb-4">Popüler</h3>
            <Link className="hover:underline" href="#">Sütyen</Link>
            <Link className="hover:underline" href="#">Bralet</Link>
            <Link className="hover:underline" href="#">Jartiyer</Link>
            <Link className="hover:underline" href="#">Büstiyer</Link>
            <Link className="hover:underline" href="#">Mayo</Link>
            <Link className="hover:underline" href="#">Bikini</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-pink-600 font-semibold mb-4">Kurumsal</h3>
            <Link className="hover:underline" href="#">Mağazalarımız</Link>
            <Link className="hover:underline" href="#">Ödeme</Link>
            <Link className="hover:underline" href="#">Teslimat</Link>
            <Link className="hover:underline" href="#">İade Değişim</Link>
            <Link className="hover:underline" href="#">SSS</Link>
            <Link className="hover:underline" href="#">İnsan Kaynakları</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-pink-600 font-semibold mb-4">Sosyal Medya</h3>
            <Link className="hover:underline" href="#">Instagram</Link>
            <Link className="hover:underline" href="#">Facebook</Link>
            <Link className="hover:underline" href="#">Twitter</Link>
            <Link className="hover:underline" href="#">Youtube</Link>
            <Link className="hover:underline" href="#">LinkedIn</Link>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h3 className="text-pink-600 font-semibold mb-2 text-center">Uygulamamız</h3>
            <Image 
              src="/qr.png" 
              alt="QR Code" 
              width={100} 
              height={100} 
              className="object-contain"
            />
            <Link href="#" className="text-pink-600 hover:underline text-sm">App Store</Link>
            <Link href="#" className="text-pink-600 hover:underline text-sm">Google Play</Link>
          </div>

        </div>
        <div className="mt-10 border-t border-pink-300 pt-4 text-center ">
          <p className="text-pink-600">dream @2025 Tüm hakları saklıdır</p>
          <div className="flex items-center justify-center gap-4 mt-2"> 
          <Link href="#" className=" hover:underline text-sm">Kişisel Verilerin Korunmaası</Link>
          <Link href="#" className=" hover:underline text-sm">Çerez Politikası</Link>
          <Link href="#" className=" hover:underline text-sm">Gizlilik ve Güvenlik</Link>
          <Link href="#" className=" hover:underline text-sm">Kullanım Koşulları</Link>
          <Link href="#" className="hover:underline text-sm">Çerez Yönetimi</Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

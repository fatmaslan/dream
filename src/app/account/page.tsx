"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";

const AccountPage = () => {
  const [selectedTab, setSelectedTab] = useState("Siparişlerim");

  const menuItems = [
    "Siparişlerim",
    "Bildirimlerim",
    "Favorilerim",
    "Koleksiyonlarım",
    "Adresim",
    "Kişisel Bilgilerim",
    "İndirim Kodlarım",
    "Puanlarım",
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6  w-full max-w-[1200px] mx-auto mt-20">
      <div className="bg-pink-100 w-[300px] p-6 h-[500px] rounded-md">
        <div className="flex flex-row gap-3 items-center justify-center">
          <div className="flex h-[60px] w-[70px] rounded-full border bg-white items-center justify-center">
            <span className="text-pink-500 flex font-bold">FA</span>
          </div>
          <span className="flex items-center justify-center">Fatma Aslan</span>
          <Button
            variant="outline"
            className=" bg-white border-none text-pink-500 "
          >
            Çıkış yap
          </Button>
        </div>

        <div className="flex flex-col mt-5 gap-6 p-3">
          {menuItems.map((text, i) => (
            <button
              key={i}
              onClick={() => setSelectedTab(text)}
              className={`text-left ${
                selectedTab === text ? "text-pink-600 font-semibold" : "text-gray-500"
              } hover:text-pink-600`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Sağ İçerik */}
      <div className=" h-[500px]">
        <h2 className="text-2xl font-bold mb-4">{selectedTab}</h2>
        <div>
          {selectedTab === "Siparişlerim" && <div>Henüz bir siparişiniz yok.</div>}
          {selectedTab === "Bildirimlerim" && <div>Burada bildirimlerin olacak.</div>}
          {selectedTab === "Favorilerim" && <div>Favori ürünlerin burada.</div>}
          {selectedTab === "Koleksiyonlarım" && <div>Koleksiyonlarını göreceksin.</div>}
          {selectedTab === "Adresim" && <div>Adres bilgilerini buradan düzenleyebilirsin.</div>}
          {selectedTab === "Kişisel Bilgilerim" && <div>Kişisel bilgilerin burada olacak.</div>}
          {selectedTab === "İndirim Kodlarım" && <div>İndirim kodlarını burada göreceksin.</div>}
          {selectedTab === "Puanlarım" && <div>Puan geçmişin burada görünecek.</div>}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useCart } from "../context/CartContext";
import { MdDeleteOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { FaAngleDown } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CiHeart } from "react-icons/ci";


const Cartpage = () => {
  const { cart, removeFromCart, loading, error } = useCart();
  console.log(cart, "cart");
  const [quantity, setQuantity] = React.useState(1);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  const totalPrice = cart?.items.reduce((total, item) => {
    const price = item.product.indirimli_fiyat ?? 0;
    const quantity = item.quantity ?? 1; // Burada her item kendi quantity'sini kullanmalı
    return total + price * quantity;
  }, 0);

  const decrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-20 p-6 gap-10 ">
      <h2 className="font-bold text-gray-400 text-2xl p-2">
        Sepetim ({cart?.items.length})
      </h2>

      <div className=" flex flex-col gap-2 md:gap-8  ">
        {cart?.items.length === 0 ? (
          <p className="text-lg text-center text-gray-600">Sepetiniz ürün yok</p>
        ) : (
          cart?.items.map((item) => (
            <div
              key={item.id}
              className="md:border rounded-lg p-3 md:shadow-md relative flex gap-2 md:gap-6 items-start w-full md:w-[1000px] h-[280px]"
            >
              {/* Ürün Görseli */}
              <div className="w-[180px] h-[250px] relative rounded overflow-hidden shrink-0">
                <Image
                  src={`http://127.0.0.1:8000${item.images}`}
                  alt={item.product.name || "Ürün resmi"}
                  width={180}
                  height={180}
                  className="rounded object-cover w-full h-full"
                />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold mb-2 text-gray-600 ">
                  {item.product.name}
                </h2>

                {item.product.variants?.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        XS <FaAngleDown className="text-pink-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Beden seçimi</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {item.product.variants.map((variant) => (
                        <DropdownMenuItem
                          key={variant.id}
                          className="flex flex-col items-start"
                        >
                          <span> {variant.size}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* Fiyatlar */}
                <div className="flex flex-row gap-3 mt-4">
                  <p className="text-sm font-semibold text-gray-600 text-start mt-2 line-through p-1">
                    {item.product.price} ₺
                  </p>
                  <p className="text-sm font-semibold text-pink-600 text-start mt-2 rounded-xl items-center justify-center flex">
                    {item.product.indirimli_fiyat} ₺
                  </p>

                  <span className="flex items-center  md:border border-gray-1 rounded-md">
                    <Button
                      variant="ghost"
                      onClick={decrease}
                      className="w-1 md:w-6 text-sm md:text-lg text-pink-600"
                    >
                      <MdDelete />
                    </Button>
                    <span className="w-1 md:w-6 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      onClick={increase}
                      className="text-lg text-pink-600"
                    >
                      <GoPlus />
                    </Button>
                  </span>
                </div>
              </div>

              {/* Sil Butonu */}
              <div className="absolute md:top-4 md:right-4 flex flex-col gap-4 ">
                <Button variant="outline"
                  size="icon">
                  <CiHeart size={24} className="text-pink-600"/>
                </Button>
                <Button
                  onClick={() => removeFromCart(item.id)}
                  variant="outline"
                  size="icon"
                >
                  <MdDeleteOutline size={24} className="text-pink-600" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-50 border px-5 rounded-md  ">
                <span className="text-pink-300 flex gap-2"><TiTickOutline size={24} className="text-gray-500"/> Kazancınız 100 TL</span>
              </div>
            </div>
            
          ))
        )}
        
      </div>
      <div className="flex flex-col justify-end items-end mt-6">
        {" "}
        <h2 className="font-bold md:text-xl ">
          Toplam Tutar:
          <span className="text-pink-600 md:text-2xl md:ml-2">{totalPrice} TL</span>
        </h2>
      </div>
      <div className="mt-15 flex flex-col items-center justify-center gap-2">
        <h2>Yeni ürün keşfet kısmı buraya gelicek</h2>
      </div>
    </div>
  );
};

export default Cartpage;

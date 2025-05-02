"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import { useCart } from '../context/CartContext';
import { MdDeleteOutline } from 'react-icons/md';


const Cartpage = () => {
    const {cartItems, removeFromCart}=useCart();
    const totalPrice = cartItems.reduce((total, item) => {
        const price = item.product.price ?? 0;
        const quantity = item.quantity ?? 0;
        return total + price * quantity;
      }, 0);
  return (
    <div className="p-5 mt-22">
    <div className="flex justify-between"> 
    <h1 className="text-2xl font-bold">Sepetiniz</h1>
    <Button className="w-[150px] flex items-end" >
        Sepeti Onayla
      </Button>
      </div>
    {cartItems.length === 0 ? (
      <p>Sepetiniz boş.</p>
    ) : (
      <ul className="mt-5 space-y-3">
        {cartItems.map((item, index) => (
          <li key={item.id || index} className="flex gap-3 p-3 rounded-md">
            <div className="relative w-[250px] h-[140px]">
              <Image
                src={`http://127.0.0.1:8000${item.images}`}
                alt={item.product.name || "Ürün resmi"}
                layout="fill"
                objectFit="cover"
                className="rounded-md mt-8"
              />
            </div>
            <div></div>
            <div className="flex-1 text-sm ">
              <h2 className="font-bold text-lg text-center ">
                {item.product.name}
              </h2>
              <p className="text-gray-600 mt-5">{item.product.description}</p>
              <p className="">
                <span className=" mt-8 text-md font-bold">Miktar: </span>{" "}
                {item.quantity}
              </p>

              {item.variant && (
                <p className="">
                  <span className="  text-md font-bold">Varyant: </span>
                  {item.variant.color} - {item.variant.size}
                </p>
              )}

              <p className="text-red-600 font-bold text-2xl flex justify-end">
                {item.product.price}₺
              </p>
            </div>
            <div>
              <Button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 text-white text-7xl"
              >
                <MdDeleteOutline size={50} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    )}
    <div>
      <h2 className="flex justify-end font-bold text-xl">
        {" "}
        Toplam Tutar :{" "}
        <span className="text-red-600 text-2xl"> {totalPrice}TL </span>
      </h2>
    </div>

  </div>
  )
}

export default Cartpage

"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MdBookmarkAdd } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlineChangeCircle } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { useDetailProducts } from "../../../../actions/get";
import { useParams } from "next/navigation";

const Detailpage = () => {
  const params = useParams();
  const productId = params.id as string;
  const plugin = React.useRef(
    Autoplay({ delay: 9000, stopOnInteraction: true })
  );
  const { products, error, loading } = useDetailProducts(productId);
  const [quantity, setQuantity] = React.useState(1);
  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!products || products.length === 0) {
    return (
      <div className="mt-44 text-center text-gray-600 text-lg font-semibold">
        Ürün bulunamadi!
      </div>
    );
  }
  const product = products[0];
 

  const decrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <div className="p-3 w-full max-w-[1200px] mx-auto mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="w-full">
          <Carousel plugins={[plugin.current]} className="w-full rounded-xl">
            <CarouselContent className="gap-4">
              {product.images.map((img) => (
                <CarouselItem key={img.id} className="w-full">
                  <Card className="w-full border-none">
                    <CardContent className="relative w-[500px] h-[600px] p-3 rounded-lg">
                      <Image
                        src={img.images}
                        alt={`Ürün resmi ${img.id}`}
                        width={500}
                        height={300}
                        quality={100}
                        className="object-cover rounded-lg"
                        priority
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="flex flex-col gap-6 ">
          <h2 className="font-bold text-gray-600 text-xl">{product.name}</h2>
          <div className="text-gray-700 text-base leading-6">
            {product.variants && product.variants.length > 0 && (
              <div className="flex flex-col">
                {product.variants.map((variant) => (
                  <div className="" key={variant.id}>
                    <span className="font-semibold ">Beden:</span>{" "}
                    <span className="text-gray-500 mt-3 border flex flex-wrap w-[30px] items-center justify-center rounded-sm ">
                      {variant.size}{" "}
                    </span>
                    <span className="text-gray-500 mt-3 flex flex-col w-[300px] rounded-sm ">
                      <span className="font-semibold text-pink-600 gap-3">
                        Renk Seçenekleri:
                      </span>{" "}
                      {variant.color}{" "}
                    </span>
                    <span className="flex flex-row gap-6 mt-4">
                      <p className="text-sm font-semibold text-gray-600 text-start mt-2 line-through">
                        {product.price} ₺
                      </p>
                      <p className="text-sm font-semibold text-pink-600 text-start mt-2">
                        {product.indirimli_fiyat}₺
                      </p>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-6 items-center">
            {/* Arttır Azalt Kutusu */}
            <div className="flex items-center border border-gray-300 rounded-md px-2">
              <Button variant="ghost" onClick={decrease} className="text-lg">
                -
              </Button>
              <span className="mx-2 w-6 text-center">{quantity}</span>
              <Button variant="ghost" onClick={increase} className="text-lg">
                +
              </Button>
            </div>

            {/* Sepete Ekle Butonu */}
            <Button className="bg-pink-700 hover:bg-pink-600 text-white w-[200px]">
              Sepete Ekle
            </Button>

            
            <Button
              onClick={() => {
                console.log("Favori ekleme butonuna tıklandı");
              }}
              variant="outline"
              className="flex items-center justify-center"
            >
              <CiHeart size={24} className="text-pink-500" />
            </Button>
            <Button
              onClick={() => {
                console.log("Favori ekleme butonuna tıklandı");
              }}
              variant="outline"
              className="flex items-center justify-center"
            >
              <MdBookmarkAdd size={24} className="text-pink-500" />
            </Button>
          </div>
       <div className="flex flex-col gap-2 mt-2 p-3 rounded-md border-1">
        <p className="text-gray-500 font-semibold flex items-center  text-sm  "><CiCreditCard1 size={20}/>: Vade farksız taksit seçenekleri</p>
        <p className="text-gray-500 font-semibold flex items-center text-sm  "><MdOutlineChangeCircle size={20}/>:30 gün içinde internetten iade ve mağazadan değişim</p>
        <p className="text-gray-500 font-semibold flex items-center text-sm  "><FaBoxOpen size={20}/>: 1-5 iş günü içinde kargoda</p>
       </div>
       <span className="text-gray-500 mt-3 flex flex-col text-sm rounded-sm ">
                      <span className="font-semibold text-pink-600 gap-3 mb-3">
                        Ürün hakkında:
                      </span>{" "}
                      {product.description}{" "}
                    </span>
        </div>
      </div>
      {/* benzer ürün */}
      <div className="mt-15 flex flex-col items-center justify-center gap-2">
        <h2>Benzer ürün kısmı buraya gelicek</h2>
      </div>
      <div className="mt-5 flex flex-col items-center justify-center gap-2 ">

        <Image 
        src={"/çevre.webp"}
        alt="Çevre dostu ürün"
        width={1500}
        height={100}
        className="object-cover rounded-lg"
        priority
        />

       
      </div>
    </div>
  );
};

export default Detailpage;

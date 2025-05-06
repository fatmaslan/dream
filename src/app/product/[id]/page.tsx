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
import { CiCreditCard1, CiHeart } from "react-icons/ci";
import { MdOutlineChangeCircle } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDetailProducts } from "../../../../actions/get";
import { useParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { SuccessModal } from "@/app/components/SuccessModal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa";

const Detailpage = () => {
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [modalOpen, setModalOpen] = React.useState(false);
  const params = useParams();
  const productId = params.id as string;
  const plugin = React.useRef(
    Autoplay({ delay: 9000, stopOnInteraction: true })
  );

  const { products, error, loading } = useDetailProducts(productId);
  const { addToCart } = useCart();
 

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (!products || products.length === 0) {
    return (
      <div className="mt-44 text-center text-gray-600 text-lg font-semibold">
        Ürün bulunamadı!
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
  const handleAddToCart = async () => {
    if (selectedVariant) {
      await addToCart(product.id, selectedVariant.id, quantity);
      setModalOpen(true);
      
      setTimeout(() => {
        setModalOpen(false);
      }, 3500);
    }
  };
  const selectedVariant = product.variants.find((v) => v.size === selectedSize);
  return (
    <div className="p-3 w-full max-w-[1200px] mx-auto mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Ürün görselleri */}
        <div className="w-full">
          <Carousel plugins={[plugin.current]} className="w-full rounded-xl">
            <CarouselContent className="gap-4">
              {product.images.map((img) => (
                <CarouselItem key={img.id} className="w-full">
                  <Card className="border-none">
                    <CardContent className="relative w-full h-[600px] p-3">
                      <Image
                        src={img.images}
                        alt={`Ürün resmi ${img.id}`}
                        width={500}
                        height={900}
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

        {/* Ürün detayları */}
        <div className="flex flex-col gap-6 mt-0 md:mt-16">
          <h2 className="font-bold text-gray-600 text-xl">{product.name}</h2>

          {product.variants?.length > 0 && (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-sm text-gray-700">Beden:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {selectedSize ?? "Beden Seçin"} <FaAngleDown className="text-pink-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Beden Seçimi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {product.variants.map((variant) => (
              <DropdownMenuItem
                key={variant.id}
                onClick={() => setSelectedSize(variant.size)}
              >
                {variant.size}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Seçilen bedenin detaylarını göster */}
      {selectedSize && (
        <div className="border p-3 rounded-md">
          {product.variants
            .filter((v) => v.size === selectedSize)
            .map((variant) => (
              <div key={variant.id} className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">
                  <strong>Renk:</strong> {variant.color}
                </p>
                <div className="flex gap-4">
                  <p className="text-sm text-gray-500 line-through">
                    {product.price} ₺
                  </p>
                  <p className="text-sm text-pink-600 font-semibold">
                    {product.indirimli_fiyat} ₺
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )}


          {/* Adet ve sepete ekle */}
          <div className="flex flex-wrap gap-4 mt-6 items-center">
            <div className="flex items-center border border-gray-300 rounded-md px-2">
              <Button variant="ghost" onClick={decrease} className="text-lg">
                -
              </Button>
              <span className="mx-2 w-6 text-center">{quantity}</span>
              <Button variant="ghost" onClick={increase} className="text-lg">
                +
              </Button>
            </div>

            <Button
              className="bg-pink-700 hover:bg-pink-600 text-white w-[200px]"
              onClick={handleAddToCart}
              disabled={!selectedVariant}
            >
              Sepete Ekle
            </Button>
            <SuccessModal open={modalOpen} onOpenChange={setModalOpen} />
            <Button
              variant="outline"
              aria-label="Beğenilenlere ekle"
              className="flex items-center justify-center"
            >
              <CiHeart size={24} className="text-pink-500" />
            </Button>

            <Button
              onClick={() => {
                console.log("Favori ekleme butonuna tıklandı");
              }}
              variant="outline"
              aria-label="Favorilere ekle"
              className="flex items-center justify-center"
            >
              <MdBookmarkAdd size={24} className="text-pink-500" />
            </Button>
          </div>

          {/* Ürün Bilgilendirme */}
          <ul className="flex flex-col gap-2 mt-4 text-sm text-gray-500 font-semibold">
            <li className="flex items-center gap-2">
              <CiCreditCard1 size={20} /> Vade farksız taksit seçenekleri
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineChangeCircle size={20} /> 30 gün içinde iade / değişim
            </li>
            <li className="flex items-center gap-2">
              <FaBoxOpen size={20} /> 1-5 iş günü içinde kargoda
            </li>
          </ul>

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              <span className="text-pink-600 font-semibold">Ürün hakkında:</span>{" "}
              {product.description}
            </p>
          </div>
        </div>
        </div>

      {/* Benzer ürünler */}
      <div className="mt-20 text-center text-lg font-semibold text-gray-600">
        Benzer ürün kısmı buraya gelecek
      </div>

      {/* Banner */}
      <div className="mt-5">
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

"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { useCarousel } from "../../../actions/get";

const CarouselDApiDemo = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const { carousel, error, loading } = useCarousel();

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata oluştu: {error}</p>;
  if (
    !carousel ||
    !Array.isArray(carousel.images) ||
    carousel.images.length === 0
  ) {
    return <p>Resim bulunamadı.</p>;
  }

  return (
    <div className="w-full overflow-hidden h-[420px]">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-[1500px] h-[400px] mx-auto relative"
      >
        <CarouselContent className="gap-2">
          {carousel.images.map((img) => (
            <CarouselItem key={img.id} className="w-full">
              <Card className="w-full border-none shadow-none p-0">
                <CardContent className="relative w-full h-[400px] p-0">
                  <Image
                    src={
                      img.images.startsWith("http")
                        ? img.images
                        : `http://localhost:8000/${img.images}`
                    }
                    alt={`Image ${img.id}`}
                    fill
                    quality={100}
                    className="object-cover"
                    priority
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Oklar carousel'in içinde ve görünür olacak şekilde düzenlenmiş */}
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
};

export default CarouselDApiDemo;

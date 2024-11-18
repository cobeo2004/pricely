"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CarouselAssets } from "@/types";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";

function HeroCarousel({
  carouselAssets,
}: {
  carouselAssets: Array<CarouselAssets>;
}) {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {carouselAssets &&
          carouselAssets.map((val) => (
            <Image
              src={val.src}
              alt={val.alt}
              key={val.alt}
              width={484}
              height={484}
              className="object-contain"
            />
          ))}
      </Carousel>
      <Image
        src="/assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  );
}

export default HeroCarousel;

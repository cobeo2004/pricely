"use server";

import { CarouselAssets } from "@/types";

export async function getCarouselAssets(): Promise<Array<CarouselAssets>> {
  return [
    {
      src: "/assets/images/hero-1.svg",
      alt: "smartwatch",
    },
    {
      src: "/assets/images/hero-2.svg",
      alt: "bag",
    },
    {
      src: "/assets/images/hero-3.svg",
      alt: "lamp",
    },
    {
      src: "/assets/images/hero-4.svg",
      alt: "air fryer",
    },
    {
      src: "/assets/images/hero-5.svg",
      alt: "chair",
    },
  ];
}

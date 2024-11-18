import { getTrendingProducts } from "@/server/products/getTrendingProducts";
import { getCarouselAssets } from "@/server/home/getCarouselAssets";
import Image from "next/image";
import React from "react";
import SearchBar from "./SearchBar";
import HeroCarousel from "./HeroCarousel";
import ProductCard from "./ProductCard";

async function HomePage() {
  const carouselAssets = await getCarouselAssets();
  const trendingProducts = await getTrendingProducts();
  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Start Here{" "}
              <Image
                src="/assets/icons/arrow-right.svg"
                alt=""
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the Power of <span className="text-primary">Pricely</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>
            <SearchBar />
          </div>
          <HeroCarousel carouselAssets={carouselAssets} />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;

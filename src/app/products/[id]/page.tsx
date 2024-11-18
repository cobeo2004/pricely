import NavBar from "@/app/_components/NavBar";
import { getProductById } from "@/server/products/getProductById";
import { redirect } from "next/navigation";
import React from "react";
import ProductDetailsPage from "../_components/ProductPage";
import { getSimilarProducts } from "@/server/products/getSimilarProducts";

async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const product = await getProductById(id);
  if (!product) redirect("/");
  const similarProducts = await getSimilarProducts(id);
  return (
    <main className="max-w-10xl mx-auto">
      <NavBar />
      <ProductDetailsPage product={product} similarProducts={similarProducts} />
    </main>
  );
}

export default ProductPage;

"use server";
import db from "@/lib/utils/db";

export async function getSimilarProducts(productId: string) {
  const currProduct = await db.product.findFirst({
    where: {
      id: productId,
    },
    include: {
      priceHistory: true,
    },
  });

  if (!currProduct) {
    throw new Error("Product not found");
  }

  const similarProducts = await db.product.findMany({
    where: {
      id: {
        not: productId,
      },
      category: currProduct.category,
    },
    take: 4,
  });

  return similarProducts;
}

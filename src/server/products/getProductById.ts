"use server";

import db from "@/lib/utils/db";

export async function getProductById(productId: string) {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: { priceHistory: true },
  });
  return product;
}

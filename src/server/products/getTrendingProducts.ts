"use server";
import db from "@/lib/utils/db";

export async function getTrendingProducts() {
  return await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

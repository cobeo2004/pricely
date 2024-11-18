"use server";

import { scrapeAmazonProduct } from "@/lib/brightData/scrapeHelper";
import { isValidAmazonProductURL } from "@/lib/utils/checks/isAmazonProduct";
import * as cheerio from "cheerio";
import { cleanCheerioProductData } from "@/lib/cheerio/pipeline";
import db, { Prisma } from "@/lib/utils/db";
import {
  getAveragePrice,
  getHighestPrice,
  getLowestPrice,
} from "@/lib/utils/extractors/getPriceUtils";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function scrapeAndStoreProducts(productUrl: string) {
  const session = await auth();
  if (!session || !session.user) return;
  if (!isValidAmazonProductURL(productUrl) || !productUrl) return;
  try {
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    const $ = cheerio.load(scrapedProduct ?? "");
    let cleanedData = cleanCheerioProductData($, productUrl);
    const existingProduct = await db.product.findFirst({
      where: { url: cleanedData.url as string },
      include: { priceHistory: true },
    });
    if (existingProduct) {
      const updatedPriceHistory = [
        {
          price: cleanedData.currentPrice as number,
          date: new Date(),
        },
      ] satisfies Prisma.PriceHistoryCreateWithoutProductInput[];
      cleanedData = {
        ...cleanedData,
        priceHistory: {
          create: updatedPriceHistory,
        },
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };

      const updatedProduct = await db.product.update({
        where: { id: existingProduct.id },
        data: cleanedData,
      });
      revalidatePath(`/products/${updatedProduct.id}`);
      return updatedProduct;
    } else {
      const newProduct = await db.product.create({
        data: cleanedData as Prisma.ProductUncheckedCreateInput,
      });
      revalidatePath(`/products/${newProduct.id}`);
      return newProduct;
    }
  } catch (error) {
    throw new Error(`Failed to scrape product: ${(error as Error).message}`);
  }
}

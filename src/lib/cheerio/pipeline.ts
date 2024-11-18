import { CheerioAPI } from "cheerio";
import { extractPrice } from "../utils/extractors/extractPrice";
import { extractCurrency } from "../utils/extractors/extractCurrency";
import { extractDescription } from "../utils/extractors/extractDescription";
import { Prisma } from "@/lib/utils/db";
export function cleanCheerioProductData(
  $: CheerioAPI,
  url: string
): Prisma.ProductUncheckedCreateInput | Prisma.ProductUncheckedUpdateInput {
  try {
    // Extract the product title
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    const description = extractDescription($);

    // Construct data object with scraped information
    const data = {
      url,
      currency: currency || "$",
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: {
        create: {
          price: Number(currentPrice) || Number(originalPrice),
          date: new Date(),
        },
      },
      discountRate: Number(discountRate),
      category: "category",
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    } satisfies Prisma.ProductUncheckedUpdateInput;

    return data;
  } catch (error) {
    throw new Error(
      `Failed to clean product data: ${(error as Error).message}`
    );
  }
}

"use server";
import { isValidAmazonProductURL } from "@/lib/utils/checks/isAmazonProduct";
import { scrapeAndStoreProducts } from "../products/scrapeAndStoreProducts";
import { auth } from "@/lib/auth";
export const handleSearch = async (prevState: unknown, formData: FormData) => {
  const session = await auth();
  if (!session || !session.user)
    return { error: "You must be logged in to submit a product", result: null };
  const searchQuery = formData.get("searchQuery");
  if (!searchQuery)
    return { error: "An amazon product link is required", result: null };
  const validProductUrl = isValidAmazonProductURL(searchQuery as string);
  if (!validProductUrl)
    return { error: "Invalid Amazon product URL", result: null };

  try {
    const product = await scrapeAndStoreProducts(searchQuery as string);
    if (!product) return { error: "No product data found", result: null };
    return { error: null, result: product };
  } catch (error) {
    throw new Error(`Failed to submit product: ${(error as Error).message}`);
  }
};

import { Prisma } from "@/lib/utils/db";
import { getLowestPrice } from "./extractors/getPriceUtils";

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

const THRESHOLD_PERCENTAGE = 40;

export const getEmailNotifType = (
  scrapedProduct: Prisma.ProductGetPayload<{
    include: { priceHistory: true };
  }>,
  currentProduct: Prisma.ProductGetPayload<{
    include: { priceHistory: true };
  }>
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }
  if (
    scrapedProduct.discountRate &&
    scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE
  ) {
    return Notification.THRESHOLD_MET as keyof typeof Notification;
  }

  return null;
};

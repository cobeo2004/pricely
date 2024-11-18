import { PriceHistoryItem } from "@/types/index.d";
import { Prisma } from "@/lib/utils/db";

export function getHighestPrice(
  priceList: Prisma.PriceHistoryUncheckedCreateInput[]
) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(
  priceList: Prisma.PriceHistoryUncheckedCreateInput[]
) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(
  priceList: Prisma.PriceHistoryUncheckedCreateInput[]
) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}

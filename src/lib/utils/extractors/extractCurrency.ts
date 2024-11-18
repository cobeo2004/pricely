import { Cheerio } from "cheerio";

// Extracts and returns the currency symbol from an element.
export function extractCurrency(element: Cheerio<any>) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

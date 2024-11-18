export declare type CarouselAssets = {
  src: string;
  alt: string;
};

export declare type PriceHistoryItem = {
  price: number;
};

export declare type User = {
  email: string;
};

export declare type Product = {
  _id?: string;
  url: string;
  currency: string;
  image: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  discountRate: number;
  description: string;
  category: string;
  reviewsCount: number;
  stars: number;
  isOutOfStock: boolean;
  users?: User[];
};

export declare type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export declare type EmailContent = {
  subject: string;
  body: string;
};

export declare type EmailProductInfo = {
  title: string;
  url: string;
};

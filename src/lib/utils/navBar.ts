import { LinkProps } from "next/link";

interface NavLinks extends LinkProps {
  label: string;
  images: {
    src: string;
    alt: string;
  };
}

export const navLinks: NavLinks[] = [
  {
    href: "/",
    label: "Search",
    images: {
      src: "/assets/icons/search.svg",
      alt: "search icon",
    },
  },
  {
    href: "/",
    label: "Favorites",
    images: {
      src: "/assets/icons/red-heart.svg",
      alt: "heart icon",
    },
  },
];

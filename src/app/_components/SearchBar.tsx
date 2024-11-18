"use client";

import { handleSearch } from "@/server/home/submitProducts";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";
function SearchBar() {
  const [result, action, isLoading] = useActionState(handleSearch, null);
  const router = useRouter();
  if (result?.result && !isLoading) {
    router.refresh();
    router.push(`/products/${result.result.id}`);
  }
  return (
    <>
      <form action={action} className="flex flex-wrap gap-4 mt-12">
        <input
          type="text"
          placeholder="Search for products..."
          className="searchbar-input"
          name="searchQuery"
        />
        <button type="submit" className="searchbar-btn" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {result?.error && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium text-red-500">
            {result.error}
          </span>
        </div>
      )}
    </>
  );
}

export default SearchBar;

"use client";
import React from "react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <form>
      <label className="input input-bordered flex items-center gap-2 rounded-3xl bg-black bg-opacity-40">
        <input
          type="text"
          placeholder="Search by Professor Name"
          className="grow text-gray-200 placeholder:text-gray-200 placeholder:font-normal"
        />
        <img
          src="/MagnifyingGlass.svg" // Ensure the path and name are exact
          alt="magnify glass"
          className="h-1/2 opacity-70"
        />
      </label>
    </form>
  );
};

export default SearchBar;

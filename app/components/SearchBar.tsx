"use client";
import React from "react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form>
      <label
        htmlFor="search"
        className="input input-bordered flex items-center gap-2 rounded-3xl bg-black bg-opacity-40 h-10 sm:h-12 lg:h-14"
      >
        <input
          placeholder="Search by Professor Name"
          className="grow text-gray-200 placeholder:text-gray-200 placeholder:font-normal text-sm sm:text-base min-w-fit"
          defaultValue={searchParams.get("query")?.toString()}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <img
          src="/MagnifyingGlass.svg"
          alt="magnify glass"
          className="h-1/2 opacity-70"
        />
      </label>
    </form>
  );
};

export default SearchBar;

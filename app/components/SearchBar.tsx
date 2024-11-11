"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface Professor {
  Name: string;
}

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [findName, setName] = useState<Professor[]>([]);
  const query = searchParams.get("query") || "";

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    console.log("Fetching data from /api/professors...");
    async function fetchData() {
      const response = await fetch("/api/professors");
      const data = await response.json();
      console.log("Data fetched:", data);
      setProfessors(data);
    }

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = professors.filter((professor) =>
        professor.Name.toLowerCase().includes(query.toLowerCase())
      );
      setName(filtered);
    } else {
      setName(professors);
    }
  }, [query, professors]);

  return (
    <div className="max-w-2xl">
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
      {query && findName.length > 0 && (
        <ul className="mt-2 bg-black bg-opacity-40 border border-black rounded-lg shadow-lg max-h-60 overflow-y-auto z-10 max-w-2xl">
          {findName.map((professor, index) => (
            <li
              key={index}
              className="text-white p-2 hover:bg-black hover:bg-opacity-45 cursor-pointer"
              onClick={() => handleSearch(professor.Name)}
            >
              {professor.Name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

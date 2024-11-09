import { useEffect, useState } from "react";

const SearchList = ({ query }: { query: string }) => {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return; // If no query, don't fetch

    setLoading(true);

    // Simulating an API call or search operation
    setTimeout(() => {
      const mockData = [
        "Professor John Doe",
        "Professor Jane Smith",
        "Professor Sarah Lee",
      ];
      // Filter results based on the query
      const filteredResults = mockData.filter((prof) =>
        prof.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
      setLoading(false);
    }, 1000); // Simulating an API delay
  }, [query]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      ) : (
        <div>No results found.</div>
      )}
    </div>
  );
};

export default SearchList;

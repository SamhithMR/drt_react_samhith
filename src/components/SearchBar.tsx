import React, { useState } from "react";
import { useSatellites } from "../hooks/useSatellites";

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchText);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search by name or NORAD ID..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleSearch}
        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

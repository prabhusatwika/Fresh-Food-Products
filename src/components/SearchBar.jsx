// components/SearchBar.jsx
import React from "react";

function SearchBar({ setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search by product name "
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2 rounded"
      style={{ minWidth: "250px" }}
    />
  );
}

export default SearchBar;

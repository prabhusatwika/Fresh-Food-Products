// components/SortOptions.jsx
import React from "react";

function SortOptions({ setSortOption }) {
  return (
    <select onChange={(e) => setSortOption(e.target.value)} className="border p-2 rounded mb-4 ml-4">
      <option value="">Sort By</option>
      <option value="name-asc">Name A-Z</option>
      <option value="name-desc">Name Z-A</option>
      <option value="nutrition-asc">Nutrition Grade A-E</option>
      <option value="nutrition-desc">Nutrition Grade E-A</option>
    </select>
  );
}

export default SortOptions;

// components/CategoryFilter.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function CategoryFilter({ setCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://world.openfoodfacts.org/categories.json");
        const topCategories = res.data.tags.slice(0, 20);
        setCategories(topCategories);
      } catch (error) {
        console.error("Error fetching categories", error);
        setCategories([
          { id: "snacks", name: "Snacks" },
          { id: "beverages", name: "Beverages" },
          { id: "desserts", name: "Desserts" },
        ]); // fallback static categories
      }
    };
    fetchCategories();
  }, []);

  return (
    <select onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded mb-4">
      {categories.map((cat) => (
        <option key={cat.id} value={cat.name}>{cat.name}</option>

      ))}
    </select>
  );
}

export default CategoryFilter;


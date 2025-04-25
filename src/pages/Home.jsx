// pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortOptions from "../components/SortOptions";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("snacks");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let url;
if (searchTerm) {
  url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&json=true`;
} else {
  url = `https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${selectedCategory}&json=true`;
}


      try {
        const response = await axios.get(url);
        const productList = response.data.products || [];
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching data from API", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const sortProducts = (products) => {
    if (sortOption === "name-asc") {
      return [...products].sort((a, b) => a.product_name?.localeCompare(b.product_name));
    } else if (sortOption === "name-desc") {
      return [...products].sort((a, b) => b.product_name?.localeCompare(a.product_name));
    } else if (sortOption === "nutrition-asc") {
      return [...products].sort((a, b) => (a.nutrition_grade_fr || 'z').localeCompare(b.nutrition_grade_fr || 'z'));
    } else if (sortOption === "nutrition-desc") {
      return [...products].sort((a, b) => (b.nutrition_grade_fr || 'a').localeCompare(a.nutrition_grade_fr || 'a'));
    }
    return products;
  };

  return (
    <div className="container">
  <h1 className="title">Fresh Food Products</h1>

  <div className="top-controls">
    <SearchBar setSearchTerm={setSearchTerm} />
    <CategoryFilter setCategory={setSelectedCategory} />
    <SortOptions setSortOption={setSortOption} />
  </div>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">

  {products.length === 0 ? (
    <div className="col-span-3 text-center text-gray-500 text-lg">Loading products...</div>
  ) : (
    sortProducts(products).map((product) => (
      <ProductCard key={product.code} product={product} />
    ))
  )}
</div>

      )}
    </div>
  );
}

export default Home;

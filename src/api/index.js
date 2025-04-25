// /api/index.js
import axios from "axios";

const BASE_URL = "https://world.openfoodfacts.org";

// Fetch products by category
export const getProductsByCategory = async (category) => {
  const url = `${BASE_URL}/category/${category}.json`;
  
  const res = await axios.get(url);
  return res.data.products || [];
};

// Search products by name
export const searchProductsByName = async (name) => {
  const url = `${BASE_URL}/cgi/search.pl?search_terms=${name}&json=true`;
  const res = await axios.get(url);
  return res.data.products || [];
};

// Fetch product details by barcode
export const getProductByBarcode = async (barcode) => {
  const url = `${BASE_URL}/api/v0/product/${barcode}.json`;
  const res = await axios.get(url);
  return res.data.product;
};

// Fetch list of categories
export const getCategories = async () => {
  const url = `${BASE_URL}/categories.json`;
  const res = await axios.get(url);
  return res.data.tags.slice(0, 20); // Top 20 categories
};

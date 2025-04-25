// api/openFoodFacts.js
import axios from "axios";

export const searchProductsByName = (name) => {
  return axios.get(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${name}&json=true`);
};

export const fetchProductsByCategory = (category) => {
  return axios.get(`https://world.openfoodfacts.org/category/${category}.json`);
};

export const fetchCategories = () => {
  return axios.get("https://world.openfoodfacts.org/categories.json");
};

export const fetchProductByBarcode = (barcode) => {
  return axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
};

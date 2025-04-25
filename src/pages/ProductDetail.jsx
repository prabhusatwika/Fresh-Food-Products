import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/productDetail.css"; // External CSS

function ProductDetail() {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };
    fetchProduct();
  }, [barcode]);

  if (!product) return <div className="loader">Loading...</div>;

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate("/")}>← Back</button>
      <div className="detail-card">
        <div className="image-section">
          <img src={product.image_url} alt={product.product_name} />
        </div>
        <div className="info-section">
          <h1>{product.product_name}</h1>
          <p><strong>Ingredients:</strong> {product.ingredients_text || "N/A"}</p>
          <p><strong>Nutrition Grade:</strong> {product.nutrition_grade_fr?.toUpperCase() || "N/A"}</p>
          <p><strong>Labels:</strong> {product.labels || "N/A"}</p>
          <p><strong>Energy:</strong> {product.nutriments?.energy || "N/A"} kJ</p>
          <p><strong>Fat:</strong> {product.nutriments?.fat || "N/A"} g</p>
          <p><strong>Carbs:</strong> {product.nutriments?.carbohydrates || "N/A"} g</p>
          <p><strong>Proteins:</strong> {product.nutriments?.proteins || "N/A"} g</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

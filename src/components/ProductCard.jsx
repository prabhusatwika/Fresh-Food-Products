import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ import cart context
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { dispatch } = useCart(); // ✅ get dispatch from cart context

  const handleClick = () => {
    navigate(`/product/${product.code}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // ✅ prevent card click (navigation) when clicking button
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.code,
        product_name: product.product_name,
        image_url: product.image_url,
        brands: product.brands,
      },
    });
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image">
        <img
          src={product.image_url || "https://via.placeholder.com/150"}
          alt={product.product_name || "Product"}
        />
      </div>
      <h2 className="product-name">
        {product.product_name || "No Name Available"}
      </h2>
      <p className="product-category">
        {product.categories || "No Category"}
      </p>
      <p className="product-nutrition">
        Nutrition Grade:{" "}
        <span className="nutrition-grade">
          {product.nutrition_grade_fr?.toUpperCase() || "N/A"}
        </span>
      </p>

      {/* ✅ Add to Cart Button */}
      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;

// src/components/Cart.js
import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, dispatch } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-3">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="mb-2">
              {item.product_name} x {item.quantity}
              <button
                className="ml-2 text-red-500"
                onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4">Total Items: {total}</p>
      <button
        className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => dispatch({ type: "CLEAR_CART" })}
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/userSlice";
import Navbar from "./Navbar";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ id: productId }));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="cart-container">
          <h2 className="mt-4 mb-4">Shopping Cart</h2>
          <ul className="list-group">
            {cart && cart.length > 0 ? (
              cart.map((product, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{product.name} - ${product.price}</span>
                  <button className="btn btn-danger" onClick={() => handleRemoveFromCart(product.id)}>
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <li className="list-group-item">No items in cart</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Cart;

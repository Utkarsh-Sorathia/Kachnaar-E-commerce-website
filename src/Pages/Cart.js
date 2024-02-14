import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/userSlice";
import Navbar from "./Navbar";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ cid: productId }));
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="cart-container">
          <h2 className="mb-4">Shopping Cart</h2>
          <ul className="list-group">
            {cart && cart.length > 0 ? (
              cart.map((product, index) => (
                <li key={index} className={"list-group-item d-flex justify-content-between align-items-center" + (index % 2 === 0 ? " bg-light" : "")}>
                  <span>
                    {
                      product.name?(<>{product.name}</>):(<>{product.title}</>)
                    } 
                    - ${product.price}</span>
                  <button className="btn btn-danger" onClick={() => handleRemoveFromCart(product.cid)}>
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

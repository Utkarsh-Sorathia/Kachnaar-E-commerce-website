import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/userSlice";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState("0");
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const incrementQuantity = () => {
    setQuantity((quantity) => Number(quantity) + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity) => Number(quantity) - 1);
    }
  };

  const EmptyCart = () =>
    toast.info("Cart is Empty.", {
      position: "top-right",
      autoClose: 1500,
    });

  const handleRemoveFromCart = (productId, quantityToRemove) => {
    dispatch(
      removeFromCart({
        cid: productId,
        quantityToRemove: parseInt(quantityToRemove, 10),
      })
    );
  };

  // Calculate subtotal
  const subtotal = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const totalItemsInCart = cart.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const handleAddress = () => {
    if (cart == "") {
      EmptyCart();
    } else {
      navigate("/address");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      {isAuthenticated ? (
        <>
          <div className="container mt-5">
            <div className="cart-container">
              <h2 className="mb-4">My Cart</h2>
              <div className="d-flex mx-2 p-2">
                <h3 className="mx-2">Sub-Total: ₹{subtotal}</h3>{" "}
                {/* Display subtotal here */}
                <button
                  className="mx-2 btn btn-primary"
                  onClick={handleAddress}
                >
                  Proceed to Buy ({totalItemsInCart} items)
                </button>
              </div>
              <ul className="list-group">
                {cart && cart.length > 0 ? (
                  cart.map((product, index) => (
                    <li
                      key={index}
                      className={
                        "list-group-item d-flex justify-content-between align-items-center" +
                        (index % 2 === 0 ? " bg-light" : "")
                      }
                    >
                      <span>
                        {product.name ? (
                          <>
                            <img
                              className="mx-2 card-img-top border border-rounded"
                              src={product.imageUrl}
                              alt="Product"
                              style={{
                                height: "50px",
                                width: "50px",
                                objectFit: "cover",
                              }}
                            />
                            {product.name}
                          </>
                        ) : (
                          <>{product.title}</>
                        )}
                        - ₹{product.price * product.quantity} -{" "}
                        {product.quantity}
                      </span>
                      <div className="d-flex justify-content-between mx-2">
                        <div
                          className="border rounded mx-auto align-items-center p-0 bg-white"
                          style={{ width: "136px" }}
                        >
                          <button
                            className="btn btn-light border rounded"
                            onClick={decrementQuantity}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="text-danger bi bi-dash-lg"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
                              />
                            </svg>
                          </button>
                          <span className="px-3 bg-white">{quantity}</span>
                          <button
                            className="btn btn-light border rounded"
                            onClick={incrementQuantity}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-plus-lg"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                              />
                            </svg>
                          </button>
                        </div>
                        <button
                          className="btn btn-primary mx-2"
                          onClick={() => navigate("/address")}
                        >
                          Buy Now
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleRemoveFromCart(product.cid, quantity)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No items in cart</li>
                )}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="container bg-light mt-3 p-3 text-center"
            style={{ width: "630px" }}
          >
            <h1>
              <Link to="/login">Login</Link> to get access to this page.
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/compat/app";
import { ToastContainer, toast } from "react-toastify";
import { setBillTotal } from "../redux/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const [cartProducts, setCartProducts] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const cart = doc.data().cart.map((item) => item);
          setCartProducts(cart);
        });
      });
  }, [db, email]);

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

  const handleRemoveFromCart = (productId) => {
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const updatedCart = doc
            .data()
            .cart.filter((item) => item.cartItemId !== productId);
          doc.ref
            .update({ cart: updatedCart })
            .then(() => {
              setCartProducts(updatedCart);
              toast.success("Item removed from cart", {
                position: "top-right",
                autoClose: 1500,
              });
            })
            .catch((error) => {
              console.error("Error updating cart after removing item:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  const subtotal = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const totalItemsInCart = cartProducts.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const handleAddress = () => {
    if (cartProducts == "") {
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
                <h3 className="mx-2">Sub-Total: ₹{subtotal}</h3>
                <button
                  className="mx-2 btn btn-primary"
                  onClick={() => {
                    dispatch(setBillTotal(subtotal));
                    handleAddress();
                  }}
                >
                  Proceed to Buy ({totalItemsInCart} items)
                </button>
              </div>
              <ul className="list-group">
                {cartProducts && cartProducts.length > 0 ? (
                  cartProducts.map((product, index) => (
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
                            <strong>{product.name}</strong>
                          </>
                        ) : (
                          <>{product.title}</>
                        )}
                        - ₹{product.price * product.quantity}
                      </span>
                      <div className="d-flex justify-content-between mx-2">
                        <div
                          className="border rounded mx-auto align-items-center p-0 bg-white"
                          style={{ width: "135px" }}
                        >
                          <button
                            className="btn btn-light border rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (product.quantity > 1) {
                                decrementQuantity();
                                product.quantity = Number(product.quantity) - 1;
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fillRule="currentColor"
                              className="text-danger bi bi-dash-lg"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
                              />
                            </svg>
                          </button>
                          <input
                            type="text"
                            className="bg-white border-0 text-center"
                            style={{width:"40px"}}
                            value={Number(product.quantity)}
                            onChange={(e) => {
                              const newValue = parseInt(e.target.value);
                              if (!isNaN(newValue) && newValue >= 1) {
                                incrementQuantity();
                                product.quantity = newValue;
                              }
                            }}
                          ></input>
                          <button
                            className="btn btn-light border rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              incrementQuantity();
                              product.quantity = Number(product.quantity) + 1;
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fillRule="currentColor"
                              className="bi bi-plus-lg"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                              />
                            </svg>
                          </button>
                        </div>
                        <button
                          className="btn btn-primary mx-2"
                          onClick={() => {
                            dispatch(
                              setBillTotal(product.price * product.quantity)
                            );
                            navigate("/address");
                          }}
                        >
                          Buy Now
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleRemoveFromCart(product.cartItemId)
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

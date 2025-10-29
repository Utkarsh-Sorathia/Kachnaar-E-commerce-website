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
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const [cartProducts, setCartProducts] = useState([]);
  const db = firebase.firestore();

  const updateCartInFirestore = (updatedCart) => {
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .update({ cart: updatedCart })
            .then(() => {
              setCartProducts(updatedCart);
            })
            .catch((error) => {
              console.error("Error updating quantity:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cartProducts.map((item) => {
      if (item.cartItemId === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCartInFirestore(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cartProducts.map((item) => {
      if (item.cartItemId === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updateCartInFirestore(updatedCart);
  };

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
    if (cartProducts === "" || cartProducts.length === 0) {
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
          <div className="container mt-3 mt-md-5 px-2">
            <div className="cart-container">
              <h2 className="mb-4">My Cart</h2>
              <ul className="list-group">
                {cartProducts && cartProducts.length > 0 ? (
                  cartProducts.map((product, index) => (
                    <li
                      key={index}
                      className={
                        "list-group-item" +
                        (index % 2 === 0 ? " bg-light" : "")
                      }
                    >
                      <div className="row align-items-center g-2">
                        <div className="col-12 col-md-4 d-flex align-items-center">
                          {product.name ? (
                            <>
                              <img
                                className="rounded me-2"
                                src={product.imageUrl}
                                alt="Product"
                                style={{
                                  height: "60px",
                                  width: "60px",
                                  objectFit: "cover",
                                }}
                              />
                              <div>
                                <strong className="d-block">{product.name}</strong>
                                <small>₹{product.price}</small>
                              </div>
                            </>
                          ) : (
                            <>{product.title}</>
                          )}
                        </div>
                        <div className="col-12 col-md-3">
                          <div className="d-flex align-items-center justify-content-center">
                            <div
                              className="border rounded d-flex align-items-center bg-white"
                              style={{ width: "120px" }}
                            >
                              <button
                                className="btn btn-light border-0 rounded-start"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (product.quantity > 1) {
                                    decrementQuantity(product.cartItemId);
                                  }
                                }}
                                style={{ minWidth: "35px" }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="text-danger"
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
                                style={{ width: "40px", height: "35px" }}
                                value={product.quantity || ""}
                                onChange={(e) => {
                                  const newValue = e.target.value.trim();
                                  if (
                                    newValue === "" ||
                                    (!isNaN(newValue) && parseInt(newValue) >= 1)
                                  ) {
                                    const newQuantity =
                                      newValue === "" ? "" : parseInt(newValue);
                                    incrementQuantity(
                                      product.cartItemId,
                                      newQuantity
                                    );
                                  }
                                }}
                              />
                              <button
                                className="btn btn-light border-0 rounded-end"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  incrementQuantity(product.cartItemId);
                                }}
                                style={{ minWidth: "35px" }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="text-success"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-2 text-center text-md-start">
                          <strong>₹{product.price * product.quantity}</strong>
                        </div>
                        <div className="col-12 col-md-3 d-flex gap-2 justify-content-center justify-content-md-end">
                          <button
                            className="btn btn-primary btn-sm"
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
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleRemoveFromCart(product.cartItemId)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-center py-4">No items in cart</li>
                )}
              </ul>
              <div className="mt-3 p-2 border-top">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
                  <h4 className="mb-0">Sub-Total: ₹{subtotal}</h4>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      dispatch(setBillTotal(subtotal));
                      handleAddress();
                    }}
                  >
                    Proceed to Buy ({totalItemsInCart} items)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container bg-light mt-3 p-3 text-center">
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
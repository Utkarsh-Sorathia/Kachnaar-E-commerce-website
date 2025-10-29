import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/compat/app";
import { ToastContainer, toast } from "react-toastify";
import { addToCart, setBillTotal } from "../redux/userSlice";
import ReactImageZoom from "react-image-zoom";

const ProductInfomation = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItemId = uuidv4();
  const email = useSelector((state) => state.user);
  const db = firebase.firestore();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const incrementQuantity = () => {
    setQuantity((quantity) => Number(quantity) + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity) => Number(quantity) - 1);
    }
  };

  const notifyToCart = () =>
    toast.success("Added to Cart.", {
      position: "top-center",
      autoClose: 1500,
    });

  const notifyNotToCart = () =>
    toast.info("Login to Add Item to Cart.", {
      position: "top-center",
      autoClose: 1500,
    });

  const handleAddToCart = (product, quantity) => {
    if (!isAuthenticated) {
      notifyNotToCart();
      return;
    }
    dispatch(addToCart(product, quantity));
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let cart = doc.data().cart || [];
          let productExists = false;

          cart.forEach((item) => {
            if (item.id === product.id) {
              item.quantity += quantity;
              productExists = true;
            }
          });

          if (!productExists) {
            cart.push({
              ...product,
              cartItemId,
              quantity: quantity,
            });
          }

          doc.ref
            .update({ cart: cart })
            .then(() => {
              notifyToCart();
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
              toast.error("Error adding to cart. Please try again later.");
            });
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error adding to cart. Please try again later.");
      });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const snapshot = await db
          .collection("productDataset")
          .where("id", "==", id)
          .get();
        if (!snapshot.empty) {
          const productData = snapshot.docs[0].data();
          setProduct(productData);
        } else {
          console.log("No product found with ID:", id);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [db, id]);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container text-center mt-3 mb-3 border rounded bg-light p-2 px-2">
        {product ? (
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-6 d-flex justify-content-center">
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <ReactImageZoom
                  {...{
                    img: product.imageUrl,
                    width: 400,
                    height: 400,
                    zoomWidth: 1200,
                    scale: 1,
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="border rounded bg-white p-3">
                <h1 className="border-bottom pb-3">{product.name}</h1>
                <p className="text-muted mb-4">{product.description}</p>
                <h2 className="text-primary mb-4">₹{product.price}</h2>
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <button
                    className="btn btn-outline-primary btn-lg me-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (quantity > 1) {
                        decrementQuantity();
                      }
                    }}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="bg-white border-0 text-center"
                    style={{ width: "60px" }}
                    value={quantity === null ? "" : quantity}
                    required
                    onChange={(e) => {
                      const newValue = e.target.value.trim();
                      if (
                        newValue === "" ||
                        (!isNaN(newValue) && parseInt(newValue) >= 1)
                      ) {
                        setQuantity(newValue === "" ? "" : parseInt(newValue));
                      }
                    }}
                  />
                  <button
                    className="btn btn-outline-primary btn-lg ms-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      incrementQuantity();
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product, quantity)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      dispatch(setBillTotal(quantity * product.price));
                      navigate("/address");
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProductInfomation;

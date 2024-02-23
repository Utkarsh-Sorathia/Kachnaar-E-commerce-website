import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../redux/userSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/compat/app";
import ReactImageZoom from "react-image-zoom";
import { ToastContainer, toast } from "react-toastify";

const ProductInfomation = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let cart = doc.data().cart || [];
          let productExists = false;

          // Check if the product already exists in the cart
          cart.forEach((item) => {
            if (item.id === product.id) {
              // If the product exists, update its quantity
              item.quantity += quantity;
              productExists = true;
            }
          });

          // If the product doesn't exist, add it to the cart with a unique ID
          if (!productExists) {
            cart.push({
              ...product,
              cartItemId: uuidv4(), // Generate unique ID for the product in the cart
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
      <div
        className="container text-center m-3 border border-rounded bg-light p-2"
        style={{ display: "flex", width: "800px", height: "400px" }}
      >
        {product ? (
          <>
            <div style={{ flex: 1 }}>
              <ReactImageZoom
                width={350}
                height={350}
                img={product.imageUrl} // URL of the main image
                zoomImg={product.zoomImageUrl} // URL of the larger version of the image for zooming
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1, padding: "0 20px" }}>
              <div className="border border-rounded bg-white mt-3">
                <h1 className="border-bottom">Product Information</h1>
                <div className="form-group">
                  <strong>Name:</strong> {product.name}
                </div>
                <div className="form-group">
                  <strong>M.R.P:</strong> {product.price}
                </div>
                <div className="form-group">
                  <strong>Description:</strong> {product.description}
                </div>
                <div className="form-group">
                  <strong>Quantity:</strong>
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
                </div>
                <div>
                  <strong>In Stock:</strong> {product.stock}
                </div>

                <button
                  className="btn btn-primary m-1"
                  onClick={() => handleAddToCart(product, quantity)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-primary m-1"
                  onClick={() => navigate("/address")}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ProductInfomation;

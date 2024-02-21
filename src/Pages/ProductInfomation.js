import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../redux/userSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/compat/app";
import { ToastContainer, toast } from "react-toastify";

const ProductInfomation = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const db = firebase.firestore();

  const handleAddToCart = (product, quantity) => {
    const cid = uuidv4();
    const newObj = { ...product, cid, quantity: parseInt(quantity, 10) };
    dispatch(addToCart(newObj));
    notifyToCart();
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
        style={{ display: "flex", width: "1000px", height: "550px" }}
      >
        {product ? (
          <>
            <div style={{ flex: 1 }}>
              <img
                className="card-img-top border border-rounded"
                src={product.imageUrl}
                alt="Product"
                style={{
                  height: "500px",
                  width: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
            <div style={{ flex: 1, padding: "0 20px" }}>
              <div className="border border-rounded bg-white mt-3">
                <h1 className="border-bottom">Product Information</h1>
                <div>
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
                  <h6>In Stock:</h6> {product.stock}
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
        ) : (
          null
        )}
      </div>
    </>
  );
};

export default ProductInfomation;

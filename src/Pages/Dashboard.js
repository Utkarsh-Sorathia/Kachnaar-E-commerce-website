import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import firebase from "firebase/compat/app";
import "./logo.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [firestoreProducts, setFirestoreProducts] = useState([]);
  const db = firebase.firestore();
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    const unsubscribe = db
      .collection("productDataset")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setFirestoreProducts(data);
      });

    return () => unsubscribe();
  }, [db]);

  const handleRemoveProduct = async (productId, name) => {
    if (window.confirm(`Are you sure you want to delete this: ${name}?`)) {
      // Find the product in firestoreProducts array
      const productToRemove = firestoreProducts.find(
        (product) => product.id === productId
      );
      if (productToRemove) {
        // Remove the product from the Redux state
        console.log("Removing product with ID:", productId);

        // Remove product from Firestore
        db.collection("productDataset")
          .doc(productId)
          .delete()
          .then(async () => {
            console.log("Product removed from Firestore:", productId);
            toast.success(`${name} has been deleted!`, {
              position: "top-right",
              autoClose: 1500,
            });

            // Remove image from Firebase Storage
            try {
              await firebase
                .storage()
                .refFromURL(productToRemove.imageUrl)
                .delete();
              console.log(
                "Image removed from Storage:",
                productToRemove.imageUrl
              );
            } catch (error) {
              console.error("Error removing image from Storage:", error);
            }
          })
          .catch((error) => {
            console.error("Error removing product from Firestore: ", error);
          });
      }
    }
  };

  return (
    <>
      {admin ? (
        <>
          <Navbar />
          <div className="container">
            <h1 className="text-center my-4">Dashboard</h1>
            <div className="row">
              {firestoreProducts.map((product) => (
                <div className="col-md-4 mb-4" key={product.id}>
                  <div className="card">
                    <div className="row">
                      <div className="col-lg-4">
                        <img
                          src={product.imageUrl}
                          alt="CoverPlant"
                          style={{ height: "8rem", width: "8rem", objectFit: "cover"}}
                          className="rounded"
                        />
                      </div>
                      <div className="col-lg-8">
                        <div className=" mx-2 card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">Price: ₹{product.price}</p>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleRemoveProduct(product.id, product.name)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h2 className="text-center">
                      UnAuthorized!!!Login to get access to this page.
                    </h2>
                    <p className="text-center">
                      <Link to="/login">Login</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;

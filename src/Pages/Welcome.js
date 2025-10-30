import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const Welcome = () => {
  const [firestoreProducts, setFirestoreProducts] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    const unsubscribe = db
      .collection("productDataset")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })); // Include document ID
        setFirestoreProducts(data);
      });

    return () => unsubscribe();
  }, [db]);

  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide p-2 p-md-3"
        data-bs-ride="carousel"
        style={{ backgroundColor: "beige" }}
      >
        <div className="carousel-inner">
          {firestoreProducts.map((product, index) => {
            if (index % 4 === 0) {
              const slides = firestoreProducts.slice(index, index + 4);
              return (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <div className="row g-2">
                    {slides.map((product, idx) => (
                      <div className="col-6 col-md-3" key={idx}>
                        <Link to={`/products/${product.id}`}>
                          <img
                            src={product.imageUrl}
                            className="d-block w-100"
                            alt={`Slide ${index + idx}`}
                            style={{
                              height: "30vh",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleSlidesOnly"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleSlidesOnly"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Welcome;

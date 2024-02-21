import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [firestoreProducts, setFirestoreProducts] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    const unsubscribe = db
      .collection("productDataset")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setFirestoreProducts(data);
      });

    return () => unsubscribe();
  }, [db]);

  return (
    <>
      <div className="bg-light">
        <Navbar />
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <header className="text-center mb-2">
                <h1>Products</h1>
              </header>
              <div className="form-group col-md-4 p-2">
                <input
                  className="form-control"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  placeholder="Search Here..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-space m-3 border-rounded bg-white p-3">
          {/* Firestore products rendering */}
          {firestoreProducts
            .filter((val) => {
              return val.name.toLowerCase().includes(searchValue.toLowerCase());
            })
            .map((product, index) => (
              <div className="col-md-3 mb-2 " key={index}>
                <div className="card">
                  <div
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-image ">
                      <img
                        className="card-img-top"
                        src={product.imageUrl}
                        alt="Product"
                        style={{
                          height: "300px",
                          width: "270px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      <strong>M.R.P:</strong>₹{product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;

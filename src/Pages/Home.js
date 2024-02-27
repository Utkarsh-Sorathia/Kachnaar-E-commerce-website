import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending"); // State to track sort order
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

  // Function to toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  // Function to sort products based on price
  const sortProductsByPrice = (products) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    return sortedProducts;
  };

  return (
    <>
      <div className="bg-light">
        <Navbar />
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <div className="d-flex form-group col-md-4 mx-1">
                <input
                  className="form-control mx-3"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  placeholder="Search Here..."
                />
                <button
                  className="btn btn-primary"
                  onClick={toggleSortOrder}
                >
                  Sort By Price ({sortOrder === "ascending" ? "Ascending" : "Descending"})
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-space m-3 border-rounded bg-white p-3">
          {/* Firestore products rendering */}
          {sortProductsByPrice(firestoreProducts.filter((val) => {
              return val.name.toLowerCase().includes(searchValue.toLowerCase());
            })).map((product, index) => (
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

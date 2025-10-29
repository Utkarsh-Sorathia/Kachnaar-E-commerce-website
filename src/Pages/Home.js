import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [icon, setIcon] = useState("fa-solid fa-arrow-up");
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
    setIcon((prevIcon) =>
      prevIcon === "fa-solid fa-arrow-up"
        ? "fa-solid fa-arrow-down"
        : "fa-solid fa-arrow-up"
    );
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

        <div className="container-fluid mt-3">
          <div className="row justify-content-center mb-3">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="d-flex flex-column flex-md-row gap-2">
                <input
                  className="form-control"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  placeholder="Search Product Here..."
                  style={{ height: "40px" }}
                />
                <button
                  className="btn btn-light border"
                  onClick={toggleSortOrder}
                  style={{ height: "40px", minWidth: "150px" }}
                >
                  <i className={icon} /> Sort By Price
                </button>
              </div>
            </div>
          </div>
          {/* Firestore products rendering */}
          <div className="row g-3 px-2">
            {sortProductsByPrice(
              firestoreProducts.filter((val) => {
                return val.name.toLowerCase().includes(searchValue.toLowerCase());
              })
            ).map((product, index) => (
              <div className="col-6 col-sm-6 col-md-4 col-lg-3 mb-3" key={index}>
                <div className="card h-100">
                  <div
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-image">
                      <img
                        className="card-img-top"
                        src={product.imageUrl}
                        alt="Product"
                        style={{
                          height: "250px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text mt-auto">
                      <strong>M.R.P:</strong> ₹{product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

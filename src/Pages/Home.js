import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/compat/app";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [icon, setIcon] = useState("fa-solid fa-arrow-up");
  const navigate = useNavigate();
  const [firestoreProducts, setFirestoreProducts] = useState([]);
  const db = firebase.firestore();
  const { id } = useParams();

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

        <div className="row justify-content-space m-2 border-rounded bg-white p-2" style={{borderRadius:"10px"}}>
          <div className="row justify-content-end mt-1 mb-3">
              <div className="d-flex form-group col-md-4 mx-1">
                <input
                  className="form-control mx-3"
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
                  style={{ height: "40px",width:"215px"}}
                ><i className={icon} />{" "}
                  Sort By Price 
                </button>
            </div>
          </div>
          {/* Firestore products rendering */}
          {sortProductsByPrice(
            firestoreProducts.filter((val) => {
              return val.name.toLowerCase().includes(searchValue.toLowerCase());
            })
          ).map((product, index) => (
            <div className="col-md-3 mb-2" key={index}>
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

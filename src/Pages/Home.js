import React from "react";
import Product from "./Products";
import "./logo.css";
import Navbar from "./Navbar";
import { addToCart } from "../redux/userSlice";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  const addToCart1 = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col">
            <header className=" text-center mb-5">
              <h1>Products</h1>
            </header>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Product name="Product 1" price={10} addToCart={addToCart1} />
          </div>
          <div className="col-md-4">
            <Product name="Product 2" price={20} addToCart={addToCart1} />
          </div>
          <div className="col-md-4">
            <Product name="Product 3" price={30} addToCart={addToCart1} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

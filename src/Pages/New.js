import React from "react";
import "./logo.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import AddProduct from "./AddProduct";
import { addProductToList } from "../redux/userSlice";

const New = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    // Dispatch action to add product to the product list
    dispatch(addProductToList(product));
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        {isAuthenticated ? (
          <div className="row justify-content-center mt-5">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center mb-4">Add Product</h5>
                  <AddProduct onAddProduct={handleAddProduct} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-5">
            <h1>Login to get access to this page!</h1>
            <Link to="/login" className="btn btn-primary mt-3">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default New;

import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login"

const Address = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const handleBuy = (e) => {
    e.preventDefault();
    alert("Redirecting to Payment Gateway!");
  };

  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <>
          <div className="bg-light">
            <div
              className="container border border-rounded mt-3 p-4"
              style={{ width: "600px" }}
            >
              <h1 className="mb-4 text-center">Address Details</h1>
              <form className="p-2">
                <div className="form-row row">
                  <div className="form-group col-md-6 p-2">
                    <input
                      type="text"
                      className="form-control "
                      id="inputEmail4"
                      placeholder="House Number (e.g. 25, 48...)"
                    />
                  </div>
                  <div className="form-group col-md-6 p-2">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Street Name (e.g. 1234 Main St...)"
                    />
                  </div>
                </div>
                <div className="form-group p-2">
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="City (e.g. Surat...)"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4 p-2">
                    <select id="inputState" className="form-control">
                      <option selected>State</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4 p-2">
                    <input
                      type="text"
                      className="form-control"
                      id="inputZip"
                      placeholder="Pincode"
                    />
                  </div>
                </div>
                <div className="form-group form-check p-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Check me out
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mx-2"
                  onClick={handleBuy}
                >
                  Buy Now
                </button>
                <button
                  type="submit"
                  className="btn btn-primary mx-2"
                  onClick={() => navigate("/cart")}
                >
                  Back to Cart
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
        <Login />
        </>
      )}
    </>
  );
};

export default Address;

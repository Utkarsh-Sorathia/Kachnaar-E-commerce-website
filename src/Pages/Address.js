import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";
import Logo from "./images/Logo.png"

const Address = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const billTotal = useSelector((state) => state.billTotal);

  const handleBuy = async (e) => {
    e.preventDefault();
    setPaymentLoading(true);

    const options = {
      key: process.env.RAZORPAY_KEY,
      amount: billTotal * 100, // amount in paisa
      currency: "INR",
      name: "Ramsung",
      description: "Product Purchase",
      image: {Logo},
      handler: function (response) {
        // handle success
        alert("Payment successful");
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    setPaymentLoading(false);
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
                      value=""
                      required
                    />
                  </div>
                  <div className="form-group col-md-6 p-2">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Street Name (e.g. 1234 Main St...)"
                      required
                    />
                  </div>
                </div>
                <div className="form-group p-2">
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="City (e.g. Surat...)"
                    required
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
                      required
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
                  disabled={paymentLoading}
                >
                  {paymentLoading ? "Processing Payment..." : "Buy Now"}
                </button>
                <button
                  type="button"
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

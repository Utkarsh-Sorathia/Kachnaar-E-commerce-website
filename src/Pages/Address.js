import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "./images/kachnar.jpeg";
import Swal from "sweetalert2";

const Address = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const user = useSelector((state) => state.user);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const billTotal = useSelector((state) => state.billTotal);

  const handleBuy = async (e) => {
    e.preventDefault();
    setPaymentLoading(true);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: billTotal * 100, // amount in paisa
      currency: "INR",
      name: "Kachnar",
      description: "Product Purchase",
      image: Logo,
      handler: function (response) {
        // handle success
        Swal.fire({
          title: "Payment Successful!",
          text: `Payment Id : ${response.razorpay_payment_id}`,
          icon: "success",
        });
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
      {isAuthenticated && user ? (
        <>
          <div className="container mt-3 mt-md-5 px-2">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="card shadow">
                  <div className="card-body p-3 p-md-4">
                    <h2 className="text-center mb-4">Address Details</h2>
                    <form>
                      <div className="form-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="House Number (e.g. 25, 48...)"
                          required
                        />
                      </div>
                      <div className="form-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Street Name (e.g. 1234 Main St...)"
                          required
                        />
                      </div>
                      <div className="form-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City (e.g. Surat...)"
                          required
                        />
                      </div>
                      <div className="row mb-2">
                        <div className="form-group col-12 col-md-6 mb-2">
                          <select className="form-control" required>
                            <option value="" disabled>
                              State
                            </option>
                            <option>Gujarat</option>
                            <option>Maharashtra</option>
                          </select>
                        </div>
                        <div className="form-group col-12 col-md-6 mb-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Pincode"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                          required
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                          I agree to the terms and conditions
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100 mb-2"
                        onClick={handleBuy}
                        disabled={paymentLoading}
                      >
                        {paymentLoading ? "Processing Payment..." : "Buy Now"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-link w-100"
                        onClick={() => navigate("/cart")}
                      >
                        Back to Cart
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container mt-3 mt-md-5 px-2">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h2 className="text-center">
                      Login to get access to this page.
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

export default Address;

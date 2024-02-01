import React from "react";
import "./logo.css";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import PasswordGenerator from "./Password/PasswordGenerator";

const New = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  return (
    <div>
      {isAuthenticated == false ? (
        <>
          <Navbar />
          <p className="text-center py-5">
            <strong>
              <h1>Login to get access to this page!</h1>
            </strong>
            <Link to="/">
              <h4>Login</h4>
            </Link>
          </p>
        </>
      ) : (
        <>
          <Navbar />
          <div className="text-center py-3">
            <PasswordGenerator />
          </div>
        </>
      )}
    </div>
  );
};

export default New;

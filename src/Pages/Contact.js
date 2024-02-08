import React from "react";
import "./logo.css";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const New = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  return (
    <div>
      <Navbar />
      <div className="text-center py-3">
        <h1>Contact Us page.</h1>
      </div>
    </div>
  );
};

export default New;

import React from "react";
import "./logo.css";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="text-center py-3">
        <h1>Home Page.</h1>
      </div>
    </div>
  );
};

export default Home;

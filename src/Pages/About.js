import React from "react";
import "./logo.css";
import Navbar from "./Navbar";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/utkarsh__sorathia";
  };
  return (
    <div>
      <Navbar />
      <div className="text-center py-3">
        <h1>About Us page.</h1>
      </div>
    </div>
  );
};

export default About;

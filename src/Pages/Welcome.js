import React from "react";
import orange from "./images/orange.jpg";
import main from "./images/main.jpg";
import Navbar from "./Navbar";
import "./logo.css";

const Welcome = () => {
  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src={orange}
              alt="First slide"
              height="300"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src={main}
              alt="Second slide"
              height="300"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="..."
              alt="Third slide"
              height="300"
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Welcome;

import React from "react";
import Navbar from "./Navbar";
import "./logo.css";

const Welcome = () => {
  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="container-fluid"
              style={{ backgroundColor: "beige" }}
            >
              <div
                className="row align-items-center"
                style={{ height: "50vh" }}
              >
                <div className="col-sm-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/10/07/09/06/bridge-7504605__340.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="col-sm-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/10/15/21/23/cat-7523894__340.jpg"
                    className="d-block w-100"
                    alt=""
                  />
                </div>
                <div className="col-sm-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2021/03/04/11/37/coast-6067736__340.jpg"
                    className="d-block w-100"
                    alt=""
                  />
                </div>
                <div className="col-sm-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/10/15/06/45/danube-river-7522608__340.jpg"
                    className="d-block w-100"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item" style={{ height: "50vh" }}>
            <div
              className="container-fluid"
              style={{ backgroundColor: "beige" }}
            >
              <div
                className="row align-items-center"
                style={{ height: "50vh" }}
              >
                <div className="col-sm-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/10/07/09/06/bridge-7504605__340.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="col-sm-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/10/15/21/23/cat-7523894__340.jpg"
                    className="d-block w-100"
                    alt=""
                  />
                </div>
                <div className="col-sm-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2021/03/04/11/37/coast-6067736__340.jpg"
                    className="d-block w-100"
                    alt=""
                  />
                </div>
                <div className="col-sm-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/10/15/06/45/danube-river-7522608__340.jpg"
                    className="d-block w-100"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item" style={{ height: "50vh" }}>
            <div
              className="container-fluid"
              style={{ backgroundColor: "beige" }}
            >
              <div
                className="row align-items-center"
                style={{ height: "50vh" }}
              >
                <div className="col-sm-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/10/07/09/06/bridge-7504605__340.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="col-sm-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/10/15/21/23/cat-7523894__340.jpg"
                    className="d-block w-100"
                    alt=""
                  />
                </div>
                <div className="col-sm-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2021/03/04/11/37/coast-6067736__340.jpg"
                    className="d-block w-100"
                    alt=""
                  />
                </div>
                <div className="col-sm-3">
                  <img
                    src="https://cdn.pixabay.com/photo/2022/10/15/06/45/danube-river-7522608__340.jpg"
                    className="d-block w-100"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleSlidesOnly"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleSlidesOnly"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Welcome;

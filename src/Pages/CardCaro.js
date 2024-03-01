import React from "react";
import Image from "./images/facebook.jpg";
import Image1 from "./images/github.jpg";
import { Carousel, Card } from "react-bootstrap";
import Navbar from "./Navbar";

const CarouselCard = () => {
  return (
    <>
      <Navbar />
      <Card style={{ width: "18rem" }}>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={Image} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={Image1} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/250"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <Card.Body>
          <Card.Title>Carousel Card</Card.Title>
          <Card.Text>
            This is a card with a carousel of images inside it.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CarouselCard;

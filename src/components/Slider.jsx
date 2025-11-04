import React from "react";
import Carousel from "./Carousel";
import product1 from "../assets/1.jpg";
import product2 from "../assets/2.jpg";
import product3 from "../assets/3.jpg";
import product4 from "../assets/4.jpg";
function Slider() {
  const images = [product1, product2, product3, product4];
  return (
    <Carousel autoplay={false}>
      {images.map((image) => (
        <img src={image} width="300px" height="200px" />
      ))}
    </Carousel>
  );
}

export default Slider;

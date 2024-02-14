import React from 'react';
import { v4 } from "uuid";


const Product = ({ name, price, description, addToCart }) => {
  let id = v4();
  return (
    <div className="product">
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>Description : {description}</p>
      <button onClick={() => addToCart({ name, price, description, id })}>Add to Cart</button>
    </div>
  );
};

export default Product;

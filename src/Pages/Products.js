import React from 'react';
import { v4 } from "uuid";


const Product = ({ name, price, addToCart }) => {
  let id = v4();
  return (
    <div className="product">
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <button onClick={() => addToCart({ name, price, id })}>Add to Cart</button>
    </div>
  );
};

export default Product;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [ebayProducts, setEbayProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const options = {
        method: 'GET',
        url: 'https://ebay-scrapper.p.rapidapi.com/search',
        params: {
          url: `https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=${searchQuery}&_sacat=0`
        },
        headers: {
          'X-RapidAPI-Key': '66a968c634mshd8a56e57dbced34p144e25jsn637f5e7ff3af',
          'X-RapidAPI-Host': 'ebay-scrapper.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setEbayProducts(response.data.items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchData();
    }
  }, [searchQuery]);

  const handleAddToCart = (product) => {
    const cid = uuidv4();
    const newObj = { ...product, cid };
    dispatch(addToCart(newObj));
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <header className="text-center mb-5">
              <h1>Products</h1>
            </header>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search Here..."
                value={searchQuery}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {products.map((product, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* eBay products rendering */}
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            ebayProducts.map((product, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="200"
                    width="200"
                  />
                  <div className="card-body">
                    <p className="card-title">{product.name}</p>
                    <p className="card-text">${product.price} {product.currency}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

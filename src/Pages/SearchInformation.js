import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./logo.css"

const SearchInformation = () => {
  const { query } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.REACT_APP_GOOGLE_KG_API_KEY; // Replace with your actual API key
  const search = async () => {
    try {
      const response = await axios.get(
        `https://kgsearch.googleapis.com/v1/entities:search?query=${query}&key=${apiKey}&limit=5&types=Plants`
      );
      setResults(response.data.itemListElement[0].result);
      setLoading(false);
      console.log(response);
    } catch (err) {
      setResults(null);
      setLoading(false);
      console.error("Error fetching search results:", err);
    }
  };
  useEffect(() => {
    search();
  }, [query]);

  return (
    <>
      <Navbar />
      <div>
        Plant Details.
        <div>
          {loading === true ? (
            <p>Loading...</p>
          ) : (
            <div className="card-container col-md-3 mb-2">
              <div className="card">
                <img
                  className="card-img-top"
                  src={results.image.contentUrl}
                  alt={results.name}
                  style={{
                    height: "300px",
                    width: "270px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h4 className="card-title">{results.name}</h4>

                  <p className="card-text">
                    {results.detailedDescription.articleBody}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchInformation;

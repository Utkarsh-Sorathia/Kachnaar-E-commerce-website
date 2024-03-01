import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

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
            <div>
              <h2>{results.name}</h2>
              <p>{results.description}</p>
             
                <p>{results.detailedDescription.articleBody}</p>
             
            
                <img src={results.image.contentUrl} alt={results.name} />
            
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchInformation;

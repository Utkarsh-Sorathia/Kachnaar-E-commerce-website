import React, { useState } from 'react';
import axios from 'axios';

const PlantSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'AIzaSyD2vBfkL0NpDCyAbZhUjefcxvX5223LbO4';

  const search = async () => {
    try {
      const response = await axios.get(`https://kgsearch.googleapis.com/v1/entities:search?query=${query}&key=${apiKey}&limit=5&types=Plants`);
      setResults(response.data.itemListElement[0].result);
      console.log(response);
    } catch (err) {
      setError(err.response.data.error.message);
      setResults(null);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {results && (
        <div>
          <h2>{results.name}</h2>
          <p>{results.description}</p>
          {results.detailedDescription && <p>{results.detailedDescription.articleBody}</p>}
          {results.image && <img src={results.image.contentUrl} alt={results.name} />}
        </div>
      )}
    </div>
  );
};

export default PlantSearch;

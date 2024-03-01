import React, { useState, useEffect } from 'react';

const PlantInfo = () => {
  const [plantData, setPlantData] = useState(null);
  const apiKey = 'vqvngPZPSRiM6IDOa8an1PdM7KkwACb8agXQkdSBTQalFh7FY2'; // Replace 'your_api_key' with your actual API key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://plant.id/api/v3/kb/plants/ADQuTDRVfU1caQRidkdcbFlsZVVBdV1lBDVnUGJRaFk-?details=common_names%2Curl%2Cdescription%2Ctaxonomy%2Crank%2Cgbif_id%2Cinaturalist_id%2Cimage%2Csynonyms%2Cedible_parts%2Cwatering%2Cpropagation_methods&lang=en', {
          method: 'GET',
          headers: {
            'Api-Key': apiKey,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setPlantData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    };

    fetchData();
  }, [apiKey]);

  return (
    <div>
      <h1>Plant Information</h1>
      {plantData ? (
        <div>
          <h2>{plantData.name}</h2>
          <div>
            <h3>Common Names:</h3>
            <ul>
              {plantData.common_names.map(name => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Taxonomy:</h3>
            <p>Class: {plantData.taxonomy.class}</p>
            <p>Genus: {plantData.taxonomy.genus}</p>
            <p>Order: {plantData.taxonomy.order}</p>
            <p>Family: {plantData.taxonomy.family}</p>
            <p>Phylum: {plantData.taxonomy.phylum}</p>
            <p>Kingdom: {plantData.taxonomy.kingdom}</p>
          </div>
          <p>Description: {plantData.description.value}</p>
          <p>GBIF ID: {plantData.gbif_id}</p>
          <p>iNaturalist ID: {plantData.inaturalist_id}</p>
          <img src={plantData.image.value} alt="Plant" style={{height:"100px",width:"100px"}}/>
          <p>Edible Parts: {plantData.edible_parts.join(', ')}</p>
          <p>Watering (min): {plantData.watering.min}</p>
          <p>Watering (max): {plantData.watering.max}</p>
          <div>
            <h3>Synonyms:</h3>
            <ul>
              {plantData.synonyms.map(synonym => (
                <li key={synonym}>{synonym}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Propagation Methods:</h3>
            <ul>
              {plantData.propagation_methods.map(method => (
                <li key={method}>{method}</li>
              ))}
            </ul>
          </div>
          <p>URL: <a href={plantData.url}>{plantData.url}</a></p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlantInfo;

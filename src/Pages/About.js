import React, { useState, useEffect } from "react";
import axios from "axios";

const PlantSearch = () => {
  const [plants, setPlants] = useState([]);
  const [plantName, setPlantName] = useState("");
  const [searching, setSearching] = useState(false); // State to track if search is in progress
  const apiKey = "2QZYnAkMpoxuFNUHbleDjHODvyuUIFJj68vCbzmDdmKLhf4udh";

  const fetchData = async () => {
    if (plantName.trim() !== "") {
      // Check if plantName is not empty
      try {
        const apiUrl = `https://plant.id/api/v3/kb/plants/name_search?q=${plantName}`;
        const response = await axios.get(apiUrl, {
          headers: {
            "Api-Key": apiKey,
            "Content-Type": "application/json",
          },
        });
        setPlants(response.data.entities);
        console.log(response) // Set plants to entities array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setSearching(false); // Set searching to false after search is complete
      }
    } else {
      setPlants([]); // Reset plants if plantName is empty
      setSearching(false); // Reset searching state
    }
  };

  const handleSearch = () => {
    setSearching(true); // Set searching state to true when search is initiated
    fetchData(); // Trigger the data fetching function
  };

  return (
    <div>
      <h1>Plant Search</h1>
      <div>
        <input
          type="text"
          placeholder="Search for a plant..."
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
        />
        <button onClick={handleSearch} disabled={searching}>
          Search
        </button>
      </div>
      {plants.length > 0 && (
        <ul>
          {plants.map((plant, index) => (
            <li key={index}>
              <strong>Matched Text:</strong> {plant.matched_in} |{" "}
              <strong>Entity Name:</strong> {plant.entity_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlantSearch;

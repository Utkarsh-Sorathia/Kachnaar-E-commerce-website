import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const PlantSearch = () => {
  const { query } = useParams();
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const apiKey = "2QZYnAkMpoxuFNUHbleDjHODvyuUIFJj68vCbzmDdmKLhf4udh";

  useEffect(() => {
    fetchData();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    if (query.trim() !== "") {
      try {
        const apiUrl = `https://plant.id/api/v3/kb/plants/name_search?q=${query}`;
        const response = await axios.get(apiUrl, {
          headers: {
            "Api-Key": apiKey,
            "Content-Type": "application/json",
          },
        });
        setPlants(response.data.entities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setPlants([]);
    }
  };

  const fetchPlantDetails = async (accessToken) => {
    try {
      const apiUrl = `https://plant.id/api/v3/kb/plants/${accessToken}?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods&lang=en`;
      const response = await axios.get(apiUrl, {
        headers: {
          "Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      });
      setSelectedPlant(response.data);
    } catch (error) {
      console.error("Error fetching plant details:", error);
    }
  };

  const handlePlantClick = (accessToken) => {
    fetchPlantDetails(accessToken);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3 px-2">
        {plants.length > 0 && (
          <div className="row g-3">
            {plants.map((plant, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4">
                <div
                  className="card h-100 shadow"
                  onClick={() => handlePlantClick(plant.access_token)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{plant.entity_name}</h5>
                    <p className="card-text">{plant.matched_in}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedPlant && (
          <div className="card mt-3 shadow mb-3">
            <div className="row g-0">
              <div className="col-12 col-md-4 d-flex justify-content-center align-items-start p-3">
                <img
                  src={selectedPlant.image.value}
                  alt="Plant"
                  className="img-fluid rounded"
                  style={{ maxHeight: "300px", maxWidth: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="col-12 col-md-8">
                <div className="card-body">
                  <h2 className="card-title">Plant Details</h2>
                  {selectedPlant.common_names && (
                    <p>
                      <strong>Common Names:</strong>{" "}
                      {selectedPlant.common_names.map((name, index) => (
                        <span key={index}>
                          {name}
                          {index !== selectedPlant.common_names.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  )}
                  {selectedPlant.description && (
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedPlant.description.value}
                    </p>
                  )}
                  {selectedPlant.propagation_methods && (
                    <p>
                      <strong>Propagation Methods:</strong>{" "}
                      {selectedPlant.propagation_methods.map((name, index) => (
                        <span key={index}>
                          {name}
                          {index !== selectedPlant.propagation_methods.length - 1 &&
                            ", "}
                        </span>
                      ))}
                    </p>
                  )}
                  {selectedPlant.description && (
                    <p>
                      <strong>More Details:</strong>{" "}
                      <a
                        href={selectedPlant.description.citation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-break"
                      >
                        {selectedPlant.description.citation}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlantSearch;

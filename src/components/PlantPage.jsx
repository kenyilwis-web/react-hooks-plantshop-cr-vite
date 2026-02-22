import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  // Holds backend plant records used by list rendering and search filtering.
  const [plants, setPlants] = useState([]);
  // Tracks user input for case-insensitive plant name filtering.
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Loads all plants once when the page mounts.
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((plantData) => setPlants(plantData));
  }, []);

  function handleAddPlant(newPlant) {
    // Persists a new plant and appends the created record to local state.
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((createdPlant) => setPlants((currentPlants) => [...currentPlants, createdPlant]));
  }

  // Filters visible plants as the user types in the search field.
  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={displayedPlants} />
    </main>
  );
}

export default PlantPage;

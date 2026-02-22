import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants }) {
  // Renders one card per plant currently included in the filtered set.
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </ul>
  );
}

export default PlantList;

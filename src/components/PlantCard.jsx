import React, { useState } from "react";

function PlantCard({ plant }) {
  // Local-only stock flag for UI toggle behavior (not persisted).
  const [isInStock, setIsInStock] = useState(true);

  function handleToggleStock() {
    // Switches button state between In Stock and Out of Stock.
    setIsInStock((currentStock) => !currentStock);
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {isInStock ? (
        <button className="primary" onClick={handleToggleStock}>
          In Stock
        </button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;

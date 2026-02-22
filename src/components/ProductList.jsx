import React from 'react'
import ProductCard from './ProductCard'

const ProductList = ({ plants, onMarkSoldOut }) => {
  return (
    <div>
      <h2>All Plants</h2>

      {/* Show an empty-state message when no results match the active search. */}
      {plants.length === 0 ? (
        <p>No plants match your search.</p>
      ) : (
        // Render one card per plant record from filtered data.
        plants.map((plant) => (
          <ProductCard
            key={plant.id}
            product={plant}
            onMarkSoldOut={onMarkSoldOut}
          />
        ))
      )}
    </div>
  )
}

export default ProductList
